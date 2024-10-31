import "@/styles/globals.css";
import ContextProviders from "@/app/context";
import CustomDrawer from "@/app/components/commom/drawer/Drawer";

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
