# LeetLog

Dev

```sh
docker compose up backend-dev frontend-dev --build
```

Prod

```sh
docker compose up backend-prod frontend-prod --build
```

Docker doesn't install new dependencies

```sh
docker compose down -v
```

References

- [Cors](https://expressjs.com/en/resources/middleware/cors.html)
- [Vite ENV](https://vite.dev/guide/env-and-mode.html)
- [One Dockerfile](https://dev.to/massivebrains/use-same-dockerfile-for-dev-production-1l7f)
- [Mongoose TS](https://mongoosejs.com/docs/typescript.html)