// const Navbar = () => {
//     return (
        
//             <div className="navbar bg-white p-0 sticky z-50 top-0 left-0 flex shadow-2xl h-16">
//                 <div className="w-64">
//                     <div className="lg:flex cursor-pointer">
//                         <span className="text-lg font-bold cursor-pointer">
//                             <img src="../logo.jpg" alt=""  className="h-16 w-full"/>
//                         </span>
//                     </div>
//                 </div>
//                 <div className="flex-1 px-2 mx-2"></div>
//                 <div className="flex-none">
//                     <div className="m-1 mr-2 w-12 h-12 rounded-full bg-gray text-xl cursor-pointer relative" >

//                             <div  className=" py-1 bg-white rounded-lg shadow-2xl absolute right-0 bordercolor mt-14" >
//                             <div className=" px-4 py-2 text-gray cursor-pointer flex items-center ">
//                                 <div className="logout-text text-base">Logout</div>
//                             </div>
//                         </div>
                        
                   
//                     </div>
//                 </div>
//             </div>
        
//     )
// }
// export default Navbar;
import React, { useState } from 'react';
import Header from '../Header' // Import your Header component

const Navbar: React.FC = () => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

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

