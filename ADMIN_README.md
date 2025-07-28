# Maydiv Admin Dashboard

A comprehensive code management and analytics dashboard for the Maydiv portfolio website. This admin panel allows clients to view, search, and edit all code files in the project.

## 🚀 Features

### 📊 Analytics Dashboard
- **Real-time Statistics**: View total files, lines of code, and file sizes
- **Code Analysis**: Breakdown by file extensions and directories
- **Performance Metrics**: Track largest and most complex files
- **Project Overview**: Package.json information and Git status

### 📁 File Management
- **File Explorer**: Browse all app and components directories
- **Code Viewer**: Syntax-highlighted code display
- **Live Search**: Find files quickly with real-time search
- **File Editing**: In-place code editing with save functionality
- **File Statistics**: View file size, line count, and modification dates

### 🔐 Security
- **Authentication System**: Protected admin access
- **File Validation**: Security checks to prevent unauthorized file access
- **Session Management**: Secure login/logout functionality

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.0.0 or higher
- Next.js project with the admin dashboard files

### Important Configuration Note
The admin dashboard requires API routes to function. If your project was previously configured for static export (`output: 'export'` in `next.config.ts`), this has been temporarily disabled to enable the admin dashboard functionality.

### Access the Dashboard

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the admin login**:
   ```
   http://localhost:3000/admin/login
   ```

3. **Login with default credentials**:
   - Username: `admin`
   - Password: `maydiv2024`

4. **Access the main dashboard**:
   ```
   http://localhost:3000/admin
   ```

## 📋 API Endpoints

### Authentication
- `POST /api/admin/auth` - Login authentication
- `GET /api/admin/auth` - Health check

### Code Management
- `GET /api/admin/code` - Get all code files and structure
- `POST /api/admin/code` - Update file content
- `GET /api/admin/file?path=<filepath>` - Get specific file content
- `POST /api/admin/file` - Create/update specific file
- `DELETE /api/admin/file?path=<filepath>` - Delete specific file

### Analytics
- `GET /api/admin/stats` - Get project statistics and analytics

## 🎯 Usage Guide

### Viewing Code Files

1. **Navigate to the File Explorer** (left panel)
2. **Switch between tabs**:
   - **App**: View all files in `src/app/` directory
   - **Components**: View all files in `src/components/` directory
3. **Click on any file** to view its content in the right panel
4. **Use the search bar** to quickly find specific files

### Editing Code Files

1. **Select a file** from the file explorer
2. **Click the "Edit" button** in the file content panel
3. **Make your changes** in the text editor
4. **Click "Save"** to apply changes or "Cancel" to discard

### Viewing Analytics

1. **Check the stats cards** at the top for quick overview
2. **View detailed statistics** including:
   - Total files and lines of code
   - Breakdown by file type
   - Largest and most complex files
   - Directory-wise analysis

## 🔧 Configuration

### Changing Default Credentials

Edit the authentication credentials in `src/app/api/admin/auth/route.js`:

```javascript
const ADMIN_CREDENTIALS = {
  username: 'your-username',
  password: 'your-secure-password'
};
```

### Customizing File Extensions

Modify the supported file extensions in `src/app/api/admin/code/route.js`:

```javascript
const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md'];
```

## 🛡️ Security Considerations

### Production Deployment

1. **Change default credentials** immediately
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** (Firebase Auth, JWT, etc.)
4. **Add rate limiting** to prevent abuse
5. **Use HTTPS** for all communications
6. **Regular security audits** of the admin panel

### File Access Restrictions

The admin dashboard includes security measures:
- Files can only be accessed within the `src/` directory
- Directory traversal attacks are prevented
- File operations are validated before execution

## 📱 Responsive Design

The admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🐛 Troubleshooting

### Common Issues

**1. Authentication fails**
- Check if the server is running
- Verify credentials are correct
- Clear browser cache and try again

**2. Files not loading**
- Ensure the development server is running
- Check file permissions
- Verify the file path exists

**3. Edit functionality not working**
- Check browser console for errors
- Ensure you have write permissions
- Verify the API endpoints are accessible

### Error Messages

- **"Access denied"**: File is outside the allowed directory
- **"File not found"**: The requested file doesn't exist
- **"Invalid credentials"**: Username or password is incorrect

## 🔄 Updates & Maintenance

### Regular Tasks

1. **Update dependencies** regularly
2. **Monitor access logs** for suspicious activity
3. **Backup important files** before major changes
4. **Test functionality** after updates

### Adding New Features

The admin dashboard is modular and can be extended with:
- Additional file type support
- Advanced search capabilities
- Code syntax highlighting
- Version control integration
- User management system

## 📞 Support

For technical support or feature requests:
1. Check the troubleshooting section above
2. Review the API documentation
3. Contact the development team

---

**Note**: This admin dashboard is designed for development and client review purposes. For production use, implement additional security measures and proper authentication systems. 