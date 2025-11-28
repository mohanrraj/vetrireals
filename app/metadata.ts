import { Metadata } from 'next';

const siteUrl = 'https://vetri-reals.vercel.app'; // Replace with your actual domain
const siteName = 'Vetri Reals';
const siteDescription = 'Leading property developer in Chengalpattu with premium plots and villas near Mahindra World City';
const defaultTitle = 'Vetri Reals - Premium Plots & Villas in Chengalpattu';

const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'plots in Chengalpattu',
    'land near Chengalpattu',
    'Chengalpattu plots',
    'plots near Mahindra World City',
    'residential plots',
    'gated community plots',
    'Vetri Reals',
    'real estate Chengalpattu',
    'affordable plots',
    'best plots in Chengalpattu',
  ],
  authors: [{ name: 'Vetri Reals' }],
  creator: 'Vetri Reals',
  publisher: 'Vetri Reals',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: defaultTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vetri Reals - Premium Plots & Villas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@vetri_reals',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    yandex: 'YANDEX_VERIFICATION_CODE',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default defaultMetadata;
