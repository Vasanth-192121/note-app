// import React, { useState } from 'react'
// import Navbar from '../components/Navbar';
// import PasswordInput from '../components/PasswordInput';
// import { Link, useNavigate } from 'react-router-dom';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';

// const Signup = () => {
  
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault(); 

//     if(!name) {
//       setError("Please enter your name.");
//       return;
//     }

//     if(!validateEmail(email)) {
//       setError("Please enter a valid email.");
//       return;
//     }

//     if(!password) {
//       setError("Please enter the password");
//       return;
//     }

//     setError("");

//     // SignUp API Call

//     try {

//       const response = await axiosInstance.post("/create-account", {
//         fullName : name,
//         email : email,
//         password : password
//       });

//       // Handle successfull registration response

//       if (response.data && response.data.error) {
//         setError(response.data.message);
//         return
//       }
  
//       if (response.data && response.data.accessToken) {
//         localStorage.setItem("token", response.data.accessToken);
//         navigate("/dashboard");
//       }

//       // Handle error

//     } catch (error) {

//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);

//       } else {

//         setError("An unexpected error occured. Please try again")
      
//       }
//     }

//   }

//   return (
//     <>
//       <Navbar />
//         <div className='flex items-center justify-center mt-32'>
//             <div className='w-96 border bg-white px-7 py-10'>
//               <form onSubmit={handleSignUp}>
//                 <h4 className='text-2xl mb-7'>SignUp</h4>

//                 <input 
//                   type="text" 
//                   placeholder='Name' 
//                   className='input-box'
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input 
//                   type="text" 
//                   placeholder='Email' 
//                   className='input-box'
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <PasswordInput 
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//                 <button type='submit' className='btn-primary '>
//                   Create an Account
//                 </button>

//                 <p className='text-sm text-center mt-4'>

//                   Already have an account ?{" "} 
                  
//                   <Link to="/login" className='font-medium text-primary underline'>
//                     Login 
//                   </Link> 
//                 </p>

//               </form>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Signup



// import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import PasswordInput from '../components/PasswordInput';
// import { Link, useNavigate } from 'react-router-dom';
// import { validateEmail } from '../utils/Helper';
// import { axiosInstance } from '../utils/axiosInstance';

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [loading, setLoading] = useState(false); // Define loading state
//   const [loadingMessage, setLoadingMessage] = useState(""); // Define loading message

//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!name) {
//       setError("Please enter your name.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter the password");
//       return;
//     }

//     setError("");
//     setLoading(true); // Set loading to true when the API call starts
//     setLoadingMessage("Creating Account..."); // Set loading message

//     // SignUp API Call to send OTP
//     try {
//       const response = await axiosInstance.post("/create-account", {
//         fullName: name,
//         email: email,
//         password: password
//       });

//       if (response.data && response.data.error) {
//         setError(response.data.message);
//         setLoading(false); // Set loading to false if there's an error
//         setLoadingMessage(""); // Clear loading message if there's an error
//         return;
//       }

//       setOtpSent(true);
//       setError("OTP has been sent to your email address.");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false); // Set loading to false after the API call is completed
//       setLoadingMessage(""); // Clear loading message after the API call is completed
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     if (!otp) {
//       setError("Please enter the OTP sent to your email.");
//       return;
//     }

//     setError("");
//     setLoading(true); // Set loading to true when the API call starts
//     setLoadingMessage("Verifying OTP..."); // Set loading message

//     // API Call to verify OTP
//     try {
//       const response = await axiosInstance.post("/verify-otp", {
//         email: email,
//         otp: otp
//       });

//       if (response.data && response.data.error) {
//         setError(response.data.message);
//         setLoading(false); // Set loading to false if there's an error
//         setLoadingMessage(""); // Clear loading message if there's an error
//         return;
//       }

//       setOtpVerified(true);
//       localStorage.setItem("token", response.data.accessToken);
//       navigate("/dashboard");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false); // Set loading to false after the API call is completed
//       setLoadingMessage(""); // Clear loading message after the API call is completed
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='flex items-center justify-center mt-32'>
//         <div className='w-96 border bg-white px-7 py-10'>
//           {loading && (
//             <div className='loading-overlay'>
//               <div className='text-white'>{loadingMessage}</div>
//             </div>
//           )}
//           {!otpSent ? (
//             <form onSubmit={handleSignUp}>
//               <h4 className='text-2xl mb-7'>SignUp</h4>

//               <input
//                 type="text"
//                 placeholder='Name'
//                 className='input-box'
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder='Email'
//                 className='input-box'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <PasswordInput
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//               <button type='submit' className='btn-primary'>
//                 {loadingMessage === "Creating Account..." ? 'Creating Account...' : 'Create an Account'}
//               </button>

//               <p className='text-sm text-center mt-4'>
//                 Already have an account?{" "}
//                 <Link to="/login" className='font-medium text-primary underline'>
//                   Login
//                 </Link>
//               </p>
//             </form>
//           ) : otpVerified ? (
//             <div className='text-center'>
//               <h4 className='text-2xl mb-7'>Account Verified!</h4>
//               <p className='text-green-500'>Your account has been successfully verified. You can now access the dashboard.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleVerifyOtp}>
//               <h4 className='text-2xl mb-7'>Verify OTP</h4>

//               <input
//                 type="text"
//                 placeholder='Enter OTP'
//                 className='input-box'
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />

//               {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

//               <button type='submit' className='btn-primary'>
//                 {loadingMessage === "Verifying OTP..." ? 'Verifying OTP...' : 'Verify OTP'}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignUp;



import { useState } from 'react';
import Navbar from '../components/Navbar';
import PasswordInput from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/Helper';
import { axiosInstance } from '../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); // Define loading state
  const [loadingMessage, setLoadingMessage] = useState(""); // Define loading message

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true); // Set loading to true when the API call starts
    setLoadingMessage("Creating Account..."); // Set loading message

    // SignUp API Call to send OTP
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        setLoading(false); // Set loading to false if there's an error
        setLoadingMessage(""); // Clear loading message if there's an error
        return;
      }

      setOtpSent(true);
      setError("OTP has been sent to your email address.");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after the API call is completed
      setLoadingMessage(""); // Clear loading message after the API call is completed
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    setError("");
    setLoading(true); // Set loading to true when the API call starts
    setLoadingMessage("Verifying OTP..."); // Set loading message

    // API Call to verify OTP
    try {
      const response = await axiosInstance.post("/verify-otp", {
        email: email,
        otp: otp
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        setLoading(false); // Set loading to false if there's an error
        setLoadingMessage(""); // Clear loading message if there's an error
        return;
      }

      setOtpVerified(true);
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after the API call is completed
      setLoadingMessage(""); // Clear loading message after the API call is completed
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-32'>
        <div className='w-96 sm:border bg-white px-7 py-10 rounded-xl'>
          {!otpSent ? (
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl font-medium mb-7'>SignUp</h4>

              <input
                type="text"
                placeholder='Name'
                className='input-box rounded-xl'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder='Email'
                className='input-box rounded-xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

              <button type='submit' className='btn-primary rounded-xl'>
                <span className={loadingMessage === "Creating Account..." ? 'blinking-text' : ''}>
                  {loadingMessage === "Creating Account..." ? 'Creating Account...' : 'Create an Account'}
                </span>
              </button>

              <p className='text-sm text-center mt-4'>
                Already have an account?{" "}
                <Link to="/login" className='font-medium text-primary underline'>
                  Login
                </Link>
              </p>
            </form>
          ) : otpVerified ? (
            <div className='text-center'>
              <h4 className='text-2xl mb-7'>Account Verified!</h4>
              <p className='text-green-500'>Your account has been successfully verified. You can now access the dashboard.</p>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <h4 className='text-2xl mb-7'>Verify OTP</h4>

              <input
                type="text"
                placeholder='Enter OTP'
                className='input-box'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

              <button type='submit' className='btn-primary'>
                <span className={loadingMessage === "Verifying OTP..." ? 'blinking-text' : ''}>
                  {loadingMessage === "Verifying OTP..." ? 'Verifying OTP...' : 'Verify OTP'}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default SignUp;
