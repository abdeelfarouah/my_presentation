import Head from 'next/head';
import React from 'react';

type SEOProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
};

export default function SEO({ title, description, url, image, noIndex }: SEOProps) {
  const siteName = 'Abderrahmane El Farouah';
  const pageTitle = `${title} | ${siteName}`;
  const canonical = url || 'https://www.abderrahmane-elfarouahfreelance.com';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}