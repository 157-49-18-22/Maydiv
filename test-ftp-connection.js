// FTP Connection Test Script
// Run this to test if your FTP credentials work

const ftp = require('basic-ftp');

async function testFTPConnection() {
  const client = new ftp.Client();
  
  try {
    console.log('🔍 Testing FTP Connection...');
    
    // Replace these with your actual FTP details
    const config = {
      host: 'YOUR_FTP_HOST', // e.g., ftp.yourdomain.com
      user: 'YOUR_FTP_USERNAME',
      password: 'YOUR_FTP_PASSWORD',
      port: 21
    };
    
    console.log('📡 Connecting to:', config.host);
    await client.access(config);
    console.log('✅ FTP Connection Successful!');
    
    // List directory contents
    console.log('📁 Listing directory contents...');
    const list = await client.list();
    console.log('📋 Directory contents:', list.map(item => item.name));
    
    // Test upload directory
    const uploadDir = 'public_html'; // or your specific directory
    console.log(`📤 Testing access to upload directory: ${uploadDir}`);
    
    try {
      await client.cd(uploadDir);
      console.log(`✅ Successfully accessed ${uploadDir} directory`);
    } catch (error) {
      console.log(`❌ Cannot access ${uploadDir} directory:`, error.message);
      console.log('💡 Try using: / (root directory) or your domain folder name');
    }
    
  } catch (error) {
    console.log('❌ FTP Connection Failed:', error.message);
    console.log('\n🔧 Troubleshooting Tips:');
    console.log('1. Check FTP hostname (usually ftp.yourdomain.com)');
    console.log('2. Verify username and password');
    console.log('3. Check if FTP is enabled in Hostinger');
    console.log('4. Try connecting with FileZilla first');
  } finally {
    client.close();
  }
}

// Run the test
testFTPConnection();

