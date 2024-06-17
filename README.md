## How to Install?

```
mkdir nextjs-tube && cd nextjs-tube 
curl -o docker-compose.yml https://raw.githubusercontent.com/jimchen2/nextjs-tube/main/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/jimchen2/nextjs-tube/main/.env.example
# configure .env, add amazon s3 access keys
docker-compose up -d
```

Then configure nginx

## Todo List

- [ ] Add progress in videos, so for example in the url ?time=10s goes to the 10 second
- [ ] Implement autoplay
- [ ] Implement different language subtitles
- [ ] Implement adding subtitles to videoframes
- [ ] Tags under the video page should lead to search
- [ ] Multiple Resolutions
