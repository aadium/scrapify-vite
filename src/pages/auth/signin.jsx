import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from "../../components/alert.jsx";

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const nav = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setShowErrorAlert(true);
            } else {
                localStorage.setItem('token', JSON.stringify(data.token));
                nav('/dashboard');
            }
        } catch (error) {
            console.error('Signin failed:', error);
            setError('Signin failed. Please try again.');
            setShowErrorAlert(true);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            {
                showErrorAlert ? (
                    <AlertBox boxTitle={`Error signing you in: ${error}`} setShowAlert={setShowErrorAlert} />
                ) : null
            }
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
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
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Password" />
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
                                        Sign In
                                    </div>
                                )
                            }
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    New to this website?
                    <a href="/signup" className="text-white transition hover:text-orange-400 ml-2">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}