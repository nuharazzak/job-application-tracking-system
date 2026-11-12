import {Link} from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function Login(){
    const navigate = useNavigate();
    const {login} = useAuth();
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e)=>{
        e.preventDefault();
        
        setLoading(true);
        setErrorMessage('');

        try{
            const response = await API.post('/auth/login',{
                email,
                password
            });

             console.log(response.data);
             const { token, user } = response.data;

                login(user, token);

                navigate("/dashboard");
             

    // Save JWT token
        //localStorage.setItem('token', response.data.token);

    // Save user information
        // localStorage.setItem('user', JSON.stringify({
        //     _id: response.data._id,
        //     name: response.data.name,
        //     email: response.data.email
    // }
    // ));

    const userData = {
        _id: response.data._id,
         name: response.data.name,
        email: response.data.email

    }

    login(userData, response.data.token);
        }
        catch(error){
            setErrorMessage(
                error.response?.data?.message || error.message);
        }
        finally{
            setLoading(false);
        }

    }

    

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className='text-3xl font-bold text-center text-blue-600 mb-2'>Job Tracker</h1>
                <p className="text-center text-gray-500 mb-8">
                    Login To Your Account
                </p>
                <form onSubmit={handleLogin}>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
)}
                    <div className='mb-4'>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input type='email' 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder='Enter Email Address' 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>

                    <div className='mb-6'>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input type='password'
                         value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder='Enter Password' 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>

                    <button type='submit'  
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                        {loading? "Login...." : "Login"}</button>
                </form>
                <p className="text-center text-gray-600 mt-6">Don't have an acoount?{''}
                    <Link to={'/register'} className="text-blue-600 font-semibold">Register
                    </Link>
                </p>



            </div>
        </div>
        
    );
}

export default Login;