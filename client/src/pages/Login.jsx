// import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false); // State for managing loading
//     const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle forgot password form
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');

//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("");
//         setLoading(true); // Start loading

//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", {
//                 email: email,
//                 password: password
//             });

//             // Handle successful login response
//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }

//             // Handle error
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false); // End loading
//         }
//     }

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post("/forgot-password", {
//                 email: forgotEmail,
//                 name: forgotName,
//             });

//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//             } else {
//                 setError("No account found with that email and name.");
//             }

//         } catch (error) {
//             setError("An unexpected error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null); // Reset error state when toggling forms
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mt-32'>
//                 <div className='w-96 border bg-white px-7 py-10'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h4 className='text-2xl mb-7'>Login</h4>

//                             <input 
//                                 type="text" 
//                                 placeholder='Email' 
//                                 className='input-box'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <PasswordInput 
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary '>
//                                 {loading ? 'Logging in...' : 'Login'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Forgot your password?{" "} 
//                                 <button 
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Click here
//                                 </button>
//                             </p>

//                             <p className='text-sm text-center mt-4'>
//                                 Not registered yet?{" "} 
//                                 <Link to="/signUp" className='font-medium text-primary underline'>
//                                     Create an Account 
//                                 </Link> 
//                             </p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl mb-7'>Forgot Password</h4>

//                             <input 
//                                 type="text" 
//                                 placeholder='Email' 
//                                 className='input-box'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />

//                             <input 
//                                 type="text" 
//                                 placeholder='Name' 
//                                 className='input-box'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary '>
//                                 {loading ? 'Sending...' : 'Send Password'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Remember your password?{" "} 
//                                 <button 
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');
//     const [passwordSent, setPasswordSent] = useState(false);
//     const [counter, setCounter] = useState(0);

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (counter > 0) {
//             const timer = setTimeout(() => setCounter(counter - 1), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [counter]);

//     useEffect(() => {
//         if (passwordSent) {
//             const timer = setTimeout(() => setError(null), 10000); 
//             return () => clearTimeout(timer);
//         }
//     }, [passwordSent]);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("");
//         setLoading(true);

//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", {
//                 email: email,
//                 password: password
//             });

//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }

//             // Handle error
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false); 
//         }
//     }

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post("/forgot-password", {
//                 email: forgotEmail,
//                 name: forgotName,
//             });

//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//                 setPasswordSent(true); 
//                 setCounter(30); 
//             } else {
//                 setError(response.data.message || "No account found with that email and name.");
//                 setPasswordSent(false); 
//             }

//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//             setPasswordSent(false); 
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null); 
//         setPasswordSent(false); 
//         setCounter(0); 
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mt-32'>
//                 <div className='w-96 border bg-white px-7 py-10'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h1 className='text-2xl mb-7'>Login</h1>

//                             <input 
//                                 id='01'
//                                 type="text" 
//                                 placeholder='Email' 
//                                 className='input-box'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <PasswordInput 
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary '>
//                                 {loading ? 'Logging in...' : 'Login'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Forgot your password?{" "} 
//                                 <button 
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Click here
//                                 </button>
//                             </p>

//                             <p className='text-sm text-center mt-4'>
//                                 Not registered yet?{" "} 
//                                 <Link to="/signUp" className='font-medium text-primary underline'>
//                                     Create an Account 
//                                 </Link> 
//                             </p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl mb-7'>Forgot Password</h4>

//                             <input 
//                                 type="text" 
//                                 placeholder='Email' 
//                                 className='input-box'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />

//                             <input 
//                                 type="text" 
//                                 placeholder='Name' 
//                                 className='input-box'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button 
//                                 type='submit' 
//                                 className={`btn-primary ${counter > 0 ? 'cursor-not-allowed' : ''}`} 
//                                 disabled={counter > 0}
//                             >
//                                 {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Remember your password?{" "} 
//                                 <button 
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../../src/index.css';  // Import your CSS file

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');
//     const [passwordSent, setPasswordSent] = useState(false);
//     const [counter, setCounter] = useState(0);

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (counter > 0) {
//             const timer = setTimeout(() => setCounter(counter - 1), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [counter]);

//     useEffect(() => {
//         if (passwordSent) {
//             const timer = setTimeout(() => setError(null), 10000);
//             return () => clearTimeout(timer);
//         }
//     }, [passwordSent]);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("");
//         setLoading(true);

//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", {
//                 email: email,
//                 password: password
//             });

//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }

//             // Handle error
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post("/forgot-password", {
//                 email: forgotEmail,
//                 name: forgotName,
//             });

//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//                 setPasswordSent(true);
//                 setCounter(30);
//             } else {
//                 setError(response.data.message || "No account found with that email and name.");
//                 setPasswordSent(false);
//             }

//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//             setPasswordSent(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null);
//         setPasswordSent(false);
//         setCounter(0);
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mt-32'>
//                 <div className='w-96 border bg-white px-7 py-10'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h1 className='text-2xl mb-7'>Login</h1>

//                             <input
//                                 id='01'
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <PasswordInput
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary '>
//                                 {loading ? <span className='blinking-text'>Logging in...</span> : 'Login'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Forgot your password?{" "}
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Click here
//                                 </button>
//                             </p>

//                             <p className='text-sm text-center mt-4'>
//                                 Not registered yet?{" "}
//                                 <Link to="/signUp" className='font-medium text-primary underline'>
//                                     Create an Account
//                                 </Link>
//                             </p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl mb-7'>Forgot Password</h4>

//                             <input
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />

//                             <input
//                                 type="text"
//                                 placeholder='Name'
//                                 className='input-box'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button
//                                 type='submit'
//                                 className={`btn-primary ${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                                 disabled={counter > 0}
//                             >
//                                 {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Remember your password?{" "}
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../../src/index.css';  // Import your CSS file

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');
//     const [passwordSent, setPasswordSent] = useState(false);
//     const [counter, setCounter] = useState(0);

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (counter > 0) {
//             const timer = setTimeout(() => setCounter(counter - 1), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [counter]);

//     useEffect(() => {
//         if (passwordSent) {
//             const timer = setTimeout(() => setError(null), 10000);
//             return () => clearTimeout(timer);
//         }
//     }, [passwordSent]);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("");
//         setLoading(true);

//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", {
//                 email: email,
//                 password: password
//             });

//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }

//             // Handle error
//         } catch (error) {
//             console.error('Login Error:', error); // Log error details to console
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post("/forgot-password", {
//                 email: forgotEmail,
//                 name: forgotName,
//             });

//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//                 setPasswordSent(true);
//                 setCounter(30);
//             } else {
//                 setError(response.data.message || "No account found with that email and name.");
//                 setPasswordSent(false);
//             }

//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//             setPasswordSent(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null);
//         setPasswordSent(false);
//         setCounter(0);
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mt-32'>
//                 <div className='w-96 sm:border bg-white px-7 py-10 rounded-xl'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h1 className='text-2xl font-medium mb-7'>Login</h1>

//                             <input
//                                 id='01'
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box rounded-lg'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <PasswordInput
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary rounded-lg'>
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Logging in...' : 'Login'}
//                                 </span>
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Forgot your password?{" "}
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Click here
//                                 </button>
//                             </p>

//                             <p className='text-sm text-center mt-4'>
//                                 Not registered yet?{" "}
//                                 <Link to="/signUp" className='font-medium text-primary underline'>
//                                     Create an Account
//                                 </Link>
//                             </p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>

//                             <input
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box rounded-xl'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />

//                             <input
//                                 type="text"
//                                 placeholder='Name'
//                                 className='input-box rounded-xl'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button
//                                 type='submit'
//                                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                                 disabled={counter > 0}
//                             >
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                                 </span>
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 Remember your password?{" "}
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary underline'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;




// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../../src/index.css';  // Import your CSS file

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');
//     const [passwordSent, setPasswordSent] = useState(false);
//     const [counter, setCounter] = useState(0);

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (counter > 0) {
//             const timer = setTimeout(() => setCounter(counter - 1), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [counter]);

//     useEffect(() => {
//         if (passwordSent) {
//             const timer = setTimeout(() => setError(null), 10000);
//             return () => clearTimeout(timer);
//         }
//     }, [passwordSent]);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }

//         setError("");
//         setLoading(true);

//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", {
//                 email: email,
//                 password: password
//             });

//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }

//             // Handle error
//         } catch (error) {
//             console.error('Login Error:', error); // Log error details to console
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post("/forgot-password", {
//                 email: forgotEmail,
//                 name: forgotName,
//             });

//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//                 setPasswordSent(true);
//                 setCounter(30);
//             } else {
//                 setError(response.data.message || "No account found with that email and name.");
//                 setPasswordSent(false);
//             }

//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//             setPasswordSent(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null);
//         setPasswordSent(false);
//         setCounter(0);
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mt-32'>
//                 <div className='w-96 border bg-white px-7 py-10 rounded-xl'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h1 className='text-2xl font-medium mb-7'>Login</h1>

//                             <input
//                                 id='01'
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box rounded-lg'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <PasswordInput
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button type='submit' className='btn-primary rounded-lg'>
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Logging in...' : 'Login'}
//                                 </span>
//                             </button>

//                             <div className='flex justify-between mt-4 flex-row-reverse'>
//                             <p className='text-sm text-center mt-4'>
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Forgot password?
//                                 </button>
//                             </p>

//                             <p className='text-sm text-center mt-4'>
//                                 <Link to="/signUp" className='font-medium text-primary'>
//                                 Not registered yet?
//                                 </Link>
//                             </p>
//                             </div>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>

//                             <input
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box rounded-xl'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />

//                             <input
//                                 type="text"
//                                 placeholder='Name'
//                                 className='input-box rounded-xl'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />

//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                             <button
//                                 type='submit'
//                                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                                 disabled={counter > 0}
//                             >
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                                 </span>
//                             </button>

//                             <p className='text-sm text-center mt-4'>
//                                 <button
//                                     type='button'
//                                     className='font-medium text-primary'
//                                     onClick={toggleForgotPassword}
//                                 >
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;



// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
// import '../../src/index.css'; 

// const Login = () => {
//     const [email, setEmail] = useState("visitor-login@gmail.com");
//     const [password, setPassword] = useState("password@visitor-login");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//     const [forgotName, setForgotName] = useState('Visitor Login');
//     const [passwordSent, setPasswordSent] = useState(false);
//     const [counter, setCounter] = useState(0);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (counter > 0) {
//             const timer = setTimeout(() => setCounter(counter - 1), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [counter]);

//     useEffect(() => {
//         if (passwordSent) {
//             const timer = setTimeout(() => setError(null), 10000);
//             return () => clearTimeout(timer);
//         }
//     }, [passwordSent]);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }
//         if (!password) {
//             setError("Please enter the password");
//             return;
//         }
//         setError("");
//         setLoading(true);
//         // Login API Call
//         try {
//             const response = await axiosInstance.post("/login", { email, password });
//             if (response.data && response.data.accessToken) {
//                 localStorage.setItem("token", response.data.accessToken);
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             console.error('Login Error:', error);
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);
//         try {
//             const response = await axiosInstance.post("/forgot-password", { email: forgotEmail, name: forgotName });
//             if (response.data && response.data.success) {
//                 setError("Password has been sent to your email address.");
//                 setPasswordSent(true);
//                 setCounter(30);
//             } else {
//                 setError(response.data.message || "No account found with that email and name.");
//                 setPasswordSent(false);
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//             setPasswordSent(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleForgotPassword = () => {
//         setShowForgotPassword(!showForgotPassword);
//         setError(null);
//         setPasswordSent(false);
//         setCounter(0);
//     };

//     const handleGoogleLoginSuccess = (response) => {
//         console.log('Google Login Success:', response);
//         // You can send the response token to your backend for verification and sign-in.
//         // For example:
//         // const googleToken = response.credential;
//         // const res = await axiosInstance.post("/google-login", { googleToken });
//         // if (res.data.accessToken) {
//         //   localStorage.setItem("token", res.data.accessToken);
//         //   navigate("/dashboard");
//         // }
//     };

//     const handleGoogleLoginError = (error) => {
//         console.error('Google Login Error:', error);
//         setError('Google login failed. Please try again.');
//     };

//     return (
//         <div className='bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen'>
//             <Navbar />
//             <div className='flex items-center justify-end mt-32 sm:pr-36'>
//                 <div className='w-96 border bg-slate-300 px-7 py-10 rounded-xl'>
//                     {!showForgotPassword ? (
//                         <form onSubmit={handleLogin}>
//                             <h1 className='text-2xl font-medium mb-7'>Login</h1>
//                             <input
//                                 id='01'
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//                             <button type='submit' className='btn-primary rounded-lg'>
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Logging in...' : 'Login'}
//                                 </span>
//                             </button>
//                             <p className='text-sm text-right mt-2'>
//                                     <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                                         Forgot password?
//                                     </button>
//                                 </p>
//                             <div className='flex justify-between flex-row-reverse mt-7'>
                                
                                
//                             </div>
//                             <p className='text-center text-sm font-semibold'>or sign up with</p>
//                             <div className='mt-4'>
//                                 <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//                                     <GoogleLogin
//                                         onSuccess={handleGoogleLoginSuccess}
//                                         onError={handleGoogleLoginError}
//                                     />
//                                 </GoogleOAuthProvider>
//                             </div>
//                             <p className='text-md font-medium text-center mt-3'>
//                                     <Link to="/signUp" className='font-medium text-primary'>
//                                         Not registered yet?
//                                     </Link>
//                                 </p>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleForgotPassword}>
//                             <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>
//                             <input
//                                 type="text"
//                                 placeholder='Email'
//                                 className='input-box rounded-xl'
//                                 value={forgotEmail}
//                                 onChange={(e) => setForgotEmail(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder='Name'
//                                 className='input-box rounded-xl'
//                                 value={forgotName}
//                                 onChange={(e) => setForgotName(e.target.value)}
//                             />
//                             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//                             <button
//                                 type='submit'
//                                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                                 disabled={counter > 0}
//                             >
//                                 <span className={loading ? 'blinking-text' : ''}>
//                                     {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                                 </span>
//                             </button>
//                             <p className='text-sm text-center mt-4'>
//                                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                                     Go back to login
//                                 </button>
//                             </p>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
// import '../../src/index.css'; 

// const Login = () => {
//   const [email, setEmail] = useState("visitor-login@gmail.com");
//   const [password, setPassword] = useState("password@visitor-login");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//   const [forgotName, setForgotName] = useState('Visitor Login');
//   const [passwordSent, setPasswordSent] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setTimeout(() => setCounter(counter - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [counter]);

//   useEffect(() => {
//     if (passwordSent) {
//       const timer = setTimeout(() => setError(null), 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [passwordSent]);

//   useEffect(() => {
//     const img = new Image();
//     img.src = './src/assets/writing-paper.jpg';
//     img.onload = () => {
//       document.querySelector('.bg-hero-pattern').style.backgroundImage = `url(${img.src})`;
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     // Login API Call
//     try {
//       const response = await axiosInstance.post("/login", { email, password });
//       if (response.data && response.data.accessToken) {
//         localStorage.setItem("token", response.data.accessToken);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post("/forgot-password", { email: forgotEmail, name: forgotName });
//       if (response.data && response.data.success) {
//         setError("Password has been sent to your email address.");
//         setPasswordSent(true);
//         setCounter(30);
//       } else {
//         setError(response.data.message || "No account found with that email and name.");
//         setPasswordSent(false);
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//       setPasswordSent(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setError(null);
//     setPasswordSent(false);
//     setCounter(0);
//   };

//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//         const googleToken = response.credential;
//         const res = await axiosInstance.post("/google-login", { token: googleToken });

//         if (res.data.accessToken) {
//             localStorage.setItem("token", res.data.accessToken);
//             navigate("/dashboard");
//         }
//     } catch (error) {
//         console.error('Google Login Error:', error);
//         setError('Google login failed. Please try again.');
//     }
// };


//   const handleGoogleLoginError = (error) => {
//     console.error('Google Login Error:', error);
//     setError('Google login failed. Please try again.');
//   };

//   return (
//     <div className='bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen'>
//       <Navbar />
//       <div className='flex items-center justify-end mt-32 sm:pr-36'>
//         <div className='w-96 border bg-slate-300 px-7 py-10 rounded-xl'>
//           {!showForgotPassword ? (
//             <form onSubmit={handleLogin}>
//               <h1 className='text-2xl font-medium mb-7'>Login</h1>
//               <input
//                 id='01'
//                 type="text"
//                 placeholder='Email'
//                 className='input-box'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button type='submit' className='btn-primary rounded-lg'>
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Logging in...' : 'Login'}
//                 </span>
//               </button>
//               <p className='text-sm text-right mt-2'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Forgot password?
//                 </button>
//               </p>
//               <div className='flex justify-between flex-row-reverse mt-7'>
//               </div>
//               <p className='text-center text-sm font-semibold'>or sign up with</p>
//               <div className='mt-4'>
//                 <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//                   <GoogleLogin
//                     onSuccess={handleGoogleLoginSuccess}
//                     onError={handleGoogleLoginError}
//                   />
//                 </GoogleOAuthProvider>
//               </div>
//               <p className='text-md font-medium text-center mt-3'>
//                 <Link to="/signUp" className='font-medium text-primary'>
//                   Not registered yet?
//                 </Link>
//               </p>
//             </form>
//           ) : (
//             <form onSubmit={handleForgotPassword}>
//               <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>
//               <input
//                 type="text"
//                 placeholder='Email'
//                 className='input-box rounded-xl'
//                 value={forgotEmail}
//                 onChange={(e) => setForgotEmail(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder='Name'
//                 className='input-box rounded-xl'
//                 value={forgotName}
//                 onChange={(e) => setForgotName(e.target.value)}
//               />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button
//                 type='submit'
//                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                 disabled={counter > 0}
//               >
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                 </span>
//               </button>
//               <p className='text-sm text-center mt-4'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Go back to login
//                 </button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
// import '../../src/index.css'; 

// const Login = () => {
//   const [email, setEmail] = useState("visitor-login@gmail.com");
//   const [password, setPassword] = useState("password@visitor-login");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//   const [forgotName, setForgotName] = useState('Visitor Login');
//   const [passwordSent, setPasswordSent] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const navigate = useNavigate();
//   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//   console.log(googleClientId);
  
//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setTimeout(() => setCounter(counter - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [counter]);

//   useEffect(() => {
//     if (passwordSent) {
//       const timer = setTimeout(() => setError(null), 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [passwordSent]);

//   useEffect(() => {
//     const img = new Image();
//     img.src = './src/assets/writing-paper.jpg';
//     img.onload = () => {
//       document.querySelector('.bg-hero-pattern').style.backgroundImage = `url(${img.src})`;
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     // Login API Call
//     try {
//       const response = await axiosInstance.post("/login", { email, password });
//       if (response.data && response.data.accessToken) {
//         localStorage.setItem("token", response.data.accessToken);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post("/forgot-password", { email: forgotEmail, name: forgotName });
//       if (response.data && response.data.success) {
//         setError("Password has been sent to your email address.");
//         setPasswordSent(true);
//         setCounter(30);
//       } else {
//         setError(response.data.message || "No account found with that email and name.");
//         setPasswordSent(false);
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//       setPasswordSent(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setError(null);
//     setPasswordSent(false);
//     setCounter(0);
//   };

//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//         const googleToken = response.credential;
//         const res = await axiosInstance.post("/google-login", { token: googleToken });

//         if (res.data.accessToken) {
//             localStorage.setItem("token", res.data.accessToken);
//             navigate("/dashboard");
//         }
//     } catch (error) {
//         console.error('Google Login Error:', error);
//         setError('Google login failed. Please try again.');
//     }
// };


//   const handleGoogleLoginError = (error) => {
//     console.error('Google Login Error:', error);
//     setError('Google login failed. Please try again.');
//   };

//   return (
//     <div className='bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen'>
//       <Navbar />
//       <div className='flex items-center justify-end mt-32 sm:pr-36'>
//         <div className='w-96 border bg-slate-300 px-7 py-10 rounded-xl'>
//           {!showForgotPassword ? (
//             <form onSubmit={handleLogin}>
//               <h1 className='text-2xl font-medium mb-7'>Login</h1>
//               <input
//                 id='01'
//                 type="text"
//                 placeholder='Email'
//                 className='input-box'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button type='submit' className='btn-primary rounded-lg'>
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Logging in...' : 'Login'}
//                 </span>
//               </button>
//               <p className='text-sm text-right mt-2'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Forgot password?
//                 </button>
//               </p>
//               <div className='flex justify-between flex-row-reverse mt-7'>
//               </div>
//               <p className='text-center text-sm font-semibold'>or sign up with</p>
//               <div className='mt-4'>
//                 <GoogleOAuthProvider clientId={googleClientId}>
//                   <GoogleLogin
//                     onSuccess={handleGoogleLoginSuccess}
//                     onError={handleGoogleLoginError}
//                   />
//                 </GoogleOAuthProvider>
//               </div>
//               <p className='text-md font-medium text-center mt-3'>
//                 <Link to="/signUp" className='font-medium text-primary'>
//                   Not registered yet?
//                 </Link>
//               </p>
//             </form>
//           ) : (
//             <form onSubmit={handleForgotPassword}>
//               <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>
//               <input
//                 type="text"
//                 placeholder='Email'
//                 className='input-box rounded-xl'
//                 value={forgotEmail}
//                 onChange={(e) => setForgotEmail(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder='Name'
//                 className='input-box rounded-xl'
//                 value={forgotName}
//                 onChange={(e) => setForgotName(e.target.value)}
//               />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button
//                 type='submit'
//                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                 disabled={counter > 0}
//               >
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                 </span>
//               </button>
//               <p className='text-sm text-center mt-4'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Go back to login
//                 </button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
// import '../../src/index.css'; 


// const Login = () => {
//   const [email, setEmail] = useState("visitor-login@gmail.com");
//   const [password, setPassword] = useState("password@visitor-login");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
//   const [forgotName, setForgotName] = useState('Visitor Login');
//   const [passwordSent, setPasswordSent] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const navigate = useNavigate();
//   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
//   useEffect(() => {
//     if (counter > 0) {
//       const timer = setTimeout(() => setCounter(counter - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [counter]);

//   useEffect(() => {
//     if (passwordSent) {
//       const timer = setTimeout(() => setError(null), 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [passwordSent]);

//   useEffect(() => {
//     const img = new Image();
//     img.src = './src/assets/writing-paper.jpg';
//     img.onload = () => {
//       document.querySelector('.bg-hero-pattern').style.backgroundImage = `url(${img.src})`;
//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     // Login API Call
//     try {
//       const response = await axiosInstance.post("/login", { email, password });
//       if (response.data && response.data.accessToken) {
//         localStorage.setItem("token", response.data.accessToken);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post("/forgot-password", { email: forgotEmail, name: forgotName });
//       if (response.data && response.data.success) {
//         setError("Password has been sent to your email address.");
//         setPasswordSent(true);
//         setCounter(30);
//       } else {
//         setError(response.data.message || "No account found with that email and name.");
//         setPasswordSent(false);
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//       setPasswordSent(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setError(null);
//     setPasswordSent(false);
//     setCounter(0);
//   };

//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//         const googleToken = response.credential;
//         const res = await axiosInstance.post("/google-login", { token: googleToken });

//         if (res.data.accessToken) {
//             localStorage.setItem("token", res.data.accessToken);
//             navigate("/dashboard");
//         }
//     } catch (error) {
//         console.error('Google Login Error:', error);
//         setError('Google login failed. Please try again.');
//     }
// };


//   const handleGoogleLoginError = (error) => {
//     console.error('Google Login Error:', error);
//     setError('Google login failed. Please try again.');
//   };

//   return (
//     <div className='bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen'>
//       <Navbar />
//       <div className='flex items-center justify-end mt-32 sm:pr-36'>
//         <div className='w-96 border bg-slate-300 px-7 py-10 rounded-xl'>
//           {!showForgotPassword ? (
//             <form onSubmit={handleLogin}>
//               <h1 className='text-2xl font-medium mb-7'>Login</h1>
//               <input
//                 id='01'
//                 type="text"
//                 placeholder='Email'
//                 className='input-box'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button type='submit' className='btn-primary rounded-lg'>
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Logging in...' : 'Login'}
//                 </span>
//               </button>
//               <p className='text-sm text-right mt-2'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Forgot password?
//                 </button>
//               </p>
//               <div className='flex justify-between flex-row-reverse mt-7'>
//               </div>
//               <p className='text-center text-sm font-semibold'>or sign up with</p>
//               <div className='mt-4'>
//                 <GoogleOAuthProvider clientId={googleClientId}>
//                   <GoogleLogin
//                     onSuccess={handleGoogleLoginSuccess}
//                     onError={handleGoogleLoginError}
//                   />
//                 </GoogleOAuthProvider>
//               </div>
//               <p className='text-md font-medium text-center mt-3'>
//                 <Link to="/signUp" className='font-medium text-primary'>
//                   Not registered yet?
//                 </Link>
//               </p>
//             </form>
//           ) : (
//             <form onSubmit={handleForgotPassword}>
//               <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>
//               <input
//                 type="text"
//                 placeholder='Email'
//                 className='input-box rounded-xl'
//                 value={forgotEmail}
//                 onChange={(e) => setForgotEmail(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder='Name'
//                 className='input-box rounded-xl'
//                 value={forgotName}
//                 onChange={(e) => setForgotName(e.target.value)}
//               />
//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
//               <button
//                 type='submit'
//                 className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
//                 disabled={counter > 0}
//               >
//                 <span className={loading ? 'blinking-text' : ''}>
//                   {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
//                 </span>
//               </button>
//               <p className='text-sm text-center mt-4'>
//                 <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
//                   Go back to login
//                 </button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/Helper';
import { axiosInstance } from '../utils/axiosInstance';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
import '../../src/index.css'; 

const Login = () => {
  const [email, setEmail] = useState("visitor-login@gmail.com");
  const [password, setPassword] = useState("password@visitor-login");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('visitor-login@gmail.com');
  const [forgotName, setForgotName] = useState('Visitor Login');
  const [passwordSent, setPasswordSent] = useState(false);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const containerRef = useRef(null);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  useEffect(() => {
    if (passwordSent) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [passwordSent]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = '/bg-image.webp'; // Path relative to the public folder
        img.onload = () => {
          // console.log('Image loaded:', img.src);
          containerRef.current.style.backgroundImage = `url(${img.src})`;
        };
        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

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
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/forgot-password", { email: forgotEmail, name: forgotName });
      if (response.data && response.data.success) {
        setError("Password has been sent to your email address.");
        setPasswordSent(true);
        setCounter(30);
      } else {
        setError(response.data.message || "No account found with that email and name.");
        setPasswordSent(false);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      setPasswordSent(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setError(null);
    setPasswordSent(false);
    setCounter(0);
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axiosInstance.post("/google-login", { token: googleToken });
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error('Google Login Error:', error);
    setError('Google login failed. Please try again.');
  };

  return (
    <div ref={containerRef} className='bg-hero-pattern bg-no-repeat bg-center bg-cover h-screen w-screen'>
      <Navbar />
      <div className='flex items-center justify-end mt-28 sm:pr-36'>
        <div className='w-96 border bg-slate-300 px-7 py-10 rounded-xl'>
          {!showForgotPassword ? (
            <form onSubmit={handleLogin}>
              <h1 className='text-2xl font-medium mb-7'>Login</h1>
              <input
                id='01'
                type="text"
                placeholder='Email'
                className='input-box'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='btn-primary rounded-lg'>
                <span className={loading ? 'blinking-text' : ''}>
                  {loading ? 'Logging in...' : 'Login'}
                </span>
              </button>
              <p className='text-sm text-right mt-2'>
                <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
                  Forgot password?
                </button>
              </p>
              <div className='flex justify-between flex-row-reverse mt-7'>
              </div>
              <p className='text-center text-sm font-semibold'>or sign up with</p>
              <div className='mt-4'>
                <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                  />
                </GoogleOAuthProvider>
              </div>
              <p className='text-md font-medium text-center mt-3'>
                <Link to="/signUp" className='font-medium text-primary'>
                  Not registered yet?
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <h4 className='text-2xl font-medium mb-7'>Forgot Password</h4>
              <input
                type="text"
                placeholder='Email'
                className='input-box rounded-xl'
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder='Name'
                className='input-box rounded-xl'
                value={forgotName}
                onChange={(e) => setForgotName(e.target.value)}
              />
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button
                type='submit'
                className={`btn-primary rounded-xl${counter > 0 ? 'cursor-not-allowed' : ''}`}
                disabled={counter > 0}
              >
                <span className={loading ? 'blinking-text' : ''}>
                  {loading ? 'Sending...' : passwordSent ? (counter > 0 ? `Resend Password (${counter})` : 'Resend Password') : 'Send Password'}
                </span>
              </button>
              <p className='text-sm text-center mt-4'>
                <button type='button' className='font-medium text-primary' onClick={toggleForgotPassword}>
                  Go back to login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
