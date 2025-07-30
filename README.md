# Maydiv - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS. This project showcases web development, AI services, app development, and marketing solutions.

## 🌟 Features

- **Modern UI/UX Design** - Beautiful and responsive design
- **Multiple Service Pages** - Web Development, AI Services, App Development, Marketing
- **Interactive Components** - Lottie animations, carousels, and smooth transitions
- **Contact Forms** - Integrated contact functionality
- **Testimonials** - Customer testimonials and reviews
- **Project Showcase** - Portfolio of completed projects

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** (for cloning the repository)

### Checking Your Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

If any of these commands fail, please install the missing software:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
# Clone the repository using HTTPS
git clone https://github.com/Maydiv123/Maydiv.git

# Or using SSH (if you have SSH keys set up)
git clone git@github.com:Maydiv123/Maydiv.git
```

### Step 2: Navigate to Project Directory

```bash
cd Maydiv
```

### Step 3: Install Dependencies

Choose one of the following package managers:

```bash
# Using npm (recommended)
npm install


### Step 4: Run the Development Server
# Using npm
npm run dev


### Step 5: Open Your Browser

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```
Maydiv/
├── public/                 # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js app directory (pages and layouts)
│   │   ├── about/         # About page
│   │   ├── ai/            # AI services page
│   │   ├── apps/          # App development page
│   │   ├── contact/       # Contact page
│   │   ├── marketing/     # Marketing page
│   │   ├── projects/      # Projects page
│   │   ├── testimonials/  # Testimonials page
│   │   └── web-development/ # Web development page
│   ├── components/        # React components
│   └── styles/           # Global styles
├── package.json          # Project dependencies and scripts
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files
```



## 🐛 Troubleshooting

### Common Issues

**1. Port 3000 is already in use**
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

**2. Node modules issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**4. Build errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Issues

- Ensure you're using a modern browser
- Check that all images are optimized
- Consider using a CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting) above
2. Search existing [GitHub issues](https://github.com/Maydiv123/Maydiv/issues)
3. Create a new issue with detailed information about your problem



## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Lottie](https://lottiefiles.com/)

---

