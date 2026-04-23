# Terido Coaching

## Project description
Terido Coaching is a static website for presenting coaching services, company details, and contact information. It uses Eleventy with TypeScript to keep content updates simple and builds fast.

## Project setup
Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production build instructions
Create an optimized production build:

```bash
npm run build
```

The generated site is written to `_site/`.

## Netlify deployment

Manual deploy:
1. Run `npm run build`.
2. In Netlify, create a new site and choose manual deploy.
3. Upload the `_site/` directory.

Netlify CLI (create project + capture URL):
```bash
npx -y netlify-cli login
npx -y netlify-cli sites:create --name your-site-name --json > /tmp/netlify-site.json
SITE_URL=$(node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('/tmp/netlify-site.json','utf8'));console.log(j.ssl_url || j.url)")
echo "$SITE_URL"
npx -y netlify-cli env:set SITE_URL "$SITE_URL" --context production
```

If the project is already linked locally:
```bash
npx -y netlify-cli status --json
```

Deploy a new production version using `netlify.toml` settings:
```bash
npm run netlify:deploy
```

Repository build config for Netlify is in `netlify.toml`.

## Technology overview
- Eleventy 3 for static site generation
- TypeScript for project configuration
- Nunjucks layouts with Markdown content
- Tailwind CSS v4 for styling
- `concurrently` and `tsx` for local development workflow