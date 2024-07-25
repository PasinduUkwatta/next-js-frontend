import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

export default function AddJokeForm() {
    const [jokeContent, setJokeContent] = useState('');
    const [jokeType, setJokeType] = useState('');
    const [jokeTypes, setJokeTypes] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchJokeTypes();
    }, []);

    const fetchJokeTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3300/api/jokes/types');
            setJokeTypes(response.data.jokeTypes); // Assuming the API response contains a 'jokeTypes' field
        } catch (error) {
            console.error('Error fetching joke types:', error);
            // Handle error if needed
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://127.0.0.1:3300/api/jokes/add';
            const requestBody = {
                joke: jokeContent,
                jokeType: jokeType
            };

            const response = await axios.post(url, requestBody);
            console.log('Joke added successfully:', response.data);
            // Optionally, you can clear the form fields after successful submission
            setSuccessMessage('Joke added successfully');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding joke:', error);
            setSuccessMessage(''); // Clear success message if there was an error
            setErrorMessage('Failed to add joke'); // Set error message
        }finally {
            setJokeContent('');
            setJokeType('');
        }
    };

    return (
        <div>
            <Link href="/">Home</Link><br />

            <h2>Add New Joke</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="jokeContent">Joke Content:</label><br />
                    <textarea
                        id="jokeContent"
                        value={jokeContent}
                        onChange={(e) => setJokeContent(e.target.value)}
                        rows={4}
                        cols={50}
                        required
                    ></textarea>
                </div>
                <div>
                    <br/>

                    <label htmlFor="jokeTypeSelect">Select Joke Type:</label>
                    <select
                        id="jokeTypeSelect"
                        value={jokeType}
                        onChange={(e) => setJokeType(e.target.value)}
                        required
                    >
                        <option value="">Select...</option>
                        {jokeTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <br/>
                <button type="submit">Submit Joke</button>
            </form>
        </div>
    );
}
