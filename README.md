# MyUnsplash

[devchallenges.io challenge](https://devchallenges.io)

## Made with

- [Nextjs](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)
- [Jotai - for sate management](https://jotai.org)
- [SWR - for data fetching](https://swr.vercel.app)
- [MongoDB](https://www.mongodb.com)

## Features

- User sign up and sign in
- Upload photo by entering a label and a valid photo url
- Search for photo by label
- delete photo **user will be prompt to enter their correct passowrd**

## How to run this app locally

- clone this repository
- run `npm install`
- create .env.local file in the root directory and add this two variable  
  - MONGODB_URI = your mongodb connection url
  - TOKEN_SECRET = your token secret
- run `npm run dev`
