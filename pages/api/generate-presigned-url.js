import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const region = process.env.AWS_REGION;
const bucketName = process.env.S3_BUCKET_NAME;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { fileName, fileType } = req.body;
    const uniqueFileName = `${uuidv4()}-${fileName}`;
    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      ContentType: fileType,
    };

    try {
      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
      res.status(200).json({ url, s3ObjectKey: uniqueFileName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating presigned URL' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
