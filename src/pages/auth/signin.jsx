import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');
        fetch('https://web-scraping-demo-8p7f.onrender.com/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    localStorage.setItem('token', JSON.stringify(data.token));
                    nav('/dashboard');
                }
            });
        setLoading(false);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="mb-4 appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group transition relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-l-2 border-white"></div> : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    Don't have an account?
                    <a href="/signup" className="text-white transition hover:text-orange-400 ml-2">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}