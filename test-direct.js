const https = require('https');

const consumerKey = 'vFsF0ZqmbvzJPinZvLusiodQOmqUuDcwic7UBjM5uHaoTWA5';
const consumerSecret = 'Y48Lc4M2fIBsEbWRFoACj7ouyGp0AUnbtfAGh2uvAXy2PQGQ7bDqXIOPW9izPykf';

const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');

const options = {
  hostname: 'sandbox.safaricom.co.ke',
  path: '/oauth/v1/generate?grant_type=client_credentials',
  method: 'GET',
  headers: {
    'Authorization': 'Basic ' + auth
  }
};

console.log('Testing MPesa credentials...');
console.log('Auth header length:', auth.length);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      if (json.access_token) {
        console.log('✅ SUCCESS! Token obtained');
      } else {
        console.log('❌ ERROR:', json.errorMessage || 'Unknown error');
      }
    } catch(e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.end();
