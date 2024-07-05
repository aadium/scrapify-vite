import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header';
import useAuth from '../../utils/useAuth';
import ConfirmBox from "../../components/confirm.jsx";
import AlertBox from "../../components/alert.jsx";
import ScraperDetails from "../../components/scraperDetails.jsx";
import OutputsTable from "../../components/outputsTable.jsx";

export default function ScraperDetailsOut() {
    const navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('');
    const [running, setRunning] = useState(false);
    const [scraperDetails, setScraperDetails] = useState({});
    const [outputs, setOutputs] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [outputLoading, setOutputLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    function runScraper() {
        setRunning(true);
        fetch(`${import.meta.env.VITE_API_URL}/scraper/start/${id}`, {
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
                setShowSuccessAlert(true);
            })
            .catch((error) => {
                console.error('Error running scraper:', error);
                setRunning(false);
            });
    }

    function handleDelete() {
        setShowDeleteConfirm(true);
    }

    const deleteScraper = async () => {
        fetch(`${import.meta.env.VITE_API_URL}/scraper/${id}`, {
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
            .then(() => {
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error deleting scraper:', error);
            });
    }

    async function downloadCSV(oid) {
        const data = await fetch(`${import.meta.env.VITE_API_URL}/scraper/output/${oid}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .catch(error => console.error('Error fetching output:', error));
        if (data.length <= 0) {
            return;
        }
        const columnTitles = Object.keys(data[0]).join(',');
        const csvRows = data.map(row =>
            Object.values(row).map(value =>
                `"${value.toString().replace(/"/g, '""')}"`).join(',')
        );
        const csv = [columnTitles, ...csvRows].join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${oid}.csv`;
        downloadLink.click();
    }

    async function downloadXML(oid) {
        const data = await fetch(`${import.meta.env.VITE_API_URL}/scraper/output/${oid}`, {
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

    useAuth(setBearerToken);

    useEffect(() => {
        function getScraperDetails() {
            fetch(`${import.meta.env.VITE_API_URL}/scraper/${id}`, {
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
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching scraper details:', error);
                });
        }
        function getOutputs() {
            fetch(`${import.meta.env.VITE_API_URL}/scraper/outputs/${id}`, {
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
                    setOutputLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching outputs:', error);
                });
        }
        if (bearerToken !== '') {
            getScraperDetails();
            getOutputs();
        }
    }, [id, bearerToken]);

    return (
        <div className="flex flex-col items-center bg-black pt-20">
            <Header />
            {
                showDeleteConfirm && (
                    <ConfirmBox boxTitle={'Delete Scraper'} boxDesc={'Are you sure you want to delete this scraper?'} actionText={'Delete'} onConfirm={deleteScraper} setOpenModal={setShowDeleteConfirm} />
                )
            }
            {
                showSuccessAlert && (
                    <AlertBox boxTitle={'Scraper ran successfully'} setShowAlert={setShowSuccessAlert} />
                )
            }
            <ScraperDetails running={running} runScraper={runScraper} loading={loading} scraperDetails={scraperDetails} handleDelete={handleDelete} />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Scrape Results</h2>
            <OutputsTable outputs={outputs} outputLoading={outputLoading} downloadXML={downloadXML} navigate={navigate} downloadCSV={downloadCSV} />
        </div>
    );
}