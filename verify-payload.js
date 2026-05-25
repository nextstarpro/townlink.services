const https = require('https');

async function testSubmitProvider() {
  const payload = {
    "Provider Name": "Test User",
    "Business Name": "Test Business",
    "Email": "test@test.com",
    "Region": "Ashanti",
    "City / Town": "Kumasi",
    "Service Category": "Electrician",
    "Service Categories": ["Electrician"],
    "isReturning": true,
    "existingRecordId": ""
  };
  
  const payloadStr = JSON.stringify(payload);
  const url = new URL('https://services.townlinkglobal.com/.netlify/functions/submit-provider');
  const options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payloadStr) } };
  
  return new Promise((resolve) => {
    const req = https.request(url, options, (res) => {
      let data = ''; res.on('data', (c) => data += c);
      res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve();
      });
    });
    req.write(payloadStr); req.end();
  });
}

testSubmitProvider();
