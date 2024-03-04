import React, { useState } from 'react';
import Header from '../Header'

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-white p-0 sticky z-50 top-0 left-0 flex shadow-lg h-16">
      <div className="w-64">
        <div className="lg:flex cursor-pointer">
          <span className="text-lg font-bold cursor-pointer">
            <img src="../../logo192.png" alt="" className="h-16 w-full" />
          </span>
        </div>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Header />
      </div>
      <div className="flex-none">
       
      </div>
    </div>
  );
};

export default Navbar;

