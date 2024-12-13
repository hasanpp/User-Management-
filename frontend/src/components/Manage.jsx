/* eslint-disable react/prop-types */

import "../styles/Manage.css";

const Modal = ({ isOpen, title, children, onClose, onSave }) => {


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onSave} className="btn btn-primary">Save</button>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
