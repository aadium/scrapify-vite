import PropTypes from "prop-types";

function OutputsTable({ outputs, outputLoading, downloadCSV, downloadXML, navigate }) {
    return (
        <div className="w-full">
            {
                outputLoading ? (
                    <div className="flex justify-center items-center h-max mt-5">
                        <div
                            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                            role="status">
                            <span
                                className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 w-full px-20 text-center">
                        <a name="page-top"/>
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
                                        }>JSON
                                        </button>
                                        <span className="mx-2">|</span>
                                        <button className="text-green-500 hover:underline cursor-pointer" onClick={
                                            () => downloadCSV(output.id)
                                        }>CSV
                                        </button>
                                        <span className="mx-2">|</span>
                                        <button className="text-red-500 hover:underline cursor-pointer" onClick={
                                            () => downloadXML(output.id)
                                        }>XML
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <br/>
                    </div>
                )
            }
        </div>
    );
}

OutputsTable.propTypes = {
    outputs: PropTypes.array.isRequired,
    outputLoading: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    downloadCSV: PropTypes.func.isRequired,
    downloadXML: PropTypes.func.isRequired,
}

export default OutputsTable;