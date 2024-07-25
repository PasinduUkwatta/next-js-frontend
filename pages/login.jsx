import Layout from '../components/layout';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {getCookie} from "cookies-next";
import { setCookie } from 'cookies-next';

export default function LoginPage({ username }) {
    const router = useRouter();
    const { msg } = router.query;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:3200/api/auth/login', {
                email,
                password
            });

            console.log('Login successful:', response.data);
            const token = response.data.token;

            setCookie('token', token, {
                maxAge: 60 * 60,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });

            router.push('/signup');
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <Layout pageTitle="Login">
            <Link href="/">Home</Link><br />
            {msg ? <h3 className="red">{msg}</h3> : null}
            {error && <h3 className="red">{error}</h3>}
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    minLength="3"
                    name="email"
                    id="email"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <input
                    minLength="5"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <input type="submit" value="Login" />
            </form>
        </Layout>
    );
}
