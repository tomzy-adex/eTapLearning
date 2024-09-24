// pages/_app.tsx
import { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="flex h-screen">
      <ToastContainer/>
      <aside className="w-64 bg-gray-800 text-white">
        <nav className="p-4">
          <ul>
            <li className="mb-4">
              <Link href="/students">
                <span className="block py-2 px-4 hover:bg-gray-700">Students</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/subjects">
                <span className="block py-2 px-4 hover:bg-gray-700">Subjects</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default MyApp;
