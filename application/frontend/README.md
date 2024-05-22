## Development Environment Setup

This is how to get the development environment for the frontend up and running.

1. First, install the dependencies.

```
npm install
```

2. Create your `.env` file in `/src` by:

   1. Duplicate the `.env.example` file in the `/src` directory
   2. Rename the new duplicate to `.env`
   3. Open the `.env` file and uncomment the last line:

```
# Next Auth Discord Provider
# DISCORD_CLIENT_ID=""
# DISCORD_CLIENT_SECRET=""
# API_URL="http://127.0.0.1:8000" \\ Uncomment this line
```

Any environment variables that need to be changed should be made here. If you need to add a new environment variable, please let Huy know.

3. Run the development script.

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. There are a few important things to keep in mind:

- Any changes you make on the frontend should automatically reflect in the browser preview.
- On the rare occasion that the browser does not reflect the changes you've made, just exit out of the development script (CTRL+C) and run `npm run dev` again.

## Checklist Before Merging to `main` Branch

Please make sure you do these things before you push your changes.

- Run `npm run build` and make sure it succeeds. **This is critical that you can build** before you push. Just because `npm run dev` works to provide a preview **does not** mean that `npm run build` will succeed. If you're having problems building, please ask Huy for help.
- Huy is the only person that can approve pull requests that contains changes to the frontend. Otherwise Vercel will not deploy the web app.
