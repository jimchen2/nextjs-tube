import dbConnect from '../../../lib/mongoose';
import Video from '../../../models/Video';

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'POST') {
    const { s3ObjectKey, language, fileName, tags } = req.body;
    const s3PublicUrl = process.env.S3_PUBLIC_URL;

    if (!s3ObjectKey) {
      return res.status(400).json({ error: 's3ObjectKey is required' });
    }

    try {
      const newVideo = new Video({
        s3ObjectKey,
        url: `${s3PublicUrl}/${s3ObjectKey}`,
        language,
        subtitles: [],
        filename: fileName,
        tags,
      });

      await newVideo.save();
      res.status(200).json({ message: 'Upload finalized and database updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error finalizing upload and updating database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
