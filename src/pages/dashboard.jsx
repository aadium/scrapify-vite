import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../widgets/header';
import useAuth from '../utils/useAuth';

export default function Dashboard() {
    const navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('');
    const [scrapers, setScrapers] = useState([]);
    const [loading, setLoading] = useState(true);

    function getScrapers() {
        fetch(`${import.meta.env.VITE_API_URL}/scraper`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setScrapers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching scrapers:', error);
            });
    }

    useAuth(setBearerToken);

    useEffect(() => {
        if (bearerToken !== '') {
            getScrapers();
        }
    }, [getScrapers, bearerToken]);

    return (
        <div className="min-h-screen flex flex-col py-2">
            <Header />
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center pt-12">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Your Scrapers</h2>
                <div className="mt-6 w-full">
                    <a name="page-top" />
                    <table className="table-auto rounded-md w-full overflow-hidden">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-4 py-2 text-black">Name</th>
                                <th className="px-4 py-2 text-black">URL</th>
                                <th className="px-4 py-2 text-black">Selectors</th>
                            </tr>
                        </thead>
                        {
                            loading ? (
                                <tbody className="bg-zinc-950 rounded-b-lg text-white ring-1 ring-white ring-inset">
                                    <tr>
                                        <td colSpan="3" className="px-4 py-3">
                                            <div className="flex justify-center items-center h-max">
                                                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                                    role="status">
                                                    <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody className="bg-zinc-950 rounded-b-lg text-white ring-1 ring-white ring-inset">
                                    {scrapers.map((scraper) => (
                                        <tr key={scraper.id} className="cursor-pointer hover:ring-1 hover:ring-white hover:ring-inset hover:bg-zinc-900" onClick={
                                            () => navigate(`/scraper/${scraper.id}`)
                                        }>
                                            <td className="px-4 py-3">{scraper.name}</td>
                                            <td className="px-4 py-3">{scraper.url}</td>
                                            <td className="px-4 py-3">
                                                {Object.entries(scraper.selectors).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                    </table>
                    <button className="rounded-md bg-orange-600 py-2 px-4 text-white hover:bg-orange-700 transition duration-300 my-2" onClick={
                        () => navigate('/dashboard/add')
                    }>
                        Add Scraper
                    </button>
                </div>
            </main>

            <footer className="flex h-16 w-full items-center justify-center">
                <a
                    href="#top"
                    aria-label="Back to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                </a>
            </footer>
        </div>
    );
}