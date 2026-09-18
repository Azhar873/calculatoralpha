# React + Vite

## AI Screenshot Calculator

The `/screenshot-calculator` page sends an uploaded image to the PHP backend. The backend calls Groq Vision and returns an editable calculator draft. Keep the Groq key server-side; do not add it to the Vite `.env` file.

For local XAMPP, add this to Apache's `httpd.conf` and restart Apache:

```apache
SetEnv GROQ_API_KEY "your-groq-api-key"
```

The backend uses the `meta-llama/llama-4-maverick-17b-128e-instruct` vision model. If Groq shows that this model is unavailable for your account, replace `GROQ_MODEL` in `backend/config/groq.php` with a vision model shown in your Groq Console. The frontend expects the backend at the existing `/api` proxy, or at the URL configured by `VITE_API_URL`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
