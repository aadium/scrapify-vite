import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import sparkles from '../../assets/sparkler.png';
import { requestGroqAi } from '../../utils/groq';
import Modal from '../../utils/modal';
import Header from '../../widgets/header';
import useAuth from '../../utils/useAuth';

export default function Output() {
    const { id } = useParams();
    const [bearerToken, setBearerToken] = useState('');
    const [scraperOutput, setScraperOutput] = useState([]);
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');
    const [summarizerLoading, setSummarizerLoading] = useState(false);
    const [sentimentLoading, setSentimentLoading] = useState(false);

    async function getScraperOutput() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/scraper/output/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        setScraperOutput(data);
        setLoading(false);
    }

    async function getSentimentAnalysis() {
        setSentimentLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/scraper/sentiment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: scraperOutput }),
        });
        const data = await response.json();
        setSentimentAnalysis(data);
        setSentimentLoading(false);
    }

    const getCellColor = (score) => {
        if (score > 0) {
            return 'bg-green-900';
        } else if (score < 0) {
            return 'bg-red-900';
        } else {
            return 'bg-zinc-900';
        }
    };

    async function getSummary(data) {
        setSummarizerLoading(true);
        if (markdownContent === '') {
            const jsonDataString = JSON.stringify(data, null, 2);
            const prompt = `Summarize the below data and also categorize it if possible:\n\n${jsonDataString}`;
            const summary = await requestGroqAi(prompt);
            setMarkdownContent(summary);
        }
        setSummarizerLoading(false);
        setShowDialog(true);
    }

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

    useAuth(setBearerToken);

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
                                <button className="bg-white text-black font-bold py-2 px-4 mr-2 rounded-md mb-4" onClick={() => getSummary(scraperOutput)}>
                                    {
                                        summarizerLoading ? (
                                            <div className="flex justify-center items-center h-max">
                                                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                                    role="status">
                                                    <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <img src={sparkles} alt="Summarize" className="inline-block mr-2" style={{ width: '25px', height: '25px' }} /> Summarization
                                            </div>
                                        )
                                    }
                                </button>
                                <button className="bg-white text-black font-bold py-2 px-4 mr-2 rounded-md mb-4" onClick={getSentimentAnalysis}>
                                    {
                                        sentimentLoading ? (
                                            <div className="flex justify-center items-center h-max">
                                                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                                    role="status">
                                                    <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <img src={sparkles} alt="Sentiment" className="inline-block mr-2" style={{ width: '25px', height: '25px' }} /> Sentiment Analysis
                                            </div>
                                        )
                                    }
                                </button>
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
                            {showDialog && (
                                <Modal onClose={() => setShowDialog(false)}>
                                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                                </Modal>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                            role="status">
                            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}