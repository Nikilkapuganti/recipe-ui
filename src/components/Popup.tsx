import React, { ReactNode } from 'react';
import { PopupProps } from '../Interfaces/popup';



const Popup: React.FC<PopupProps> = ({ header, onClose, children}) => {
  return (
    <div className="importpopup">
      <div className="overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 justify-center items-center flex">
        <div className="relative my-6  max-w-xl">
          <div className="border-0 rounded  relative flex flex-col w-full bg-white ">
            <div className="flex items-start justify-between p-5">
              <h1>{header}</h1>
              <button className="p-1 ml-auto float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={onClose} >
                <img src="../cancel.svg" alt="Cancel" className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
            <div className="border-b border-solid border-lightgrey"></div>
            <div className="relative p-4 flex-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Popup;

  