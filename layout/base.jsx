import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Tools for 996</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-full text-center font-bold text-2xl">
          <span>Welcome to join 996</span>
          <sup>icu</sup>
        </div>

        <div className="container mx-auto">{children}</div>
      </main>

      <footer></footer>
    </div>
  );
}
