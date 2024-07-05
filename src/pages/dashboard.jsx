import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import useAuth from '../utils/useAuth';
import ScrapersTable from "../components/scrapersTable.jsx";

export default function Dashboard() {
    const navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('');
    const [scrapers, setScrapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useAuth(setBearerToken);

    useEffect(() => {
        const getScrapers = () => {
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
        };
        if (bearerToken !== '') {
            getScrapers();
        }
    }, [bearerToken]);

    return (
        <div className="min-h-screen flex flex-col py-2">
            <Header />
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center pt-12">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Your Scrapers</h2>
                <div className="mt-6 w-full">
                    <a name="page-top" />
                    <ScrapersTable navigate={navigate} scrapers={scrapers} loading={loading} />
                    <button className="rounded-md bg-orange-600 py-2 px-4 text-white hover:bg-orange-700 transition duration-300 my-2" onClick={
                        () => navigate('/dashboard/add')
                    }>
                        Add Scraper
                    </button>
                </div>
            </main>
        </div>
    );
}