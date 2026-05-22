Netlify Deployment Guide

Publish directory
- Set the publish directory to `frontal` (the folder containing your HTML pages).

Required file
- `_redirects` (already added at the repo root of the publish directory):
  - [frontal/_redirects](frontal/_redirects)
  - Netlify reads this file from the publish directory and applies the rules on deploy.

Deploy via Netlify UI
1. Create a new site (drag & drop the `frontal` folder or connect repo).
2. In Site settings -> Build & deploy, set "Publish directory" to `frontal`.
3. Ensure `_redirects` is present in the deployed `frontal` folder (Netlify handles it automatically).

Deploy via Netlify CLI
```bash
npm install -g netlify-cli
# interactive deploy (preview)
netlify deploy --dir=frontal
# production deploy
netlify deploy --prod --dir=frontal
# run local dev server that respects Netlify redirects
netlify dev --dir=frontal
```

Verify redirects
- After deploying or running `netlify dev`, verify:
  - `https://<your-site>.netlify.app/marketplace` resolves (should serve `/marketplace.html`).
  - `https://<your-site>.netlify.app/inbox` resolves (should serve `/inbox.html` which redirects to `./index.html#/inbox`).
- Quick check with curl (replace host):
```bash
curl -I https://<your-site>.netlify.app/marketplace
curl -I http://localhost:8888/marketplace   # when using `netlify dev`
```

Why `_redirects` is used
- It ensures clean paths (e.g. `/marketplace`, `/inbox`) map to the corresponding `.html` files so direct visits don't 404.
- If you prefer all unknown paths to go to the SPA entry, replace `_redirects` with a single rule:
```
/*    /index.html   200
```
(Only do this if you want a SPA catch-all.)

Post-deploy checklist
- Confirm `frontal/_redirects` exists in the deployed files.
- Test main pages: `/`, `/marketplace`, `/profile`, `/settings`, `/inbox`.
- Test external asset requests (images, CSS) load correctly.
- Test admin flow: attempt direct visit to `/admin` and confirm unauthorized redirects to `/index.html` as expected.

If you want, I can: add a short `package.json` script for deploy, or run a live test with `netlify dev` here and report the results.