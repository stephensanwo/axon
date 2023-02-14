import React, { useState, useContext, ReactChildren, ReactChild } from "react";
import "./style.scss";
interface ModalProps {
  modal: string;
  toggleModal: React.Dispatch<React.SetStateAction<any>>;
  header?: string;
  header_label?: string;
  children: ReactChild | ReactChildren;
  action?: React.Dispatch<React.SetStateAction<any>>;
  size?: "lg" | "md" | "sm";
}

const Modal: React.FC<ModalProps> = (props) => {
  const DateNow = Date.now();

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    props.toggleModal(e);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    props.toggleModal(e);
  };
  return (
    <div
      data-modal
      id="disabled-modal"
      className={`bx--modal ${props.modal}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disabled-label"
      aria-describedby="disabled-heading"
      tabIndex={-1}
    >
      <div
        className={`bx--modal-container ${
          props.size && props.size === "lg"
            ? "bx--modal-container-fullscreen"
            : props.size === "md"
            ? "bx--modal-container-mediumscreen"
            : "bx--modal-container-smallscreen"
        }`}
      >
        <div className="bx--modal-header">
          {props.header_label && (
            <p
              className="bx--modal-header__label bx--type-delta"
              id="modal-lokx1olb9q-label"
            >
              {props.header_label}
            </p>
          )}
          {props.header && (
            <p
              className="bx--modal-header__heading bx--type-beta"
              id="modal-lokx1olb9q-heading"
            >
              <h2>{props.header}</h2>
            </p>
          )}
        </div>

        <div className="bx--modal-content">{props.children}</div>
        <div className="bx--modal-footer">
          <button
            className="bx--btn bx--btn--secondary"
            type="button"
            data-modal-close
            onClick={(e) => handleClose(e)}
          >
            Cancel
          </button>
          <button
            className="bx--btn bx--btn--primary"
            type="submit"
            data-modal-primary-focus
            onClick={(e) => handleSubmit(e)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
