import dbConnect from '../../lib/mongoose';
import Video from '../../models/Video';

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    const { s3ObjectKey } = req.query;

    if (!s3ObjectKey) {
      return res.status(400).json({ error: 's3ObjectKey parameter is required' });
    }

    try {
      const video = await Video.findOne({ s3ObjectKey });

      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }

      res.status(200).json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching video details' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
