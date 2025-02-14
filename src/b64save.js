// 푸시테스트
const express = require('express');
const fs = require('fs');
const buffer = require('buffer');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/b64save', (req, res) => {
  const filename = req.body.filename;
  const b64input = req.body.b64input;
  console.log(filename, b64input);

  // 파일 이름에 .b64 확장자를 추가합니다.
  const fullFilename = `${filename}.b64`;

  // base64 인코딩된 문자열을 base64 디코딩합니다.
  const decodedString = Buffer.from(b64input, 'base64')
  console.log(decodedString);
  decodedFileContent = decodedString.toString();
  console.log(decodedFileContent);
  
  // 파일에 base64 인코딩된 문자열을 저장합니다.
  fs.appendFileSync(fullFilename, decodedFileContent);

  // 파일의 크기를 반환합니다.
  res.send({
    filesize: decodedFileContent.length,
  });
});

const getB64List = () => {
  const files = fs.readdirSync('.');
  const b64Files = files.filter(file => file.endsWith('.b64'));

  const b64List = b64Files.map(file => {
    const filename = path.basename(file, '.b64');
    const filesize = fs.statSync(file).size;

    return {
      filename,
      filesize
    };
  });

  return b64List;
};

app.get('/b64list', (req, res) => {
  res.send(getB64List());
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
