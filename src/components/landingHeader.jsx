import { useNavigate } from 'react-router-dom';

export default function LandingHeader() {
    const navigate = useNavigate();
    function handleSignIn() {
        navigate('/signin');
    }
    return (
        <nav className="bg-transparent fixed top-0 z-10 w-full border-b-2 border-orange-600 backdrop-blur-lg">
                    <div className="mx-auto w-full px-5">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" onClick={
                                () => navigate('/')
                            }>
                                <h2 className='text-orange-600 text-xl font-bold cursor-pointer'>Scrapify</h2>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative ml-3">
                                    <button onClick={handleSignIn} className="p-2 text-white hover:text-orange-500 transition">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        </nav>
    );
}