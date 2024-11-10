// pages/_app.js
import '@/app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <main className="flex-grow">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;