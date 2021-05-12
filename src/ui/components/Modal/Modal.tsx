import React from 'react';
import './Modal.css';

type ModalPropsType = {
  activeModal: boolean;
  setActiveModal: (activeModal: boolean) => void;
  children: any;
};
export const Modal = (props: ModalPropsType) => {
  const { activeModal, setActiveModal, children } = props;
  return (
    <div
      className={activeModal ? 'modal modalActive' : 'modal'}
      onClick={() => {
        setActiveModal(false);
      }}
    >
      <div className={activeModal ? 'modalContant modalContantactive' : 'modalContant'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
