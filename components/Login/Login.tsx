import React, { useState, useContext } from 'react';
import { RenderContext } from '../../contexts/render'

function Login() {
    const renderState = useContext(RenderContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        setUsername(inputValue);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        /*
        TEMPORARY
        renderState.setLogIn(false);
        renderState.setMainDisplay(true);
        */
        event.preventDefault();

        // TODO: Send a request to the server to validate the username and password

        if (username === 'exampleuser' && password === 'examplepass') {
        // TODO: Redirect the user to the main page
        console.log('Logged in successfully');
        renderState.setLogIn(false);
        renderState.setMainDisplay(true);
        } else {
        setErrorMessage('Incorrect username or password');
        }
    }

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
        renderState.setLogIn(false);
        renderState.setRegister(true);
    }

    return (
        <form className="flex flex-col justify-center items-center mx-auto" onSubmit={handleSubmit}>
            <label className="text-white" htmlFor="username">Username:</label>
            <input
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
            />
            <label className="text-white" htmlFor="password">Password:</label>
            <input
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <button className="text-black bg-white mt-5 py-2 px-7 rounded-lg icon-shadow hover:scale-105" type="submit">Log In</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            <button className="text-black bg-white mt-5 py-2 px-7 rounded-lg icon-shadow hover:scale-105" onClick={handleRegister}>Register</button>
        </form>
    );
}

export default Login;
