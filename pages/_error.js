import Head from 'next/head';
import Layout from "../components/Layout";
import Link from 'next/link';

const Error = () => (
    <Layout>
        <Head>
            <title>About Page</title>
            <meta name="description" content="My Seo React App with Next.js"/>
            <meta name="keywords" content="next seo react"/>
            <meta name="author" content="A. Berton"/>
        </Head>
        <h2>Error</h2>
        <Link href="/">
            <a>Home Page</a>
        </Link>
    </Layout>
)

export default Error;
