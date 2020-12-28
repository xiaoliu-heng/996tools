import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tools for 996 - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-4">
        <div>
          <a href="/overtime">加班计算器</a>
        </div>
      </div>
    </div>
  );
}
