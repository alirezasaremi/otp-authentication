This is a Next.js application that uses [Stytch](https://stytch.com/) an OTP authentication.
You can use Stytch's SMS service or send the OTP by your desire SMS service.

## Getting Started

First, install packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root of your app with the following variables.

You can find their values in you [dashboard](https://stytch.com/dashboard).

```
NEXT_PUBLIC_STYTCH_PROJECT_ID='STYTCH_PROJECT_ID'
NEXT_PUBLIC_STYTCH_SECRET='STYTCH_SECRET'
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN='STYTCH_PUBLIC_TOKEN'
```