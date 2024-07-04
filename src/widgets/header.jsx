import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import ConfirmBox from "./confirm.jsx";

export default function Header() {
    const navigate = useNavigate();
    const [showSignOutBox, setShowSignOutBox] = useState(false);
    const signOutDelToken = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    function handleSignOut() {
        setShowSignOutBox(true);
    }
    return (
        <nav className="bg-black fixed top-0 z-10 w-full border-b-2 border-orange-600">
                    <div className="mx-auto w-full px-5">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" onClick={
                                () => navigate('/dashboard')
                            }>
                                <h2 className='text-orange-600 text-xl font-bold cursor-pointer'>Scrapify</h2>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative ml-3">
                                    <button onClick={handleSignOut} className="p-2 text-white hover:text-orange-500 transition">
                                        Sign Out
                                    </button>
                                    {
                                        showSignOutBox ? (
                                            <div className="absolute right-0 top-0 mt-12 w-48 bg-white rounded-lg shadow-lg p-2">
                                                <ConfirmBox onConfirm={signOutDelToken} setOpenModal={setShowSignOutBox} boxTitle={'Sign Out'} boxDesc={'Are you sure you want to sign out?'} actionText={'Sign out'} />
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
        </nav>
    );
}