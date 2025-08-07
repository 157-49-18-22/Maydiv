const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const asyncHandler = require('express-async-handler');

const SEO = require('../models/SEO');
const { protect, authorize } = require('../middleware/auth');
const logger = require('../utils/logger');

// @desc    Get all SEO data
// @route   GET /api/v1/seo
// @access  Private/Admin
router.get('/', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    seoScore,
    sortBy = 'lastUpdated',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = {};
  
  if (search) {
    filter.$or = [
      { pagePath: { $regex: search, $options: 'i' } },
      { pageTitle: { $regex: search, $options: 'i' } },
      { metaTitle: { $regex: search, $options: 'i' } },
      { metaDescription: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status) {
    filter.isPublished = status === 'published';
  }
  
  if (priority) {
    filter.priority = priority;
  }
  
  if (seoScore) {
    const [min, max] = seoScore.split('-').map(Number);
    if (max) {
      filter.seoScore = { $gte: min, $lte: max };
    } else {
      filter.seoScore = { $gte: min };
    }
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const skip = (page - 1) * limit;
  
  const seoData = await SEO.find(filter)
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await SEO.countDocuments(filter);

  res.status(200).json({
    success: true,
    data: seoData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// @desc    Get SEO data by page path
// @route   GET /api/v1/seo/page/:pagePath
// @access  Public
router.get('/page/:pagePath', asyncHandler(async (req, res) => {
  const { pagePath } = req.params;
  
  const seoData = await SEO.getByPagePath(pagePath);
  
  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found for this page'
    });
  }

  res.status(200).json({
    success: true,
    data: seoData
  });
}));

// @desc    Get all published SEO data
// @route   GET /api/v1/seo/published
// @access  Public
router.get('/published', asyncHandler(async (req, res) => {
  const seoData = await SEO.getAllPublished();
  
  res.status(200).json({
    success: true,
    count: seoData.length,
    data: seoData
  });
}));

// @desc    Get SEO data needing updates
// @route   GET /api/v1/seo/needing-updates
// @access  Private/Admin
router.get('/needing-updates', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const seoData = await SEO.getNeedingUpdates();
  
  res.status(200).json({
    success: true,
    count: seoData.length,
    data: seoData
  });
}));

// @desc    Get single SEO data
// @route   GET /api/v1/seo/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const seoData = await SEO.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');

  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found'
    });
  }

  res.status(200).json({
    success: true,
    data: seoData
  });
}));

// @desc    Create new SEO data
// @route   POST /api/v1/seo
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'seo'), [
  body('pagePath').notEmpty().withMessage('Page path is required'),
  body('pageTitle').notEmpty().withMessage('Page title is required'),
  body('metaTitle').notEmpty().withMessage('Meta title is required'),
  body('metaDescription').notEmpty().withMessage('Meta description is required'),
  body('metaTitle').isLength({ max: 60 }).withMessage('Meta title must be 60 characters or less'),
  body('metaDescription').isLength({ max: 160 }).withMessage('Meta description must be 160 characters or less')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  // Check if page path already exists
  const existingSEO = await SEO.findOne({ pagePath: req.body.pagePath.toLowerCase() });
  if (existingSEO) {
    return res.status(400).json({
      success: false,
      message: 'SEO data already exists for this page path'
    });
  }

  const seoData = await SEO.create({
    ...req.body,
    pagePath: req.body.pagePath.toLowerCase(),
    createdBy: req.user.id
  });

  // Calculate initial SEO score
  await seoData.calculateSEOScore();
  await seoData.save();

  logger.info(`SEO data created for page: ${seoData.pagePath} by user: ${req.user.id}`);

  res.status(201).json({
    success: true,
    data: seoData
  });
}));

// @desc    Update SEO data
// @route   PUT /api/v1/seo/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  let seoData = await SEO.findById(req.params.id);

  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found'
    });
  }

  // Save previous version
  await seoData.saveVersion(req.user.id);

  // Update the data
  seoData = await SEO.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedBy: req.user.id,
      pagePath: req.body.pagePath ? req.body.pagePath.toLowerCase() : seoData.pagePath
    },
    { new: true, runValidators: true }
  );

  // Recalculate SEO score
  await seoData.calculateSEOScore();
  await seoData.save();

  logger.info(`SEO data updated for page: ${seoData.pagePath} by user: ${req.user.id}`);

  res.status(200).json({
    success: true,
    data: seoData
  });
}));

// @desc    Delete SEO data
// @route   DELETE /api/v1/seo/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const seoData = await SEO.findById(req.params.id);

  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found'
    });
  }

  await SEO.findByIdAndDelete(req.params.id);

  logger.info(`SEO data deleted for page: ${seoData.pagePath} by user: ${req.user.id}`);

  res.status(200).json({
    success: true,
    message: 'SEO data deleted successfully'
  });
}));

// @desc    Calculate SEO score for a page
// @route   POST /api/v1/seo/:id/calculate-score
// @access  Private/Admin
router.post('/:id/calculate-score', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const seoData = await SEO.findById(req.params.id);

  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found'
    });
  }

  await seoData.calculateSEOScore();
  await seoData.save();

  res.status(200).json({
    success: true,
    data: {
      seoScore: seoData.seoScore,
      seoIssues: seoData.seoIssues,
      lastAnalyzed: seoData.lastAnalyzed
    }
  });
}));

// @desc    Bulk calculate SEO scores
// @route   POST /api/v1/seo/bulk-calculate-scores
// @access  Private/Admin
router.post('/bulk-calculate-scores', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const { pageIds } = req.body;

  if (!pageIds || !Array.isArray(pageIds)) {
    return res.status(400).json({
      success: false,
      message: 'Page IDs array is required'
    });
  }

  const results = [];
  
  for (const id of pageIds) {
    try {
      const seoData = await SEO.findById(id);
      if (seoData) {
        await seoData.calculateSEOScore();
        await seoData.save();
        results.push({
          id,
          seoScore: seoData.seoScore,
          success: true
        });
      }
    } catch (error) {
      results.push({
        id,
        success: false,
        error: error.message
      });
    }
  }

  res.status(200).json({
    success: true,
    data: results
  });
}));

// @desc    Publish/Unpublish SEO data
// @route   PUT /api/v1/seo/:id/publish
// @access  Private/Admin
router.put('/:id/publish', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const { isPublished } = req.body;

  const seoData = await SEO.findByIdAndUpdate(
    req.params.id,
    { 
      isPublished,
      updatedBy: req.user.id
    },
    { new: true }
  );

  if (!seoData) {
    return res.status(404).json({
      success: false,
      message: 'SEO data not found'
    });
  }

  logger.info(`SEO data ${isPublished ? 'published' : 'unpublished'} for page: ${seoData.pagePath} by user: ${req.user.id}`);

  res.status(200).json({
    success: true,
    data: seoData
  });
}));

// @desc    Get SEO statistics
// @route   GET /api/v1/seo/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const totalPages = await SEO.countDocuments();
  const publishedPages = await SEO.countDocuments({ isPublished: true });
  const activePages = await SEO.countDocuments({ isActive: true });
  
  const avgScore = await SEO.aggregate([
    { $group: { _id: null, avgScore: { $avg: '$seoScore' } } }
  ]);

  const scoreDistribution = await SEO.aggregate([
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $lt: ['$seoScore', 30] }, then: 'Poor (0-29)' },
              { case: { $lt: ['$seoScore', 50] }, then: 'Fair (30-49)' },
              { case: { $lt: ['$seoScore', 70] }, then: 'Good (50-69)' },
              { case: { $lt: ['$seoScore', 90] }, then: 'Very Good (70-89)' }
            ],
            default: 'Excellent (90-100)'
          }
        },
        count: { $sum: 1 }
      }
    }
  ]);

  const priorityDistribution = await SEO.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 }
      }
    }
  ]);

  const recentUpdates = await SEO.find()
    .sort({ lastUpdated: -1 })
    .limit(5)
    .select('pagePath pageTitle lastUpdated seoScore');

  res.status(200).json({
    success: true,
    data: {
      totalPages,
      publishedPages,
      activePages,
      averageScore: avgScore[0]?.avgScore || 0,
      scoreDistribution,
      priorityDistribution,
      recentUpdates
    }
  });
}));

// @desc    Export SEO data
// @route   GET /api/v1/seo/export
// @access  Private/Admin
router.get('/export', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const { format = 'json' } = req.query;

  const seoData = await SEO.find()
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .sort({ lastUpdated: -1 });

  if (format === 'csv') {
    // Convert to CSV format
    const csvData = seoData.map(item => ({
      'Page Path': item.pagePath,
      'Page Title': item.pageTitle,
      'Meta Title': item.metaTitle,
      'Meta Description': item.metaDescription,
      'SEO Score': item.seoScore,
      'Status': item.isPublished ? 'Published' : 'Draft',
      'Priority': item.priority,
      'Last Updated': item.lastUpdated
    }));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=seo-data.csv');
    
    // Simple CSV conversion
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    return res.send(csv);
  }

  res.status(200).json({
    success: true,
    count: seoData.length,
    data: seoData
  });
}));

// @desc    Bulk update SEO data
// @route   PUT /api/v1/seo/bulk-update
// @access  Private/Admin
router.put('/bulk-update', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const { updates } = req.body;

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      success: false,
      message: 'Updates array is required'
    });
  }

  const results = [];
  
  for (const update of updates) {
    try {
      const { id, ...updateData } = update;
      const seoData = await SEO.findByIdAndUpdate(
        id,
        {
          ...updateData,
          updatedBy: req.user.id
        },
        { new: true, runValidators: true }
      );
      
      if (seoData) {
        results.push({
          id,
          success: true,
          data: seoData
        });
      } else {
        results.push({
          id,
          success: false,
          error: 'SEO data not found'
        });
      }
    } catch (error) {
      results.push({
        id: update.id,
        success: false,
        error: error.message
      });
    }
  }

  res.status(200).json({
    success: true,
    data: results
  });
}));

// @desc    Get SEO data by priority
// @route   GET /api/v1/seo/priority/:priority
// @access  Private/Admin
router.get('/priority/:priority', protect, authorize('admin', 'seo'), asyncHandler(async (req, res) => {
  const { priority } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const seoData = await SEO.find({ priority })
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email')
    .sort({ lastUpdated: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await SEO.countDocuments({ priority });

  res.status(200).json({
    success: true,
    data: seoData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

module.exports = router; 