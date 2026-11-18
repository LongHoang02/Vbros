# VBros — spotted there, carried here

Bro-to-bro pre-order shop and trend feed between Amsterdam and Sài Gòn.
Run by Duy, Dan & Tung, with their parents as the legal operators.

> **Preview version.** No payments are taken and no orders or messages are sent yet.

## Live site
GitHub Pages: `https://longhoang02.github.io/Vbros/`
(Turn on in **Settings → Pages → Deploy from a branch → `main` / `(root)`**.)

## How to add loot, drops and polls
All products, drops, polls and site text (EN / NL / VI) live in **one file**: `content/data.js`.
It is full of comments that explain every field. To add something, copy an example block and change it.

After editing, rebuild the page:

```bash
python3 build.py
```

Then commit and push. GitHub Pages updates within a minute or two.

Golden rules (also at the top of `data.js`):
- First names, handles and cities only. No photos, ages, surnames or school names.
- No real brand names or game/character names on products.
- Every text needs `en`, `nl` and `vi`.

## Files
| Path | What it is |
|---|---|
| `index.html` | The finished site (generated, don't edit by hand) |
| `content/data.js` | Products, drops, polls, all text — **edit this** |
| `src/template.html` | Layout, styles and code of the site |
| `src/fonts/` | Embedded fonts (Saira Condensed, Be Vietnam Pro) |
| `build.py` | Puts it all together into `index.html` |

## Later
- **Shopify:** products are read through one function (`getProducts()`, see the `SHOPIFY HOOK` comment in `src/template.html`), so Shopify can replace `data.js` products.
- **Own domain:** add it in Settings → Pages → Custom domain.
