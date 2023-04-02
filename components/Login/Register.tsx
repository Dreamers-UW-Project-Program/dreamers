import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { RenderContext } from '@contexts/render';
import { register } from '@services/loginServices';
import Back from '../../public/svg/arrow-left-circle.svg'

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

function Register() {

    const renderState = useContext(RenderContext);
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [uploadedFile, setUploadedFile] = useState<File>();
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files) {
            const file = event.target.files[0] as File;
            setUploadedFile(file);
            setIsUploaded(true);
        } else {
            setIsUploaded(false);
        }
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // validate input fields

        if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
        }
        
        if (isUploaded) {
            await register(
            formData.email, 
            formData.password, 
            formData.username, 
            uploadedFile);
            console.log('Registered successfully');
            renderState.setLogIn(true);
            renderState.setRegister(false);
        } else {
            console.log("No uploaded profile image");
        }
    }

    function handleReturn() {
        renderState.setRegister(false);
        renderState.setLogIn(true);
    }

    return (
        <div className="relative flex h-[47vw] w-[35vw] rounded-lg bg-white glassmorphism m-auto">
                <Image 
                    src={Back} 
                    alt="discord" 
                    className="absolute left-[1.5vw] top-[2vw] filter-white w-[1.75vw] h-[1.65vw] mx-[0.75vw] icon hover:translate-x-[-0.35vw]
                        filter-grey hover:cursor-pointer"
                    onClick={handleReturn}
                />
            <form className="flex flex-col justify-center items-center mx-auto" onSubmit={handleSubmit}>
            <label className="text-rose-50 font-poiretOne text-[3vw] tracking-wide mb-8" htmlFor="username">Register</label>
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="email">Email:</label>
                <input 
                    className="px-3 py-2 rounded-lg mt-1 mb-5 input-glassmorphism"
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange} 
                />
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="username">Username:</label>
                <input 
                    className="px-3 py-2 rounded-lg mt-1 mb-5 input-glassmorphism"
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                />
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="password">Password:</label>
                <input 
                    className="px-3 py-2 rounded-lg mt-1 mb-5 input-glassmorphism"
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                />
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                    className="px-3 py-2 rounded-lg mt-1 mb-5 input-glassmorphism"
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange} 
                />
                <label className="text-rose-50 font-quicksandLight text-md tracking-wide" htmlFor="email">Profile Picture:</label>
                <label htmlFor="file-upload" className="file-label text-rose-100 font-quicksandLight text-md tracking-wide 
                    bg-gradient-to-r from-rose-400 to-orange-300 login-icon-shadow py-2 px-5 rounded-lg hover:scale-105 mb-8 mt-1 inline-block 
                    hover:cursor-pointer">
                    Upload
                    <input id="file-upload" type="file" name="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="file-input" />
                </label>
                <button 
                    type="submit" 
                    className="text-rose-50 mt-1 py-2 px-7 bg-gradient-to-r text-lg from-fuchsia-400 to-violet-500 rounded-lg register-icon-shadow
                     font-quicksandLight hover:scale-105">Register</button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Register;
