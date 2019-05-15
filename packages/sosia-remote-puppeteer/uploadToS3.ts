require('dotenv').config();

import crypto from 'crypto';

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const sendToS3 = (fileContents: string, contentType: string, fileExtension: string) => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('Missing AWS bucket name.');
  }
  const bucket = process.env.S3_BUCKET_NAME;
  const fileName = `${crypto
    .createHmac('sha256', process.env.CRYPTO_HASH || 'secret')
    .update(fileContents)
    .digest('hex')}.${fileExtension}}`;
  return s3
    .putObject({
      ACL: 'public-read',
      Body: fileContents,
      Bucket: bucket,
      ContentType: contentType,
      Key: fileName,
    })
    .promise()
    .then(() =>
      s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: fileName,
      })
    );
};

export default sendToS3;
