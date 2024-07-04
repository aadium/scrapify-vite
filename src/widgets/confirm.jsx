import PropTypes from "prop-types";

function ConfirmBox({ setOpenModal, onConfirm, boxTitle, boxDesc, actionText }) {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-90"
                onClick={() => { setOpenModal(false); }}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-min max-w-lg p-3 mx-auto bg-zinc-900 rounded-lg border-2 shadow-lg">
                    <div className="sm:flex w-max">
                        <div className="text-center sm:text-left">
                            <div className="text-center pt-2 px-2">
                                <h4 className="text-2xl text-orange-500 font-medium">
                                    {boxTitle}
                                </h4>
                                <p className="text-md mt-4 text-white leading-relaxed">
                                    {boxDesc}
                                </p>
                            </div>
                            <div className="items-center gap-3 mt-3 sm:flex">
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-orange-600 hover:bg-orange-700 transition transition-300 rounded-md"
                                    onClick={() => { setOpenModal(false); onConfirm(); }}
                                >
                                    {actionText}
                                </button>
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-black rounded-md bg-white hover:bg-gray-200 transition transition-300"
                                    onClick={() => { setOpenModal(false); }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmBox.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    boxTitle: PropTypes.string.isRequired,
    boxDesc: PropTypes.string,
    actionText: PropTypes.string.isRequired,
};

export default ConfirmBox;