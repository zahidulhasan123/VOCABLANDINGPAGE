# PDF Worker Fix — nginx MIME Type (Coolify Deployment)

I have a React + Vite project that uses `react-pdf` (pdfjs-dist) to display a PDF. The PDF loads fine in localhost dev but after building and deploying to Coolify (nginx static site), the PDF fails to load entirely.

**Root cause:** nginx doesn't serve `.mjs` files with the correct `application/javascript` MIME type, so the browser rejects the pdf.js worker script.

**Apply this fix:**

1. Find the line in the source that sets `pdfjs.GlobalWorkerOptions.workerSrc` (likely using `new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url)` or a string path ending in `.mjs`).

2. Copy the worker file from `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` into the `public/` folder **as `pdf.worker.min.js`** (`.js` extension, not `.mjs`):
   ```
   Copy-Item node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js
   ```

3. Update `workerSrc` to:
   ```js
   pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
   ```

4. Run `npm run build` to regenerate the `dist/` folder (which will now include `dist/pdf.worker.min.js`).

5. Commit and push everything including the updated `dist/` folder and the new `public/pdf.worker.min.js`.

**Note:** Every time `pdfjs-dist` is upgraded, re-copy the worker file from `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` to `public/pdf.worker.min.js`.
