import { Metadata } from 'next';

const siteUrl = 'https://www.svrassociates.com'; // Updated to likely production domain or placeholder
const siteName = 'SVR Associates';
const siteDescription = 'Premium residential plot developers in Tamil Nadu offering government-approved plots in Chengalpattu, Vandavasi, Salem and surrounding areas.';
const defaultTitle = 'SVR Associates - Premium Plots in Tamil Nadu | Chengalpattu, Vandavasi, Salem';

const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    // Primary Locations
    'plots in Chengalpattu',
    'plots in Vandavasi',
    'plots in Salem',
    'plots in Tamil Nadu',
    'real estate Tamil Nadu',

    // Specific Areas
    'plots near Mahindra City',
    'plots near Mahindra World City',
    'plots in Mamandur',
    'plots in Sunguvarchatram',
    'plots in Walajabad',
    'plots in Arakkonam',
    'plots in Uthiramerur',
    'plots in Maduranthagam',
    'plots in Tindivanam',
    'plots in Thiruvannamalai',
    'plots in Gingee',
    'plots in Arani',
    'plots in Polur',
    'plots in Cheyyar',
    'plots in Kanchipuram',
    'plots in Sriperumbudur',
    'plots in Oragadam',
    'plots in Padappai',
    'plots in Guduvanchery',
    'plots in Singaperumal Koil',
    'plots in Maraimalai Nagar',

    // Project Types
    'residential plots for sale',
    'villa plots',
    'gated community plots',
    'DTCP approved plots',
    'RERA approved plots',
    'CMDA approved plots',
    'investment plots',
    'land for sale',
    'buy land in Tamil Nadu',

    // Brand
    'SVR Associates',
    'SVR Real Estate',
    'Vetri Reals', // Keeping as alias if needed
  ],
  authors: [{ name: 'SVR Associates' }],
  creator: 'SVR Associates',
  publisher: 'SVR Associates',
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
        url: `${siteUrl}/logo/logo.jpg`, // Assuming logo path
        width: 1200,
        height: 630,
        alt: 'SVR Associates - Premium Plots in Tamil Nadu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteDescription,
    images: [`${siteUrl}/logo/logo.jpg`],
    creator: '@svrassociates',
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
  alternates: {
    canonical: siteUrl,
  },
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'SVR Associates',
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/logo/logo.jpg`,
  image: `${siteUrl}/logo/logo.jpg`,
  telephone: '+91-9367936768', // From contact info
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chengalpattu',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.6961', // Chengalpattu approx
    longitude: '79.9756'
  },
  priceRange: '₹₹',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '09:00',
      closes: '20:00'
    }
  ],
  founder: {
    '@type': 'Person',
    name: 'Dr. L. Velayutham',
    jobTitle: 'Founder & Managing Director'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Chengalpattu'
    },
    {
      '@type': 'City',
      name: 'Vandavasi'
    },
    {
      '@type': 'City',
      name: 'Salem'
    },
    {
      '@type': 'City',
      name: 'Kanchipuram'
    },
    {
      '@type': 'City',
      name: 'Tindivanam'
    }
  ]
};

export default defaultMetadata;
