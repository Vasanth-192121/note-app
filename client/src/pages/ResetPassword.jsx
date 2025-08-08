// client/src/pages/ResetPassword.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PasswordInput from '../components/PasswordInput';
import { axiosInstance } from '../utils/axiosInstance';
import bgImage from '../../src/assets/bg-image.webp';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Get token from URL query params

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const navigate = useNavigate();
    const containerRef = useRef(null);

    // Effect to lazy-load the background image using Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (containerRef.current) {
                    containerRef.current.style.backgroundImage = `url(${bgImage})`;
                }
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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);
        setResetSuccess(false);

        if (!newPassword || !confirmPassword) {
            setError("Please enter and confirm your new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Basic password strength validation (add more robust validation as needed)
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (!token) {
            setError("Password reset token is missing. Please use the link from your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post("/reset-password", {
                token,
                newPassword
            });

            if (response.data?.success) {
                setResetSuccess(true);
                setError("Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login"); // Redirect to login after successful reset
                }, 3000);
            } else {
                setError(response.data?.message || "Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.error('Reset Password Error:', error);
            setError(error.response?.data?.message || "An unexpected error occurred. Please try again or request a new reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-no-repeat bg-center bg-cover min-h-screen' ref={containerRef}>
            <Navbar />
            <div className='
                flex items-center justify-center min-h-[calc(100vh-64px)]
                bg-slate-100 bg-opacity-60
                sm:justify-end sm:py-[100px] sm:px-4 sm:pr-20 lg:pr-36 sm:bg-transparent sm:bg-opacity-100
            '>
                <div className='
                    w-full px-8 py-10 rounded-none flex flex-col justify-center
                    sm:max-w-sm sm:border sm:px-8 sm:py-10 sm:rounded-3xl sm:bg-slate-100 sm:bg-opacity-60
                '>
                    <form onSubmit={handleResetPassword}>
                        <h4 className='text-2xl font-medium mb-7'>Reset Password</h4>
                        {!token && (
                            <p className="text-red-500 text-sm mb-4">
                                No reset token found. Please use the link from your email.
                            </p>
                        )}
                        <PasswordInput
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                        />
                        {error && <p className={`text-xs pl-2 font-medium pb-1 ${resetSuccess ? 'text-green-700' : 'text-red-500'}`}>{error}</p>}
                        <button
                            type='submit'
                            className='btn-primary rounded-3xl'
                            disabled={loading || !token} // Disable if loading or no token
                        >
                            <span className={loading ? 'blinking-text' : ''}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
