import PropTypes from "prop-types";

function AlertBox({ setShowAlert, boxTitle }) {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-50"
                onClick={() => { setShowAlert(false); }}
            ></div>
            <div className="flex items-center px-4 py-4">
                <div className="relative w-min max-w-lg p-3 mx-auto border-2 border-orange-600 bg-zinc-900 rounded-lg shadow-lg">
                    <div className="sm:flex w-max">
                        <div className="text-center h-max sm:text-left flex flex-row">
                            <div className="text-center m-auto pl-2 pr-4">
                                <h4 className="text-l text-white font-medium">
                                    {boxTitle}
                                </h4>
                            </div>
                            <div className="items-center gap-3 sm:flex">
                                <button
                                    className="group w-min flex-1 text-white rounded-md bg-transparent"
                                    onClick={() => { setShowAlert(false); }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto group-hover:stroke-orange-500 transition transition-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AlertBox.propTypes = {
    setShowAlert: PropTypes.func.isRequired,
    boxTitle: PropTypes.string.isRequired,
};

export default AlertBox;