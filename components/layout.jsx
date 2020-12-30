import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Tools for 996</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="w-full text-center font-bold text-xl bg-indigo-500 dark:bg-indigo-700 text-gray-900 dark:text-gray-300 sticky top-0 left-0 py-1">
          <span>Welcome to join 996</span>
          <sup>icu</sup>
        </div>

        <div className="container mx-auto text-gray-900 dark:text-gray-300 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
