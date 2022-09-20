# appshoppc

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


docker run --detach \
  --hostname  110.40.173.123 \
  --publish 4431:443 --publish 8180:8180 --publish 2221:22 \
  --name gitlab-12 \
  --restart always \
  --volume /home/gitlab/config:/etc/gitlab \
  --volume /home/gitlab/logs:/var/log/gitlab \
  --volume /home/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:12.10.5-ce.0

sudo docker run -d --name gitlab-runner --restart always \
  -v /home/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

  docker run --rm -v /home/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://110.40.173.123:8180/" \
  --registration-token "SvxdM_H2xPbxLLHsiPsp" \
  --description "gitlab-runner" \
  --tag-list "vue3App" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"