import React, { useState, useContext } from 'react';
import { RenderContext } from '../../contexts/render';
import { register } from '../../services/loginServices';

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

    return (
        <form className="flex flex-col justify-center items-center mx-auto" onSubmit={handleSubmit}>
            <label className="text-white" htmlFor="username">Username:</label>
            <input 
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="text" 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={handleInputChange} 
            />
            <label className="text-white" htmlFor="password">Password:</label>
            <input 
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
            />
            <label className="text-white" htmlFor="confirmPassword">Confirm Password:</label>
            <input 
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
            />
            <label className="text-white" htmlFor="email">Email:</label>
            <input 
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="email" 
                id="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange} 
            />
            <label className="text-white" htmlFor="email">Profile Picture:</label>
            <input 
                className="px-3 py-2 rounded-lg mt-1 mb-4"
                type="file" 
                id="file" 
                name="file" 
                accept="image/png, image/jpeg"
                onChange={handleFileChange} 
            />
            <button type="submit" className="text-black bg-white mt-5 py-2 px-7 rounded-lg icon-shadow hover:scale-105">Register</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
    );
}

export default Register;
