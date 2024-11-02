import "@/styles/globals.css";
import ContextProviders from "@/app/context";
import CustomDrawer from "@/app/components/commom/drawer/Drawer";
import QueryProvider from "./components/commom/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ContextProviders>
          <QueryProvider>
            <CustomDrawer>{children}</CustomDrawer>
          </QueryProvider>
        </ContextProviders>
      </body>
    </html>
  );
}
