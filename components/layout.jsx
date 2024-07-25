import Head from 'next/head';
export const siteTitle = "Nextjs";

export default function Layout({ pageTitle, children }) {
  const title = "Nextjs";
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={siteTitle} />
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="Website" />
        <title>{pageTitle}</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}