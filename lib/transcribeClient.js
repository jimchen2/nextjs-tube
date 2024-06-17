import { TranscribeClient } from "@aws-sdk/client-transcribe";

const REGION = process.env.AWS_REGION; // Replace with your region

const transcribeClient = new TranscribeClient({ region: REGION });

export { transcribeClient };
