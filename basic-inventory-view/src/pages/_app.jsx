// pages/_app.tsx
import "@/styles/globals.css"; // Move the global CSS import here
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default MyApp;
