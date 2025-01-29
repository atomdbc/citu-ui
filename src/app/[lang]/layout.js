import { headers } from 'next/headers';
import Header from '@/components/Header';

const languages = {
  'en-US': {
    name: 'English',
    dir: 'ltr',
    description: 'Find your dream property in Côte d\'Ivoire. Browse apartments, houses, and commercial properties in Abidjan, Cocody, Plateau, and more.',
    title: 'Citu - The Real Estate Platform In Côte d’Ivoire'
  },
  'fr': {
    name: 'Français',
    dir: 'ltr',
    description: 'Trouvez votre propriété de rêve en Côte d\'Ivoire. Parcourez les appartements, maisons et propriétés commerciales à Abidjan, Cocody, Plateau et plus encore.',
    title: 'citu - Première Plateforme Immobilière en Côte d\'Ivoire'
  }
};

// Separate viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata({ params }) {
  const lang = params.lang;
  const langConfig = languages[lang] || languages['en-US'];

  return {
    metadataBase: new URL('https://citu.ci'),
    title: langConfig.title,
    description: langConfig.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en-US': '/en-US',
        'fr': '/fr',
      }
    },
    openGraph: {
      title: langConfig.title,
      description: langConfig.description,
      url: `/${lang}`,
      siteName: 'citu.ci',
      images: [
        {
          url: '/citu_logo.png',
          width: 1200,
          height: 630,
        }
      ],
      locale: lang,
      type: 'website',
    },
    icons: {
      icon: '/favicon.ico',
    },
    other: {
      'google-site-verification': 'your-google-verification-code'
    }
  };
}

export function generateStaticParams() {
  return [
    { lang: 'en-US' },
    { lang: 'fr' }
  ];
}

export default function LangLayout({ children, params }) {
  const lang = params.lang;
  const langConfig = languages[lang] || languages['en-US'];

  return (
    <div className="min-h-screen flex flex-col" lang={lang} dir={langConfig.dir}>
      <header>
        <Header lang={params.lang} />
      </header>
      <main className="flex-grow pt-[89px]">
        {children}
      </main>
      <div id="modal-root" />
    </div>
  );
}