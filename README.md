This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

This project is for Zurich Web Developer assignment, developed by Sharon. There are pages including Login, Users List, and Permission Denied with mobile responsive supported. Kindly refer to below for more details. Unit testing for these pages is included as well.

## Getting Started
1. Clone the project and install required dependencies.
2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Landing

Unauthenticated user will be redirected to [Login Page](http://localhost:3000/login);

Authenticated user will be redirected to [Users Page](http://localhost:3000/users). User name will be displayed in the header section and provided options to **Logout**.

## Login
[http://localhost:3000/login](http://localhost:3000/login)

Login with your google account.

## Users List
[http://localhost:3000/users](http://localhost:3000/users)

Only authenticated users are accessible to this page. Unauthenticated users will be redirected to the [Permission Denined Page](http://localhost:3000/permission-denied).

Users' emails are masked by default. Click on the 'eye' icon on top right to toggle email visibility.

## Permission Denied
[http://localhost:3000/permission-denied](http://localhost:3000/permission-denied)

An error page for unauthenticated access. Users are provided options to login here.
