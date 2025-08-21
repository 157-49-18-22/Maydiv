#!/bin/bash

echo "🚀 Maydiv Deployment Script"
echo "=========================="

# Function to deploy to Vercel
deploy_vercel() {
    echo "📦 Building for Vercel..."
    npm run build
    
    echo "🚀 Deploying to Vercel..."
    echo "Please push your changes to GitHub:"
    echo "git add ."
    echo "git commit -m 'Update for Vercel deployment'"
    echo "git push origin main"
    echo ""
    echo "Vercel will automatically deploy from GitHub"
}

# Function to deploy to Hostinger
deploy_hostinger() {
    echo "📦 Building for Hostinger..."
    npm run build:hostinger
    
    echo "📁 Static build created in 'out' folder"
    echo "📤 Upload the 'out' folder contents to Hostinger via FTP"
    echo ""
    echo "FTP Upload Instructions:"
    echo "1. Connect to your Hostinger FTP"
    echo "2. Navigate to public_html folder"
    echo "3. Upload all contents from the 'out' folder"
    echo "4. Replace existing files if prompted"
}

# Function to clear cache
clear_cache() {
    echo "🧹 Clearing cache..."
    rm -rf .next
    rm -rf out
    npm cache clean --force
    echo "✅ Cache cleared successfully"
}

# Function to reinstall dependencies
reinstall_deps() {
    echo "📦 Reinstalling dependencies..."
    rm -rf node_modules package-lock.json
    npm install
    echo "✅ Dependencies reinstalled successfully"
}

# Main menu
echo "Choose deployment option:"
echo "1) Deploy to Vercel"
echo "2) Deploy to Hostinger"
echo "3) Clear cache"
echo "4) Reinstall dependencies"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        deploy_vercel
        ;;
    2)
        deploy_hostinger
        ;;
    3)
        clear_cache
        ;;
    4)
        reinstall_deps
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
