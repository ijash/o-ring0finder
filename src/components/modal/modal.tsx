import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalContent from "./modalContent";
import { DataRepresentation } from "data";
interface ModalProps {
  show: boolean;
  handleClose: () => void;
  rowData: DataRepresentation | null;
}

const CustomModal: React.FC<ModalProps> = ({ show, handleClose, rowData }) => {
  if (!show) {
    return null;
  }
  if (!rowData) {
    return null;
  }
  return (
    <div
      className="
      modal 
      fade
      show 
      d-block
      bg-dark-transparent"
      tabIndex={-1}
      role="dialog"
      onClick={handleClose}
    >
      <div
        className="modal-dialog card"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" card-body fade-scale">
          <div className="modal-header">
            <h3 className="modal-title ">
              <strong>{`${rowData.standard} ${rowData.code}`} Detail</strong>
            </h3>
          </div>
          <div className="modal-body">
            <ModalContent oringData={rowData} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
