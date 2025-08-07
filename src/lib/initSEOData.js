import { SEOService } from './seoService.js';

// Default SEO data for all pages
const defaultSEOData = [
  {
    pagePath: '/',
    title: 'Maydiv - Leading Digital Solutions Provider',
    description: 'Transform your business with Maydiv\'s comprehensive digital solutions. We specialize in web development, app development, AI solutions, and digital marketing services.',
    keywords: 'digital solutions, web development, app development, AI, digital marketing, technology services',
    ogImage: '/logo.png',
    canonical: 'https://maydiv.com',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ]
  },
  {
    pagePath: '/about',
    title: 'About Us - Maydiv Digital Solutions',
    description: 'Learn about Maydiv\'s journey in digital transformation. We are a team of experts dedicated to delivering innovative digital solutions for businesses worldwide.',
    keywords: 'about maydiv, digital agency, team, company history, digital transformation',
    ogImage: '/about-1.png',
    canonical: 'https://maydiv.com/about',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/contact',
    title: 'Contact Us - Maydiv Digital Solutions',
    description: 'Get in touch with Maydiv for your digital transformation needs. We\'re here to help you achieve your business goals with cutting-edge technology solutions.',
    keywords: 'contact maydiv, digital solutions contact, business inquiry, consultation',
    ogImage: '/logo.png',
    canonical: 'https://maydiv.com/contact',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/projects',
    title: 'Our Projects - Maydiv Portfolio',
    description: 'Explore Maydiv\'s impressive portfolio of successful digital projects. From web applications to mobile apps, see how we\'ve helped businesses grow.',
    keywords: 'maydiv projects, portfolio, case studies, web development projects, app development',
    ogImage: '/Project.png',
    canonical: 'https://maydiv.com/projects',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/testimonials',
    title: 'Client Testimonials - Maydiv',
    description: 'Read what our clients say about Maydiv\'s digital solutions. Real stories from businesses that have transformed their digital presence with our help.',
    keywords: 'maydiv testimonials, client reviews, customer feedback, success stories',
    ogImage: '/Testi1.png',
    canonical: 'https://maydiv.com/testimonials',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/web-development',
    title: 'Web Development Services - Maydiv',
    description: 'Professional web development services by Maydiv. We create responsive, modern websites that drive business growth and enhance user experience.',
    keywords: 'web development, website design, responsive websites, custom web applications',
    ogImage: '/Web.png',
    canonical: 'https://maydiv.com/web-development',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/app-development',
    title: 'App Development Services - Maydiv',
    description: 'Expert mobile app development services by Maydiv. We build native and cross-platform mobile applications that engage users and drive business results.',
    keywords: 'app development, mobile apps, iOS development, Android development, cross-platform apps',
    ogImage: '/App.png',
    canonical: 'https://maydiv.com/app-development',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/ai',
    title: 'AI Solutions - Maydiv',
    description: 'Cutting-edge AI solutions by Maydiv. We leverage artificial intelligence to automate processes, enhance decision-making, and drive business innovation.',
    keywords: 'AI solutions, artificial intelligence, machine learning, automation, business AI',
    ogImage: '/Servicesai.png',
    canonical: 'https://maydiv.com/ai',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/marketing',
    title: 'Digital Marketing Services - Maydiv',
    description: 'Comprehensive digital marketing services by Maydiv. From SEO to social media marketing, we help businesses reach their target audience and grow online.',
    keywords: 'digital marketing, SEO, social media marketing, content marketing, online advertising',
    ogImage: '/Marketing.json',
    canonical: 'https://maydiv.com/marketing',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/apps',
    title: 'Mobile Apps & Web Applications - Maydiv',
    description: 'Custom mobile apps and web applications by Maydiv. We create user-friendly, scalable applications that solve real business problems.',
    keywords: 'mobile apps, web applications, custom software, business applications',
    ogImage: '/Apps1.png',
    canonical: 'https://maydiv.com/apps',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  },
  {
    pagePath: '/apps/ui-ux',
    title: 'UI/UX Design Services - Maydiv',
    description: 'Professional UI/UX design services by Maydiv. We create intuitive, beautiful user interfaces that enhance user experience and drive engagement.',
    keywords: 'UI design, UX design, user interface, user experience, design services',
    ogImage: '/UI.png',
    canonical: 'https://maydiv.com/apps/ui-ux',
    noIndex: false,
    customMetaTags: [
      { name: 'author', content: 'Maydiv Team' }
    ]
  }
];

export const initializeSEOData = async () => {
  try {
    console.log('Initializing SEO data...');
    
    for (const seoData of defaultSEOData) {
      try {
        // Check if SEO data already exists for this page
        const existingData = await SEOService.getSEOByPath(seoData.pagePath);
        
        if (!existingData) {
          // Create new SEO data
          await SEOService.createSEO(seoData);
          console.log(`✅ Created SEO data for: ${seoData.pagePath}`);
        } else {
          console.log(`⏭️  SEO data already exists for: ${seoData.pagePath}`);
        }
      } catch (error) {
        console.error(`❌ Error creating SEO data for ${seoData.pagePath}:`, error);
      }
    }
    
    console.log('✅ SEO data initialization completed!');
  } catch (error) {
    console.error('❌ Error initializing SEO data:', error);
  }
};

// Function to run initialization (can be called from admin panel)
export const runSEOInitialization = () => {
  if (typeof window !== 'undefined') {
    initializeSEOData();
  }
};

