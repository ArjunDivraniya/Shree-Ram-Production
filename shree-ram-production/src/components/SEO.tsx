import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogSiteName?: string;
  ogLocale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_SITE_NAME = 'Shree Ram Production';
const DEFAULT_DOMAIN = 'https://www.shreeramproduction.in';
const DEFAULT_OG_IMAGE = 'https://www.shreeramproduction.in/shreeramproduction-logo.png';
const DEFAULT_OG_LOCALE = 'en_IN';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  ogSiteName = DEFAULT_SITE_NAME,
  ogLocale = DEFAULT_OG_LOCALE,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  noindex = false,
  jsonLd,
}) => {
  if (import.meta.env.SSR) {
    return null;
  }

  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImage || ogImage;

  // Ensure absolute canonical URL
  let absoluteCanonical = DEFAULT_DOMAIN;
  if (canonical) {
    if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
      absoluteCanonical = canonical;
    } else {
      absoluteCanonical = `${DEFAULT_DOMAIN}${canonical.startsWith('/') ? '' : '/'}${canonical}`;
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      {noindex ? (
        <meta key="robots" name="robots" content="noindex, nofollow" />
      ) : (
        <meta key="robots" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <link key="canonical" rel="canonical" href={absoluteCanonical} />

      {/* Open Graph / Facebook */}
      <meta key="og-site-name" property="og:site_name" content={ogSiteName} />
      <meta key="og-locale" property="og:locale" content={ogLocale} />
      <meta key="og-type" property="og:type" content={ogType} />
      <meta key="og-title" property="og:title" content={finalOgTitle} />
      <meta key="og-description" property="og:description" content={finalOgDescription} />
      <meta key="og-url" property="og:url" content={absoluteCanonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter / X */}
      <meta key="twitter-card" name="twitter:card" content={twitterCard} />
      <meta key="twitter-title" name="twitter:title" content={finalTwitterTitle} />
      <meta key="twitter-description" name="twitter:description" content={finalTwitterDescription} />
      {finalTwitterImage && <meta name="twitter:image" content={finalTwitterImage} />}

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
