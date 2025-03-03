# LeetLog

Dev

```sh
docker compose up backend-dev frontend-dev --build --menu=false
```

Prod

```sh
$env:VITE_BACKEND_URL="http://localhost:8080" 
docker compose up backend-prod frontend-prod --build --menu=false
```

Test

```sh
docker compose up backend-test --build --menu=false
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