import Head from "next/head";

export const Layout = ({ children, className = "" }) => {
  return (
    <>
      <Head>
        <title>Sensible Meter</title>
        <meta name="description" content="CS Project 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] ${className}`}
      >
        {children}
      </main>
    </>
  );
};
