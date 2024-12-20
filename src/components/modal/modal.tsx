import React from "react";
import ModalContent from "./modalContent";
import { DataRepresentation } from "data";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  rowData: DataRepresentation | null;
}

const CustomModal: React.FC<ModalProps> = ({ show, handleClose, rowData }) => {
  if (!show || !rowData) return null;

  return (
    <div
      className="modal fade show"
      id="exampleModal"
      tabIndex={-1}
      // aria-labelledby="exampleModalLabel"
      // aria-hidden="true"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(0.3em)",
      }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      onClick={handleClose}
    >
      <div
        className="modal-dialog card shadow shadow-lg"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content ">
          <div className="modal-header">
            <h2
              className="modal-title text-center"
              id="exampleModalLabel"
              style={{
                margin: "0 auto",
              }}
            >
              <strong>{`${rowData.standard} ${rowData.code}`}</strong>
            </h2>
          </div>

          <div className="modal-body">
            <ModalContent ringDimensions={rowData} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
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
