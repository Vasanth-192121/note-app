// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';

// const Login = () => {

//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if(!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if(!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("")

//         // Login API Call

//         try {

//             const response = await axiosInstance.post("/login", {
//                 email : email,
//                 password : password
//             });

//         // Handle successfull login response
        
//         if (response.data && response.data.accessToken) {
//             localStorage.setItem("token", response.data.accessToken);
//             navigate("/dashboard");
//         }

//         // Handle error

//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occured. Please try again")
//             }
//         }
//     }

//   return (
//     <div>
//         <Navbar />
//         <div className='flex items-center justify-center mt-32'>
//             <div className='w-96 border bg-white px-7 py-10'>
//                 <form onSubmit={handleLogin}>
//                     <h4 className='text-2xl mb-7'>Login</h4>

//                     <input 
//                         type="text" 
//                         placeholder='Email' 
//                         className='input-box'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />

//                     <PasswordInput 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                     {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                     <button type='submit' className='btn-primary '>
//                         Login
//                     </button>

//                     <p className='text-sm text-center mt-4'>

//                         Not register yet ?{" "} 
                        
//                         <Link to="/signup" className='font-medium text-primary underline'>
//                             Create an Account 
//                         </Link> 
//                     </p>
//                 </form>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/Helper';
import { axiosInstance } from '../utils/axiosInstance';
import Loading from '../components/Loading'; // Import the Loading component

const Login = () => {
    const [email, setEmail] = useState("visitor-login@gmail.com");
    const [password, setPassword] = useState("password@visitor-login");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // State for managing loading
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        setLoading(true); // Start loading

        // Login API Call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password
            });

            // Handle successful login response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }

            // Handle error
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again");
            }
        } finally {
            setLoading(false); // End loading
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mt-32'>
                <div className='w-96 border bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>

                        <input 
                            type="text" 
                            placeholder='Email' 
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary '>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <p className='text-sm text-center mt-4'>
                            Not registered yet?{" "} 
                            <Link to="/signUp" className='font-medium text-primary underline'>
                                Create an Account 
                            </Link> 
                        </p>
                    </form>
                    {loading && <Loading />} {/* Show loading component if loading */}
                </div>
            </div>
        </div>
    );
}

export default Login;
