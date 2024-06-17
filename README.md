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