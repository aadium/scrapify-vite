import PropTypes from "prop-types";

function ScraperDetails({ scraperDetails, loading, running, runScraper, handleDelete }) {
  return (
      <div className="bg-zinc-950 border-2 border-white p-7 rounded-md shadow max-w-md">
          {
              loading ? (
                  <div className="flex justify-center items-center h-max">
                      <div
                          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                          role="status">
                          <span
                              className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">Loading...</span>
                      </div>
                  </div>
              ) : (
                  <div>
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
                      <a href={scraperDetails.url} target="_blank" rel="noopener noreferrer"
                         className="text-orange-500 hover:underline break-words">{scraperDetails.url}</a>
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
                          <button
                              className="rounded-md bg-orange-600 py-2 px-4 mr-2 text-white w-full flex justify-center items-center hover:bg-orange-700 transition duration-300"
                              onClick={
                                  running ? null : runScraper
                              }>
                              {running ? (
                                  <div
                                      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_2s_linear_infinite]"
                                      role="status">
                                            <span
                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                  </div>
                              ) : (
                                  'Run'
                              )}
                          </button>
                          <button
                              className="rounded-md bg-orange-600 py-2 px-4 text-white w-full hover:bg-orange-700 transition duration-300"
                              onClick={handleDelete}>
                              Delete
                          </button>
                      </div>
                  </div>
              )
          }
      </div>
  );
}

ScraperDetails.propTypes = {
    scraperDetails: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    runScraper: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default ScraperDetails;