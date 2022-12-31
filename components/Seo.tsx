import Head from 'next/head';
import React from 'react'

const Seo = () => {
  return (
    <Head>
      <title>Upload your beautiful or favourite images | MyUnsplash</title>
      <meta
        name="description"
        content="Upload the url of your favourite image, and get displayed beautifully!"
      />

      <meta property="og:url" content="https://myunsplash-trends.vercel.app" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Upload your beautiful or favourite images | MyUnsplash"
      />
      <meta
        property="og:description"
        content="Upload the url of your favourite image, and get displayed beautifully!"
      />
      <meta
        property="og:image"
        content="https://myunsplash-trends.vercel.app/og.png"
      />
      <meta property="og:image:height" content="566" />
      <meta property="og:image:width" content="1280" />

      <link rel="icon" type="image/png" href="/devchallenges.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
    </Head>
  );
}

export default Seo