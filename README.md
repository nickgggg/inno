# Out & About

A mobile-first, fan-made group order builder for In-N-Out. It runs entirely in the browser and can be deployed directly to GitHub Pages.

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploy to GitHub Pages

The included GitHub Actions workflow publishes the complete static site whenever
changes are pushed to `main` or `work`.

1. Push or merge the app into either `main` or `work` on GitHub.
2. Open **Settings → Pages** in the GitHub repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open the **Actions** tab and confirm that **Deploy site to GitHub Pages** has
   completed successfully.

The `.nojekyll` marker ensures GitHub serves this repository as a plain static
site, with `index.html` as the entry page.

Prices in the app are clearly labeled estimates because In-N-Out pricing varies by restaurant. This project is not affiliated with In-N-Out Burger.
