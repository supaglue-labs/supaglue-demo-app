## Demo app integration with Supaglue

![Screenshot 2023-07-12 at 10 04 48 PM](https://github.com/supaglue-labs/example-app/assets/471516/ab4c143b-6d90-48e9-a78d-a73173809b8b)

Example "Sales Prospecting" app called Apolla.io that integrates with Supaglue.

## Tech Stack

- Next.js 13
- Prisma
- Tailwind
- Postgres
- Supaglue

## Getting Started

1. Set `NEXT_PUBLIC_SUPAGLUE_API_KEY` and `DATABASE_URL` in your `.env`.
   - Find your Supaglue API Key by going to Configuration -> Api Key in your Supaglue Management Portal.
   - You will need your Postgres credentials to enter your []`DATABASE_URL`](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql).
2. Revise `lib/constants.ts` to reflect your source Supaglue environment.
   - `CUSTOMER_ID` is the CRM customer you have authenticated with.
   - `API_HOST` is `https://api.supaglue.io` for Supaglue Cloud.
   - `APPLICATION_ID` can be found by going to your Supaglue Management Portal and clicking "Copy ID".
3. `yarn install`
4. `yarn dev`
