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

- [ ] Add progress in videos, so for example in the url ?time=10s goes to the 10 second
- [ ] Implement autoplay
- [ ] Implement different language subtitles
- [ ] Implement adding subtitles to videoframes
- [ ] Tags under the video page should lead to search
- [ ] Multiple Resolutions
- [ ] Configure External MongoDB
- [ ] Configure Different Video Platforms Embedded Code
- [ ] Implement CSRF Token
