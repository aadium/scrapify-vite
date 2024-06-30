import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Output() {
    const { id } = useParams();
    const [scraperOutput, setScraperOutput] = useState(null);

    async function getScraperOutput() {
        const response = await fetch(`https://web-scraping-demo-8p7f.onrender.com/scraper/output/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        setScraperOutput(data);
    }

    useEffect(() => {
        getScraperOutput();
    }, []);

    const keys = scraperOutput && scraperOutput.length > 0 ? Object.keys(scraperOutput[0]) : [];

    return (
        <div>
            {scraperOutput && (
                <div className="mt-6 flex justify-center">
                    <div className="overflow-x-auto">
                        <table className="table-auto rounded-md w-full overflow-hidden">
                            <thead className="bg-white">
                                <tr>
                                    {keys.map(key => (
                                        <th key={key} className="px-4 py-2 text-black">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-zinc-950 rounded-b-lg text-white ring-1 ring-white ring-inset">
                                {scraperOutput.map((item, index) => (
                                    <tr key={index}>
                                        {keys.map(key => (
                                            <td key={key} className="px-4 py-3">{item[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}