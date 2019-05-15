require('dotenv').config();

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const sendToS3 = (fileName: string, fileContents: string) => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('Missing AWS bucket name.');
  }
  s3.putObject(
    {
      Body: fileContents,
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
    },
    (err: any, data: any) => console.log(err, data)
  );
};

export default sendToS3;
