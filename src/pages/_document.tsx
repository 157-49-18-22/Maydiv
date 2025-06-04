import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </Head>
      <body className="antialiased">
        <div className="overflow-hidden">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
