import mongoose from 'mongoose';

const ExternalVideoSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  videoId: { type: String, required: true },
  language: { type: String, required: true },
  filename: { type: String, required: true },
  tags: { type: [String], default: [] },
});

export default mongoose.models.ExternalVideo || mongoose.model('ExternalVideo', ExternalVideoSchema);
