import dbConnect from '../../lib/mongoose';
import ExternalVideo from '../../models/ExternalVideo';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const externalVideo = await ExternalVideo.create(req.body);
        res.status(201).json({ success: true, data: externalVideo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
