import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../widgets/header';

export default function ScraperDetails() {
    const navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('');
    const [running, setRunning] = useState(false);
    const [scraperDetails, setScraperDetails] = useState({});
    const [outputs, setOutputs] = useState([]);
    const { id } = useParams();

    function runScraper() {
        setRunning(true);
        fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/start/${id}`, {
            method: 'POST',
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
                console.log(data.message);
                setRunning(false);
                alert('Scraper ran successfully!');
            })
            .catch((error) => {
                console.error('Error running scraper:', error);
                setRunning(false);
            });
    }

    function getScraperDetails() {
        fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/${id}`, {
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
                setScraperDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching scraper details:', error);
            });
    }

    function deleteScraper() {
        const confirmDelete = confirm('Are you sure you want to delete this scraper?');
        if (!confirmDelete) {
            return;
        }
        fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/${id}`, {
            method: 'DELETE',
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
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error deleting scraper:', error);
            });
    }

    function getOutputs() {
        fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/outputs/${id}`, {
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
                setOutputs(data);
            })
            .catch((error) => {
                console.error('Error fetching outputs:', error);
            });
    }

    async function downloadCSV(oid) {
        const data = await fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/output/${oid}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .catch(error => console.error('Error fetching output:', error));
        if (data.length > 0) {
            const columnTitles = Object.keys(data[0]).join(',');
            const csvRows = data.map(row =>
                Object.values(row).map(value =>
                    `"${value.toString().replace(/"/g, '""')}"`).join(',')
            );
            const csv = [columnTitles, ...csvRows].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${oid}.csv`;
            downloadLink.click();
        }
    }

    async function downloadXML(oid) {
        const data = await fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/output/${oid}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .catch(error => console.error('Error fetching output:', error));
        const xml = data.map(row => `<row>${Object.entries(row).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}</row>`).join('\n');
        const blob = new Blob([xml], { type: 'text/xml' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${oid}.xml`;
        downloadLink.click();
    }

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = null;
        try {
            token = JSON.parse(tokenString);
        } catch (e) {
            console.error('Error parsing token:', e);
        }
        if (token) {
            fetch('https://web-scraping-demo-8p7f.onrender.com/auth/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Token validation failed: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    setBearerToken(token);
                })
                .catch(error => {
                    console.error('Error validating token:', error);
                    navigate('/signin');
                });
        } else {
            navigate('/signin');
        }
    }, []);

    useEffect(() => {
        if (bearerToken !== '') {
            getScraperDetails();
            getOutputs();
        }
    }, [getOutputs, getScraperDetails, bearerToken]);

    return (
        <div className="flex flex-col items-center bg-black pt-20">
            <Header />
            <div className="bg-zinc-950 border border-2 border-white p-7 rounded-md shadow max-w-md">
                <h1 className="text-2xl font-bold dark:text-white">{scraperDetails.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 my-3">
                    Created at: {
                        new Date(scraperDetails.created_at).toLocaleDateString('en-US', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        }) + ', ' +
                        new Date(scraperDetails.created_at).toLocaleTimeString('en-US', {
                            hour: '2-digit', minute: '2-digit', hour12: true
                        }).toLowerCase()
                    }
                </p>
                <a href={scraperDetails.url} target='_blank' className="text-orange-500 hover:underline">{scraperDetails.url}</a>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-white">Selectors</h2>
                    {scraperDetails.selectors && (
                        <table className="bg-zinc-900 mt-2 rounded-md w-full">
                            <tbody>
                                {Object.entries(scraperDetails.selectors).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="py-3 px-5 text-orange-500 font-bold text-center">{key}</td>
                                        <td className="py-3 px-5 text-white text-center">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <button className="rounded-md bg-orange-600 py-2 px-4 mr-2 text-white w-full flex justify-center items-center hover:bg-orange-700 transition duration-300" onClick={
                        running ? null : runScraper
                    }>
                        {running ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-l-2 border-white"></div>
                        ) : (
                            'Run'
                        )}
                    </button>
                    <button className="rounded-md bg-orange-600 py-2 px-4 text-white w-full hover:bg-orange-700 transition duration-300" onClick={deleteScraper}>
                        Delete
                    </button>
                </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Scrape Results</h2>
            <div className="mt-6 w-full px-20 text-center">
                <a name="page-top" />
                <table className="table-auto rounded-md w-full overflow-hidden">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-4 py-2 text-black">ID</th>
                            <th className="px-4 py-2 text-black">Date and Time</th>
                            <th className="px-4 py-2 text-black">Download</th>
                        </tr>
                    </thead>
                    <tbody className="bg-zinc-950 rounded-b-lg text-white ring-1 ring-white ring-inset">
                        {outputs.map((output) => (
                            <tr key={output.id}>
                                <td className="px-4 py-3 hover:cursor-pointer hover:underline" onClick={
                                    () => navigate(`/scraper/output/${output.id}`)
                                }>{output.id}</td>
                                <td className="px-4 py-3">
                                    {
                                        new Date(output.created_at).toLocaleDateString('en-US', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        }) + ', ' +
                                        new Date(output.created_at).toLocaleTimeString('en-US', {
                                            hour: '2-digit', minute: '2-digit', hour12: true
                                        }).toLowerCase()
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-orange-500 hover:underline cursor-pointer" onClick={
                                        () => window.open(output.bucket_url, '_blank')
                                    }>JSON</button>
                                    <span className="mx-2">|</span>
                                    <button className="text-green-500 hover:underline cursor-pointer" onClick={
                                        () => downloadCSV(output.id)
                                    }>CSV</button>
                                    <span className="mx-2">|</span>
                                    <button className="text-red-500 hover:underline cursor-pointer" onClick={
                                        () => downloadXML(output.id)
                                    }>XML</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        </div>
    );
}