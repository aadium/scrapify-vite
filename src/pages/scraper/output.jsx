import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../widgets/header';

export default function Output() {
    const { id } = useParams();
    const [bearerToken, setBearerToken] = useState('');
    const [scraperOutput, setScraperOutput] = useState([]);
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getScraperOutput() {
        const response = await fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/output/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        setScraperOutput(data);
        setLoading(false);
    }

    async function getSentimentAnalysis() {
        const response = await fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/sentiment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: scraperOutput }),
        });
        const data = await response.json();
        setSentimentAnalysis(data);
    }

    const getCellColor = (score) => {
        if (score > 0) {
            return 'bg-green-900'; // Positive sentiment
        } else if (score < 0) {
            return 'bg-red-900'; // Negative sentiment
        } else {
            return 'bg-zinc-900'; // Neutral sentiment
        }
    };


    async function downloadCSV(oid) {
        const data = scraperOutput;
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
        const data = scraperOutput;
        const xml = data.map(row => `<row>${Object.entries(row).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}</row>`).join('\n');
        const blob = new Blob([xml], { type: 'text/xml' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${oid}.xml`;
        downloadLink.click();
    }

    async function downloadJSON(oid) {
        const data = scraperOutput;
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${oid}.json`;
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
        if (!token) {
            navigate('/signin');
        }
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
                console.log(data.message);
                setBearerToken(token);
            })
            .catch(error => {
                console.error('Error validating token:', error);
                navigate('/signin');
            });
    }, []);

    useEffect(() => {
        if (bearerToken !== '') {
            getScraperOutput();
        }
    }, [getScraperOutput, bearerToken]);

    const keys = scraperOutput && scraperOutput.length > 0 ? Object.keys(scraperOutput[0]) : [];

    return (
        <div>
            <Header />
            <div className='pt-12'>
                {scraperOutput && !loading ? (
                    <div className="mt-6 flex justify-center">
                        <div className="overflow-x-auto">
                            <div className="flex justify-center">
                                <button className="bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded-md mb-4" onClick={getSentimentAnalysis}>Sentiment Analysis</button>
                                <button className="bg-orange-600 text-white font-bold py-2 px-4 mr-2 rounded-md mb-4" onClick={() => downloadJSON(id)}>Download JSON</button>
                                <button className="bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded-md mb-4" onClick={() => downloadCSV(id)}>Download CSV</button>
                                <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-md mb-4" onClick={() => downloadXML(id)}>Download XML</button>
                            </div>
                            <table className="table-auto rounded-md w-full overflow-hidden">
                                <thead className="bg-white">
                                    <tr>
                                        {keys.map(key => (
                                            <th key={key} className="px-4 py-2 text-black">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-zinc-900 rounded-b-lg text-white">
                                    {scraperOutput.map((item, index) => (
                                        <tr key={index}>
                                            {keys.map(key => {
                                                const sentiment = sentimentAnalysis.length > 0 && sentimentAnalysis[index] && sentimentAnalysis[index].find(s => s.field === key);
                                                const cellColor = sentiment ? getCellColor(sentiment.score) : '';
                                                return (
                                                    <td key={key} className={`px-4 py-3 ${cellColor}`}>
                                                        {item[key]} {
                                                            sentiment && (
                                                                <span className="text-xs ml-2">{sentiment.score}</span>
                                                            )
                                                        }
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div class="flex justify-center items-center h-screen">
                        <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                            role="status">
                            <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}