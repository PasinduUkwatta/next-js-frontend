import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'

export default function HomePage( {username} ) {
    return (
        <Layout pageTitle="Home">
        <div>
            <h2>Select Your Option</h2>
            <Link href="/login">Moderate Joke</Link><br/><br/>
            <Link href="/deliver">View Random oke</Link><br/><br/>
            <Link href="/jokeform">Submit new Joke</Link><br/><br/>

        </div>
        </Layout>
    );
}