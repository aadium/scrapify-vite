import PropTypes from "prop-types";

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-60 flex justify-center items-center p-4" style={{ transition: 'opacity 0.5s ease' }}>
      <div className="bg-white mt-12 p-5 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="flex justify-between items-center border-b-2 pb-2">
          <h2 id="modalTitle" className="text-lg font-semibold">Summary</h2>
          <button onClick={onClose} className="text-black bg-transparent hover:bg-gray-200 p-2 rounded-full inline-flex items-center justify-center" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;