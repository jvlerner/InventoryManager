import "@/styles/globals.css";
import ContextProviders from "./context";
import CustomDrawer from "./components/drawer/Drawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ContextProviders>
          <CustomDrawer>{children}</CustomDrawer>
        </ContextProviders>
      </body>
    </html>
  );
}
