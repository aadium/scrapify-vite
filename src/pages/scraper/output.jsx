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
        getScraperOutput();
    }, []);

    const keys = scraperOutput && scraperOutput.length > 0 ? Object.keys(scraperOutput[0]) : [];

    return (
        <div>
            {scraperOutput && (
                <div className="mt-6 flex justify-center">
                    <div className="overflow-x-auto">
                        <div className="flex justify-center">
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