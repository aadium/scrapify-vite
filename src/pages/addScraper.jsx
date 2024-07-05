import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/header';
import useAuth from '../utils/useAuth';
import AlertBox from "../components/alert.jsx";

export default function AddScraper() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [bearerToken, setBearerToken] = useState('');
    const [url, setUrl] = useState('');
    const [selectors, setSelectors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = `${import.meta.env.VITE_API_URL}/scraper/create`;
        const payload = { name, url, selectors };
        try {
            setLoading(true);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: JSON.stringify(payload)
            });
            await response.json();
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating scraper:', error);
            setMessage('Error creating scraper. Please try again.');
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    function handleSelectorChange(key, newValue, type) {
        setSelectors(prevSelectors => {
            const updatedSelectors = { ...prevSelectors };
            if (type === 'key') {
                const oldValue = updatedSelectors[key];
                delete updatedSelectors[key];
                updatedSelectors[newValue] = oldValue;
            } else if (type === 'value') {
                updatedSelectors[key] = newValue;
            }
            return updatedSelectors;
        });
    }

    const addSelector = (key) => {
        if (!key || Object.prototype.hasOwnProperty.call(selectors, key)) {
            setMessage('Please enter a unique key for each selector');
            setShowAlert(true);
            return;
        }
        setSelectors(prevSelectors => ({ ...prevSelectors, [key]: '' }));
    };

    useAuth(setBearerToken);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center">
            <Header />
            {
                showAlert ? (
                    <AlertBox boxTitle={message} setShowAlert={setShowAlert} />
                ) : null
            }
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create a Scraper</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 rounded-md shadow space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4 appearance-none relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder='Enter Scraper Name' />
                </div>
                <div>
                    <label htmlFor="url" className="sr-only">URL</label>
                    <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mb-4 appearance-none relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder='Enter URL' />
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-300">Selectors</label>
                    {Object.entries(selectors).map(([key, value], index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input type="text" name="key" onChange={(e) => handleSelectorChange(key, e.target.value, 'key')} placeholder="Name" className="mb-4 appearance-none relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                            <input type="text" name="value" value={value} onChange={(e) => handleSelectorChange(key, e.target.value, 'value')} placeholder="Selector (Eg: h2.article_title)" className="mb-4 appearance-none relative block w-full px-3 py-2 border border-white bg-black placeholder-gray-500 text-white rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                        </div>
                    ))}
                    <button type="button" onClick={addSelector} className="group transition relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-zinc-300">Add Selector</button>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition ">
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
                                Create Scraper
                            </div>
                        )
                    }
                </button>
            </form>
        </div>
    );
}