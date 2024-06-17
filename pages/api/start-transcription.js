// pages/api/start-transcription.js

import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribeClient } from '../../lib/transcribeClient';
import { getMediaFormat } from '../../lib/mimeTypeMapping';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { s3ObjectKey, language, fileType } = req.body;
    const AWS_REGION = process.env.AWS_REGION;
    const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
    
    const s3BucketUrl = AWS_REGION === 'us-east-1'
        ? `https://${S3_BUCKET_NAME}.s3.amazonaws.com`
        : `https://${S3_BUCKET_NAME}.s3-${AWS_REGION}.amazonaws.com`;
    


    if (!s3ObjectKey) {
      return res.status(400).json({ error: 's3ObjectKey is required' });
    }

    const fileExtension = getMediaFormat(fileType);
    if (!fileExtension) {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    const mediaUri = `${s3BucketUrl}/${s3ObjectKey}`;

    const params = {
      TranscriptionJobName: `${s3ObjectKey}_${language}`, // Append the language to the job name
      LanguageCode: language,
      MediaFormat: fileExtension,
      Media: {
        MediaFileUri: mediaUri,
      },
      OutputBucketName: process.env.S3_BUCKET_NAME, 
      Subtitles: {
        Formats: ["vtt"],
        OutputStartIndex: 1,
      },
    };

    try {
      const data = await transcribeClient.send(new StartTranscriptionJobCommand(params));
      res.status(200).json({ message: 'Transcription job started successfully', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error starting transcription job' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
