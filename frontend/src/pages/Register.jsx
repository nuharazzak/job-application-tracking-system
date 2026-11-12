import { useState } from 'react';
import {Link} from 'react-router-dom';
import API from '../services/api';



function Register(){
    //state variables
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    //event handlers
    const handleRegister = async (e)=>{
    e.preventDefault();//submitting an HTML form reloads the page.This prevents that default behavior.
    
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try{
        const response = await API.post('auth/register',{
            name,email,password
        });
        console.log(response.data);
        setSuccessMessage(response.data.message);

        setName('');
        setEmail('');
        setPassword('');

    }
    catch(error){
        setErrorMessage(error.response?.data?.message || error.message)

        
    }finally{
        setLoading(false);
    }
}
    //jsx
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className='text-3xl font-bold text-center text-blue-600 mb-2'>Job Tracker</h1>
                <p className="text-center text-gray-500 mb-8">
                    Create Your Account
                </p>
                <form onSubmit={handleRegister}>
                {errorMessage && (
                    <p className='text-red-500 text-sm mb-4'>
                        {errorMessage}
                    </p>

                )}

                {successMessage && (
                    <p className='text-green-600 text-sm mb-4'>
                        {successMessage}
                    </p>

                )}
                    <div className='mb-4'>
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Email Address' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email Address' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>

                    <div className='mb-6'>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>

                    <button type='submit'  
                    disabled = {loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {loading ? 'Register.....' :'Register'}</button>
                </form>
                <p className="text-center text-gray-600 mt-6">Already have an account?{''}
                    <Link to={'/login'} className="text-blue-600 font-semibold">Login
                    </Link>
                </p>



            </div>
        </div>
        
    );
}

export default Register;