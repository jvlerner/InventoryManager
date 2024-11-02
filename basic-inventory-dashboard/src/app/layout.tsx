import "@/styles/globals.css";
import ContextProviders from "@/app/context";
import CustomDrawer from "@/app/components/commom/drawer/Drawer";
import QueryProvider from "./components/commom/QueryProvider";
import { CssBaseline } from "@mui/material";

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
            <CssBaseline />
            <CustomDrawer>{children}</CustomDrawer>
          </QueryProvider>
        </ContextProviders>
      </body>
    </html>
  );
}
