import PropTypes from "prop-types";

function OutputTable({ scraperOutput, keys, sentimentAnalysis, getCellColor }) {
    return (
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
    )
}

OutputTable.propTypes = {
    scraperOutput: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    sentimentAnalysis: PropTypes.array.isRequired,
    getCellColor: PropTypes.func.isRequired,
}

export default OutputTable;