import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

const translations = {
  'en-US': {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    button: "Back to Home",
  },
  'fr': {
    title: "Page Non Trouvée",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    button: "Retour à l'Accueil",
  }
};

export default function NotFound({ params }) {
  // Get locale from params, defaulting to French
  const locale = params?.lang || 'fr';
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F6] to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-[#E8C5B5]">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-semibold text-[#B4786F]">{t.title}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg">{t.description}</p>

        {/* Home Button */}
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#B4786F] rounded-lg hover:bg-[#9E6761] transition-colors duration-200"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          {t.button}
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-64 h-64 bg-[#FCE9E3] rounded-full opacity-30 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}