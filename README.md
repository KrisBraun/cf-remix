# Kris' Remix + Cloudflare + Supabase starter stack

## Development

```sh
pnpm install
pnpm nx run web:dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be good to go.

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `./cf-build.sh web`, and the "Build output directory" should be set to `apps/web/public`.
