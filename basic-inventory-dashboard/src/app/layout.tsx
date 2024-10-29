import "@/styles/globals.css";
import ContextProviders from "./context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
