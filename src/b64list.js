const fs = require('fs');
const path = require('path');

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