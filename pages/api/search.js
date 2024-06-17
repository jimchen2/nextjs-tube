import dbConnect from '../../lib/mongoose';
import Video from '../../models/Video';

export default async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    const { query } = req.query;

    try {
      let videos;
      if (!query) {
        videos = await Video.aggregate([{ $sample: { size: 20 } }]);
      } else {
        videos = await Video.find({
          $or: [
            { filename: { $regex: query, $options: 'i' } },
            { language: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
          ],
        });
      }

      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error searching for videos' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
