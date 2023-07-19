const buffer = require('buffer');

// Base64 문자열
const base64String = 'SGVsbG8gV29ybGQ=';

// Base64 디코딩
const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');

console.log(decodedString);
