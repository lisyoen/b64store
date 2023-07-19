const express = require('express');
const fs = require('fs');
const buffer = require('buffer');

const app = express();
app.use(express.json());

app.post('/b64save', (req, res) => {
  const filename = req.body.filename;
  const b64input = req.body.b64input;
  console.log(filename, b64input);

  // 파일 이름에 .b64 확장자를 추가합니다.
  const fullFilename = `${filename}.b64`;

  // 파일에 base64 인코딩된 문자열을 저장합니다.
  fs.writeFileSync(fullFilename, b64input);

  // base64 인코딩된 문자열을 base64 디코딩합니다.
  const decodedFileContent = buffer.from(b64input).toString();

  // 파일의 크기를 반환합니다.
  res.send({
    filesize: decodedFileContent.length,
  });
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
