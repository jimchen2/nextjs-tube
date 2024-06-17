import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dbConnect from '../../lib/mongoose';
import Video from '../../models/Video';

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.S3_BUCKET_NAME;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'DELETE') {
    const { fileName } = req.body;

    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    try {
      // Delete the file from S3
      const command = new DeleteObjectCommand(params);
      await s3Client.send(command);

      // Delete the file from the database
      await Video.findOneAndDelete({ s3ObjectKey: fileName });

      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
