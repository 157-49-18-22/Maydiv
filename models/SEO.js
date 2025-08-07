const mongoose = require('mongoose');

const SEOSchema = new mongoose.Schema({
  // Page/Route Information
  pagePath: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  pageTitle: {
    type: String,
    required: true,
    trim: true
  },
  
  // Basic SEO
  metaTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60
  },
  metaDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160
  },
  keywords: [{
    type: String,
    trim: true
  }],
  canonicalUrl: {
    type: String,
    trim: true
  },
  
  // Open Graph
  ogTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  ogDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  ogImage: {
    type: String,
    trim: true
  },
  ogType: {
    type: String,
    enum: ['website', 'article', 'product', 'profile'],
    default: 'website'
  },
  ogUrl: {
    type: String,
    trim: true
  },
  
  // Twitter Card
  twitterCard: {
    type: String,
    enum: ['summary', 'summary_large_image', 'app', 'player'],
    default: 'summary_large_image'
  },
  twitterTitle: {
    type: String,
    trim: true,
    maxlength: 60
  },
  twitterDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  twitterImage: {
    type: String,
    trim: true
  },
  twitterSite: {
    type: String,
    trim: true
  },
  twitterCreator: {
    type: String,
    trim: true
  },
  
  // Additional Meta Tags
  additionalMetaTags: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Structured Data (JSON-LD)
  structuredData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Robots and Indexing
  robots: {
    type: String,
    enum: ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'],
    default: 'index, follow'
  },
  noindex: {
    type: Boolean,
    default: false
  },
  nofollow: {
    type: Boolean,
    default: false
  },
  
  // Page Speed and Performance
  preloadResources: [{
    type: String,
    trim: true
  }],
  prefetchResources: [{
    type: String,
    trim: true
  }],
  
  // Analytics and Tracking
  googleAnalyticsId: {
    type: String,
    trim: true
  },
  googleTagManagerId: {
    type: String,
    trim: true
  },
  facebookPixelId: {
    type: String,
    trim: true
  },
  
  // Content Optimization
  h1Tag: {
    type: String,
    trim: true
  },
  h2Tags: [{
    type: String,
    trim: true
  }],
  h3Tags: [{
    type: String,
    trim: true
  }],
  
  // Internal Linking
  internalLinks: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    anchorText: {
      type: String,
      trim: true
    }
  }],
  
  // Schema Markup
  schemaMarkup: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // SEO Score and Analysis
  seoScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  seoIssues: [{
    type: {
      type: String,
      enum: ['error', 'warning', 'info'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    }
  }],
  
  // Status and Management
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  lastAnalyzed: {
    type: Date
  },
  
  // SEO Specialist Information
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Version Control
  version: {
    type: Number,
    default: 1
  },
  previousVersions: [{
    version: Number,
    data: mongoose.Schema.Types.Mixed,
    updatedAt: Date,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Notes and Comments
  notes: {
    type: String,
    trim: true
  },
  
  // Priority and Scheduling
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  scheduledUpdate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
SEOSchema.index({ pagePath: 1 });
SEOSchema.index({ isActive: 1, isPublished: 1 });
SEOSchema.index({ createdBy: 1 });
SEOSchema.index({ lastUpdated: -1 });
SEOSchema.index({ seoScore: -1 });

// Virtual for full URL
SEOSchema.virtual('fullUrl').get(function() {
  return `${process.env.FRONTEND_URL}${this.pagePath}`;
});

// Pre-save middleware to update version
SEOSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.lastUpdated = new Date();
    this.version += 1;
  }
  next();
});

// Method to save previous version
SEOSchema.methods.saveVersion = function(userId) {
  const currentData = this.toObject();
  delete currentData._id;
  delete currentData.__v;
  
  this.previousVersions.push({
    version: this.version - 1,
    data: currentData,
    updatedAt: new Date(),
    updatedBy: userId
  });
  
  return this.save();
};

// Method to calculate SEO score
SEOSchema.methods.calculateSEOScore = function() {
  let score = 0;
  let issues = [];
  
  // Check meta title
  if (this.metaTitle && this.metaTitle.length >= 30 && this.metaTitle.length <= 60) {
    score += 10;
  } else {
    issues.push({
      type: 'warning',
      message: 'Meta title should be between 30-60 characters',
      priority: 'high'
    });
  }
  
  // Check meta description
  if (this.metaDescription && this.metaDescription.length >= 120 && this.metaDescription.length <= 160) {
    score += 10;
  } else {
    issues.push({
      type: 'warning',
      message: 'Meta description should be between 120-160 characters',
      priority: 'high'
    });
  }
  
  // Check keywords
  if (this.keywords && this.keywords.length > 0) {
    score += 5;
  } else {
    issues.push({
      type: 'info',
      message: 'Keywords are not set',
      priority: 'medium'
    });
  }
  
  // Check H1 tag
  if (this.h1Tag) {
    score += 10;
  } else {
    issues.push({
      type: 'warning',
      message: 'H1 tag is missing',
      priority: 'high'
    });
  }
  
  // Check Open Graph
  if (this.ogTitle && this.ogDescription && this.ogImage) {
    score += 15;
  } else {
    issues.push({
      type: 'info',
      message: 'Open Graph tags are incomplete',
      priority: 'medium'
    });
  }
  
  // Check structured data
  if (this.structuredData && Object.keys(this.structuredData).length > 0) {
    score += 20;
  } else {
    issues.push({
      type: 'info',
      message: 'Structured data is not implemented',
      priority: 'low'
    });
  }
  
  // Check canonical URL
  if (this.canonicalUrl) {
    score += 10;
  } else {
    issues.push({
      type: 'warning',
      message: 'Canonical URL is not set',
      priority: 'medium'
    });
  }
  
  // Check internal links
  if (this.internalLinks && this.internalLinks.length >= 3) {
    score += 10;
  } else {
    issues.push({
      type: 'info',
      message: 'Consider adding more internal links',
      priority: 'low'
    });
  }
  
  // Check content length (if available)
  if (this.h2Tags && this.h2Tags.length >= 2) {
    score += 10;
  }
  
  this.seoScore = Math.min(score, 100);
  this.seoIssues = issues;
  this.lastAnalyzed = new Date();
  
  return this;
};

// Static method to get SEO data by page path
SEOSchema.statics.getByPagePath = function(pagePath) {
  return this.findOne({ 
    pagePath: pagePath.toLowerCase(),
    isActive: true,
    isPublished: true 
  });
};

// Static method to get all published SEO data
SEOSchema.statics.getAllPublished = function() {
  return this.find({ 
    isActive: true,
    isPublished: true 
  }).sort({ priority: -1, lastUpdated: -1 });
};

// Static method to get SEO data needing updates
SEOSchema.statics.getNeedingUpdates = function() {
  return this.find({
    isActive: true,
    $or: [
      { seoScore: { $lt: 70 } },
      { lastAnalyzed: { $exists: false } },
      { lastAnalyzed: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
    ]
  }).sort({ seoScore: 1, priority: -1 });
};

module.exports = mongoose.model('SEO', SEOSchema); 