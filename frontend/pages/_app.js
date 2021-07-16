import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { getCategoriesQuery } from "../utils/api";
import { initializeApollo, useApollo } from "../utils/apolloClient";
import "../styles/index.scss";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout categories={pageProps.categories}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  const client = initializeApollo();
  // Fetch global site settings from Strapi
  const { loading, data, error } = await client.query({
    query: getCategoriesQuery,
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories: data.categories } };
};

export default MyApp;
