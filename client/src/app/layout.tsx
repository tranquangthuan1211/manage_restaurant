import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/about">About</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
