/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Admin Panel</div>
        <ul className="p-4">
          <li>
            <Link href="/students">
              <a className="block py-2 hover:bg-gray-600">Students</a>
            </Link>
          </li>
          <li>
            <Link href="/subjects">
              <a className="block py-2 hover:bg-gray-600">Subjects</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;
