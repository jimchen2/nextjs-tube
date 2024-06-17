import mongoose from 'mongoose';

const SubtitleSchema = new mongoose.Schema({
  language: { type: String, required: true },
  url: { type: String, required: true },
});

const VideoSchema = new mongoose.Schema({
  s3ObjectKey: { type: String, required: true },
  url: { type: String, required: true },
  language: { type: String, required: true },
  subtitles: { type: [SubtitleSchema], default: [] },
  filename: { type: String, required: true },
  tags: { type: [String], default: [] },
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
