const got = require('got');
const fs = require('fs');

let geckodriverAddress = 'http://localhost:4444';
let baseUrl = geckodriverAddress+'/session/';
(async () => {
  const {body} = await got.post(baseUrl, {
    json: {
      "capabilities": {
        "alwaysMatch": {
          "browserName": "firefox"
        }
      },
      "desiredCapabilities": {
        "browserName": "firefox",
      }
    },
    responseType: 'json'
  })

  await got.post(baseUrl+ body.value.sessionId+'/url', {
    json: {
      'url': 'https://www.w3.org/TR/html-transcript-src/'
    },
    responseType: 'json'
  });

  let base64 = await got.post(baseUrl+ body.value.sessionId+'/print', {
    json: {
      'orientation': 'landscape',
      'pageRanges': ["1-2"]
    },
  })

  let obj = JSON. parse(base64.body);

  await fs.writeFileSync('./test.pdf', obj.value, 'base64');

  await got.delete(baseUrl+ body.value.sessionId, {
    json: {
    },
    responseType: 'json'
  });
})();



