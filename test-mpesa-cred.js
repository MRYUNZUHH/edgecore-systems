// Use axios from node_modules
const axios = require('./node_modules/axios');

const consumerKey = 'vFsF0ZqmbvzJPinZvLusiodQOmqUuDcwic7UBjM5uHaoTWA5';
const consumerSecret = 'Y48Lc4M2fIBsEbWRFoACj7ouyGp0AUnbtfAGh2uvAXy2PQGQ7bDqXIOPW9izPykf';

async function testMPesa() {
    console.log('🔐 Testing MPesa credentials...');
    console.log('Consumer Key:', consumerKey.substring(0, 15) + '...');
    console.log('Consumer Secret:', consumerSecret.substring(0, 15) + '...');
    
    const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    
    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    'Authorization': 'Basic ' + auth
                },
                timeout: 15000
            }
        );
        
        console.log('\n✅ SUCCESS! Credentials are valid!');
        console.log('📝 Access Token:', response.data.access_token.substring(0, 40) + '...');
        console.log('⏰ Expires in:', response.data.expires_in, 'seconds');
        console.log('\n🎉 You can now process MPesa payments!\n');
        
    } catch (error) {
        console.log('\n❌ ERROR:', error.response?.data?.errorMessage || error.message);
        
        if (error.response?.status === 401) {
            console.log('\n⚠️ Invalid credentials. Check your Consumer Key and Secret.');
            console.log('Make sure you copied them exactly from the Daraja portal.');
        } else if (error.code === 'ECONNABORTED') {
            console.log('\n⚠️ Connection timeout. Check your internet connection.');
        } else if (error.response) {
            console.log('\n📋 Full error:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testMPesa();
