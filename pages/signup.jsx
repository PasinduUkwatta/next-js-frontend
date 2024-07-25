import Layout from '../components/layout';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LatestJoke({ username }) {
    const router = useRouter();
    const { msg } = router.query;

    const [joke, setJoke] = useState('');
    const [jokeType, setJokeType] = useState('');
    const [jokeId, setJokeId] = useState('');
    const [editedJoke, setEditedJoke] = useState('');
    const [editedJokeType, setEditedJokeType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(() => {
        fetchLatestJoke();
    }, []);

    const fetchLatestJoke = async () => {
        setSuccessMessage("")
        setErrorMessage("")
        try {
            const token = getCookie('token');
            const response = await axios.get('http://127.0.0.1:3200/api/jokes/latest', {
                headers: {
                    'Authorization': `Bearer "${token}"`
                }
            });

            setJoke(response.data.joke);
            setJokeType(response.data.jokeType);
            setJokeId(response.data._id);
        } catch (error) {
            console.error('Error fetching joke:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie('token');
            const response = await axios.put('http://127.0.0.1:3200/api/jokes/latest/update', {
                joke: editedJoke,
                jokeType: editedJokeType
            }, {
                headers: {
                    'Authorization': `Bearer "${token}"`,
                    'Content-Type': 'application/json'
                }
            });


            setJoke(response.data.joke);
            setJokeType(response.data.jokeType);


            setEditedJoke('');
            setEditedJokeType('');

            setSuccessMessage('Joke updated successfully');
            setErrorMessage('');
            console.log('Joke updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating joke:', error);
            setSuccessMessage('');
            setErrorMessage('Failed to update joke');
        }
    };

    const handleDeleteSubmit = async () => {
        try {
            const token = getCookie('token');
            const response = await axios.post(`http://127.0.0.1:3200/api/jokes/delete`, {
                "_id": jokeId,
            }, {
                headers: {
                    'Authorization': `Bearer "${token}"`
                }
            });

            if (response.status === 200) {
                setJoke('');
                setJokeType('');
                setSuccessMessage('Joke deleted successfully');
                setErrorMessage('');
                console.log('Joke deleted successfully:', response.data);
                setDeleteMode(true)
            } else {
                setSuccessMessage('');
                setErrorMessage('Failed to delete joke');
            }
        } catch (error) {
            console.error('Error deleting joke:', error);
            setSuccessMessage('');
            setErrorMessage('Failed to delete joke');
        }
    };
    return (
        <Layout pageTitle="LatestJoke">
            <Link href="/">Home</Link><br />
            {msg ? <h3 className="red">{msg}</h3> : null}
            <h2>Latest Joke</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={() => { setEditMode(true); }}>Edit Joke</button>
            <button onClick={() => { setDeleteMode(false); }}>Delete Joke</button>
            {editMode ? (
                <div>
                    <h3>Edit Joke</h3>
                    <form onSubmit={handleEditSubmit}>
                        <label htmlFor="editedJoke">Joke:</label><br />
                        <input
                            id="editedJoke"
                            type="text"
                            value={editedJoke}
                            onChange={(e) => setEditedJoke(e.target.value)}
                            required
                        /><br />
                        <label htmlFor="editedJokeType">Joke Type:</label><br />
                        <input
                            id="editedJokeType"
                            type="text"
                            value={editedJokeType}
                            onChange={(e) => setEditedJokeType(e.target.value)}
                            required
                        /><br />
                        <button type="submit">Update Joke</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Delete Joke</h3>
                    <p>Are you sure you want to delete this joke?</p>
                    <button onClick={handleDeleteSubmit}>Yes</button>
                </div>
            )}
            {joke && (
                <div>
                    <div>
                        <h3>Joke  </h3>
                        <p>{joke}</p>
                    </div>

                    <div>
                        <h3>Joke Type </h3>
                        <p>{jokeType}</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}

