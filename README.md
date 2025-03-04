# LeetLog

Dev

```sh
docker compose up backend-dev frontend-dev --build --menu=false
```

Prod

```sh
docker compose up backend-prod frontend-preview --build --menu=false
```

Test

```sh
docker compose up backend-test --build --menu=false
```

Docker doesn't install new dependencies

```sh
docker compose down -v
```

Generate a Random JWT Secret Key

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Generate SSL certificate
```sh
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
```

Notes

- No special characters in the password as bcrypt doesn't handle them well

References

- [Cors](https://expressjs.com/en/resources/middleware/cors.html)
- [Vite ENV](https://vite.dev/guide/env-and-mode.html)
- [One Dockerfile](https://dev.to/massivebrains/use-same-dockerfile-for-dev-production-1l7f)
- [Mongoose TS](https://mongoosejs.com/docs/typescript.html)