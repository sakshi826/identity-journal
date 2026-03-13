# Identity Journal

A premium, localized space for self-reflection and identity exploration.

## Project info

**Production URL**: https://github.com/sakshi826/identity-journal
**Deployment Base Path**: `/identity_journal/`

## Features

- **Multi-language Support**: 20 languages supported using `i18next`.
- **Dynamic Translations**: Auto-generated translations using Google Translate API.
- **Subpath Deployment**: Configured for hosting on `/identity_journal/`.
- **Docker Support**: Multi-stage build for production serving via Nginx.
- **CI/CD**: GitHub Actions workflow for automatic container builds.

## How can I run this locally?

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Start the development server**:
   ```sh
   npm run dev
   ```

3. **Build for production**:
   ```sh
   npm run build
   ```

## Internationalization (i18n)

The project uses `i18next`. To generate or update translations:
- Ensure your Google Translate API key is in the `.env` file.
- Run the translation script:
  ```sh
  npx ts-node scripts/generateTranslations.ts
  ```

## Deployment

The project is served via Nginx. Configuration is in `vite-nginx.conf`.
To build the Docker image locally:
```sh
docker build -t identity_journal .
```

To run the container:
```sh
docker run -p 80:80 identity_journal
```

## Technologies Used

- **Vite** & **TypeScript**
- **React**
- **Tailwind CSS** & **shadcn-ui**
- **i18next**
- **Docker** & **Nginx**
