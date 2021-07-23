import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";
import Layout from "../components/Layout";
import { getCategoriesQuery } from "../utils/api";
import { initializeApollo, useApollo } from "../utils/apolloClient";
import "tailwindcss/tailwind.css";
import "../styles/index.scss";
import "../styles/nprogress.scss";
import dynamic from "next/dynamic";

const CartContextProvider = dynamic(() => import("../context/CartContext"), {
  ssr: false,
});

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <CartContextProvider>
        <Layout categories={pageProps.categories}>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const client = initializeApollo();
  const { loading, data, error } = await client.query({
    query: getCategoriesQuery,
  });
  return { ...appProps, pageProps: { categories: data.categories } };
};

export default MyApp;
