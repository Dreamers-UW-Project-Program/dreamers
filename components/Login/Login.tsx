import React, { useState, useContext } from 'react';
import { RenderContext } from '../../contexts/render.js'
import { verifyPass } from '../../services/loginServices.js';

function Login() {
    const renderState = useContext(RenderContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        setEmail(inputValue);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const userObj = await verifyPass({ email, password });

        console.log(userObj);

        if (userObj != null) {
            renderState.setUser(userObj);
            // console.log('Logged in successfully');
            localStorage.setItem('userObj', JSON.stringify(userObj));
            renderState.setLogIn(false);
            renderState.setMainDisplay(true);
        } else {
            setErrorMessage('Incorrect username or password.');
        }
    }

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
        renderState.setLogIn(false);
        renderState.setRegister(true);
    }

    return (
        <div className="flex h-[38vw] w-[33vw] rounded-lg bg-white glassmorphism m-auto">
            <form className="flex flex-col pt-[3.5vw] items-center mx-auto" onSubmit={handleSubmit}>
                <label className="text-rose-50 font-poiretOne text-[3.5vw] tracking-wide mb-[3vw]" htmlFor="username">Dreamscape</label>
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="username">Email :</label>
                <input
                    className="px-4 py-2 rounded-lg mb-6 input-glassmorphism text-zinc-700"
                    type="text"
                    id="username"
                    name="username"
                    value={email}
                    onChange={handleUsernameChange}
                />
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="password">Password :</label>
                <input
                    className="px-4 py-2 rounded-lg mt-1 mb-6 input-glassmorphism text-zinc-700"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button 
                    className="text-white bg-gradient-to-r from-rose-400 to-orange-300 mt-4 py-2 px-7 rounded-lg login-icon-shadow hover:scale-105 
                        font-quicksandLight text-md"
                    type="submit">
                        Log In
                </button>
                {errorMessage && <div className="font-quicksandRegular pt-2 text-rose-200">{errorMessage}</div>}
                <button 
                    className="text-rose-100 bg-gradient-to-r from-fuchsia-400 to-violet-500 mt-9 py-2 px-7 rounded-lg register-icon-shadow hover:scale-105 
                        font-quicksandLight" 
                    onClick={handleRegister}>
                        Register
                </button>
            </form>
        </div>
    );
}

export default Login;
