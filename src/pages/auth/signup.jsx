import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from "../../components/alert.jsx";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPasswordMatchBox, setShowPasswordMatchBox] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        if (password !== confirmPassword) {
            setShowPasswordMatchBox(true);
            return;
        }
        try {
            setLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            navigate('/signin');
        } catch (error) {
            console.error('Signup failed:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            {
                showPasswordMatchBox ? (
                    <AlertBox boxTitle={'Passwords do not match'} setShowAlert={setShowPasswordMatchBox} />
                ) : null
            }
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create Your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="mb-4 appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="mb-4 appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Confirm Password</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group transition relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                            {
                                loading ? (
                                    <div className="flex justify-center items-center h-max">
                                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                            role="status">
                                            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        Sign Up
                                    </div>
                                )
                            }
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    Have an account?
                    <a href="/signin" className="text-white transition hover:text-orange-400 ml-2">
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
}