import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

export default function JokePage() {
    const [joke, setJoke] = useState('');
    const [jokeType, setJokeType] = useState('');
    const [jokeTypes, setJokeTypes] = useState([]);

    useEffect(() => {
        fetchJokeTypes();
    }, []);

    const fetchJokeTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/jokes/types');
            setJokeTypes(response.data.jokeTypes); // Assuming the API response contains a 'jokeTypes' field
        } catch (error) {
            console.error('Error fetching joke types:', error);
            // Handle error if needed
        }
    };

    const fetchRandomJoke = async () => {
        try {
            const url = 'http://127.0.0.1:5000/api/jokes/random';
            const requestBody = jokeType ? { jokeType: jokeType } : {};

            const response = await axios.post(url, requestBody);
            setJoke(response.data.joke); // Assuming the API response contains a 'joke' field
        } catch (error) {
            console.error('Error fetching random joke:', error);
            // Handle error if needed
        }
    };

    return (
        <div>
            <Link href="/">Home</Link><br />

            <h2>Random Joke Page</h2>
            <div>
                <label htmlFor="jokeTypeSelect">Select Joke Type:</label>
                <select
                    id="jokeTypeSelect"
                    value={jokeType}
                    onChange={(e) => setJokeType(e.target.value)}
                >
                    <option value="">Select...</option>
                    {jokeTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <br/>
            <br/>
            <button onClick={fetchRandomJoke}>Get Random Joke</button>
            {joke && (
                <div>
                    <br/>
                    <br/>
                    <h3>Random Joke:</h3>
                    <p>{joke}</p>
                </div>
            )}
        </div>
    );
}
