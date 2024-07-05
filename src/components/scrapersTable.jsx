import PropTypes from "prop-types";

function ScrapersTable({ scrapers, loading, navigate }) {
    return (
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
                                <div
                                    className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                    role="status">
                                    <span
                                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                ) : (
                    <tbody className="bg-zinc-950 rounded-b-lg text-white ring-1 ring-white ring-inset">
                    {scrapers.map((scraper) => (
                        <tr key={scraper.id}
                            className="cursor-pointer hover:ring-1 hover:ring-white hover:ring-inset hover:bg-zinc-900"
                            onClick={
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
    );
}

ScrapersTable.propTypes = {
    scrapers: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
}

export default ScrapersTable;