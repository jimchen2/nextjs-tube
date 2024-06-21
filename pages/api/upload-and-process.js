import { generatePresignedUrl } from '../../lib/s3';
import { updateDatabase } from '../../lib/database';
import { startTranscriptionJob } from '../../lib/transcription';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fileName, fileType, language, tags } = req.body;

      // Generate presigned URL
      const { url, s3ObjectKey } = await generatePresignedUrl(fileName, fileType);

      // Update database
      await updateDatabase(s3ObjectKey, language, fileName, tags);

      // Start transcription job
      await startTranscriptionJob(s3ObjectKey, language, fileType);

      res.status(200).json({ url, s3ObjectKey });
    } catch (error) {
      console.error('Error in upload-and-process:', error);
      res.status(500).json({ error: 'Failed to process upload' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}