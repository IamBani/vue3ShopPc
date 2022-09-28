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
```js
yarn test:unit
```

### Lints and fixes files
```js
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

docker run -d --name gitlab-runner --restart always \
  -v /home/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest



docker run --rm -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://110.40.173.123:8180/" \
  --registration-token "kzqx73WNUfDfz57sxxdr" \
  --description "first-register-runner" \
  --tag-list "vue3App" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"

  register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "" \
  --registration-token "" \
  --description "first-register-runner" \
  --tag-list "vue3-app" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"


  sudo docker run -d --name gitlab-runner --restart always \
 -v /home/gitlab-runner/config:/etc/gitlab-runner \
 -v /var/run/docker.sock:/var/run/docker.sock \
 gitlab/gitlab-runner:latest





