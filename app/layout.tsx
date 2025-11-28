import type { Metadata } from 'next';
import './globals.css';
import defaultMetadata, { structuredData } from './metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'SVR Associates - Premium Plots & Villas in Chengalpattu',
  description: 'Leading property developer in Chengalpattu offering premium residential plots and villas near Mahindra World City. 25+ successful projects with 4500+ satisfied customers.',
  keywords: [
    ...(defaultMetadata.keywords as string[]),
    'Vetri Reals Chengalpattu',
    'plots in Chengalpattu',
    'land for sale in Chengalpattu',
    'residential plots near me',
    'gated community plots Chengalpattu',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden">
        <div className="w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
