import "../styles/globals.css";
import Header from "./Header";

function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>SnowHeap</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default MyLayout;
