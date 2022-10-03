import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <title>Spotiparty</title>
      <link rel="icon" href="/icon.png" />
      <meta
        name="description"
        content="App that randomly creates playlists for Karaoke based on users recently played songs."
      />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@paolo_rossi_g" />
      <meta name="twitter:creator" content="@paolo_rossi_g" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://spotiparty.vercel.app/" />
      <meta property="og:title" content="Spotiparty | Best app for Karaoke" />
      <meta
        property="og:image"
        content="https://spotiparty.vercel.app/thumbnail.png"
      />
      <meta
        property="og:description"
        content="App that randomly creates playlists for Karaoke based on users recently played songs."
      />
    </Head>
  )
}

export default Meta
