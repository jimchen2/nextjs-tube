## How to Install?

```
mkdir nextjs-tube && cd nextjs-tube
curl -o docker-compose.yml https://raw.githubusercontent.com/jimchen2/nextjs-tube/main/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/jimchen2/nextjs-tube/main/.env.example
# configure .env, add amazon s3 access keys
docker-compose up -d
```

Then configure nginx

```
# add Dockerfile
docker build -t jimchen2/nextjs-tube:0 .

# add docker-compose and .env
docker-compose up -d

```

![image](https://github.com/jimchen2/nextjs-tube/assets/123833550/d3bdba5f-ec8a-47a1-bbd3-4d51395c54d9)
![image](https://github.com/jimchen2/nextjs-tube/assets/123833550/1c88b3b5-dd68-4d65-a29d-397542c2e770)

## Todo List
## Functionality

1. Upload Video:

User Upload Video with Tags(Optional), Language, Filename, Video File, Preview Image TimeStamp(default 5), Thumbnail Start(default 0-15)

Upload -> Upload to S3 through presigned URL -> AWS Transcribe -> AWS Translate if not English, else pass -> Use AWS Lambda to extract Preview Image and Thumbnail with `ffmpeg`, make them smaller size and upload to S3 bucket return URL -> Index in MongoDB

2. Merge Video:

User Merge Video with Tags(Optional), Langauge, Filename, Platform, External URL, Preview Image File, Thumbnail File(optional)

Merging Video means user put embedded iframes 

Merge -> Check if Platform and URL is Valid(Only support few platforms like YouTube, a few PeerTube instance), both client & server side checking -> Derive Preview Image and Thumbnail, if cannot derive let user input the previewimage and thumbnail(optional), which then uploads to S3 -> Index in MongoDB

3. Delete Video:

Delete video needs admin password

Delete -> Prompt Password -> Continue if Correct, else error and quit -> Delete from MongoDB -> Delete video & Subtitle from AWS S3 if Video isn't Merged else Pass

4. Search Video:

Find any video with ... &sort=&start=&end=&language=&tag=&query= , if empty then default containing the query, query searches for query in filename (both capital/no letters)

Input query -> Return Videos from MongoDB with Preview Image and Thumbnail(hover), with paging

5. Play Video 

If video is Merged-> derive the embedded iframe 

If video is Uploaded -> Let User Toggle Subtitle in a Button -> Show the Subtitle with CSS Over the Video Frame with src the S3 URL

## Hide Tags

Configure in Cookie for users to hide videos with tags in search

Configure in Cookie to save user's preferences

## MongoDB 

```
const mongoose = require('mongoose');

const SubtitleSchema = new mongoose.Schema({
  language: { type: String, required: true },
  url: { type: String, required: true },
});

const VideoSchema = new mongoose.Schema({
  tags: { type: [String], default: [] },
  language: { type: String, required: true },
  filename: { type: String, required: true },
  thumbnailUrl: { type: String },
  previewImageUrl: { type: String, required: true },
  isMerged: { type: Boolean, required: true },

  uploadedVideo: {
    s3ObjectKey: String,
    videoUrl: String,
    subtitles: [SubtitleSchema],
  },

  mergedVideo: {
    platform: String,
    externalUrl: String,
  },
}, );

// Indexes for efficient querying
VideoSchema.index({ tags: 1 });
VideoSchema.index({ filename: 'text' });
VideoSchema.index({ language: 1 });

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
```
