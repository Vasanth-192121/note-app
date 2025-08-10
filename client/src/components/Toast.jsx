// import React, { useEffect } from 'react';
// import { LuCheck } from "react-icons/lu";
// import { MdDeleteOutline } from 'react-icons/md';

// const Toast = ({ isShown, message, type, onClose }) => {

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       onClose();
//     }, 3000);
  
//     return () => {
//       clearTimeout(timeoutId);
//     }
//   }, [onClose])
  

//   return (
//     <div className={`absolute top-20 right-6 transition-all duration-400 
//       ${ isShown ? "opacity-100" : "opacity-0" }`
//     }>

//       <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full 
//         ${ type ==="delete" ? "after:bg-red-500" : "after:bg-green-500" } 
//         after:absolute after:left-0 after:top-0 after:rounded-l-lg `
//       }>
//         <div className='flex items-center gap-3 py-2 px-4'>

//           <div className={`w-10 h-10 flex items-center justify-center rounded-full 
//             ${ type === "delete" ? "bg-red-50" : "bg-green-50" }`
//           }>

//           {type === "delete" ? ( 

//             <MdDeleteOutline className='text-xl text-red-500' />

//           ) : (

//             <LuCheck className="text-xl text-green-500" /> 
          
//           )}

//           </div>

//           <p className='text-sm text-slate-800'>{message}</p>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Toast

// import React, { useEffect } from 'react';
// import { LuCheck } from "react-icons/lu";
// import { MdDeleteOutline } from 'react-icons/md';

// const Toast = ({ isShown, message, type, onClose }) => {

//     useEffect(() => {
//         if (isShown) {
//             const timeoutId = setTimeout(() => {
//                 onClose();
//             }, 3000);
//             return () => {
//                 clearTimeout(timeoutId);
//             };
//         }
//     }, [isShown, onClose]);

//     return (
//         <div
//             className={`fixed top-20 right-6 z-50 transition-transform duration-500 ease-in-out transform
//             ${isShown ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
//         >
//             <div
//                 className={`min-w-52 bg-white border-2 border-gray-100 shadow-xl rounded-md after:w-[5px] after:h-full 
//                 ${ type === "delete" ? "after:bg-red-500" : "after:bg-green-500" } 
//                 after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
//             >
//                 <div className='flex items-center gap-3 py-2 px-4'>
//                     <div
//                         className={`w-10 h-10 flex items-center justify-center rounded-full 
//                         ${ type === "delete" ? "bg-red-50" : "bg-green-50" }`}
//                     >
//                         {type === "delete" ? (
//                             <MdDeleteOutline className='text-xl text-red-500' />
//                         ) : (
//                             <LuCheck className="text-xl text-green-500" />
//                         )}
//                     </div>
//                     <p className='text-sm text-slate-800'>{message}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Toast;







// // Toast.jsx

// import React, { useEffect } from 'react';
// import { LuCheck } from "react-icons/lu";
// import { MdDeleteOutline } from 'react-icons/md';

// const Toast = ({ isShown, message, type, onClose, onUndo }) => {
//     // You'll need to manage the timeout here to close the toast automatically
//     // The timeout logic is now handled in Home.jsx for the undo feature,
//     // so this useEffect might not be necessary for the 'undo' type.
//     useEffect(() => {
//         if (isShown && type !== 'undo') {
//             const timeoutId = setTimeout(() => {
//                 onClose();
//             }, 3000);
//             return () => {
//                 clearTimeout(timeoutId);
//             };
//         }
//     }, [isShown, type, onClose]);

//     const getIcon = () => {
//         if (type === "delete") {
//             return <MdDeleteOutline className='text-xl text-red-500' />;
//         }
//         return <LuCheck className="text-xl text-green-500" />;
//     };

//     const getBackgroundColor = () => {
//         if (type === "delete") return "bg-red-50";
//         if (type === "undo") return "bg-gray-50"; // A new color for the undo toast
//         return "bg-green-50";
//     };

//     return (
//         <div
//             className={`fixed top-20 right-6 z-50 transition-transform duration-500 ease-in-out transform
//             ${isShown ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
//         >
//             <div
//                 className={`min-w-52 bg-white border-2 border-gray-100 shadow-xl rounded-md after:w-[5px] after:h-full 
//                 ${ type === "delete" ? "after:bg-red-500" : type === "undo" ? "after:bg-gray-500" : "after:bg-green-500" } 
//                 after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
//             >
//                 <div className='flex items-center gap-3 py-2 px-4'>
//                     <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getBackgroundColor()}`}>
//                         {getIcon()}
//                     </div>
//                     <p className='text-sm text-slate-800 flex-grow'>{message}</p>
//                     {/* Add the Undo button here */}
//                     {type === 'undo' && (
//                         <button
//                             onClick={onUndo}
//                             className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md ml-auto hover:bg-blue-600 transition-colors"
//                         >
//                             Undo
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Toast;






// Toast.jsx (Updated for pin/unpin colors)

import React, { useEffect } from 'react';
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline, MdPushPin } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose, onUndo }) => {
    useEffect(() => {
        if (isShown && type !== 'undo') {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [isShown, type, onClose]);

    const getIcon = () => {
        if (type === "delete") return <MdDeleteOutline className="text-xl text-red-500" />;
        if (type === "unpin") return <MdPushPin className="text-xl text-red-500" />;
        if (type === "pin") return <MdPushPin className="text-xl text-green-500" />;
        return <LuCheck className="text-xl text-green-500" />;
    };

    const getBackgroundColor = () => {
        if (type === "delete") return "bg-red-50";
        if (type === "unpin") return "bg-red-50";
        if (type === "undo") return "bg-gray-50";
        if (type === "pin") return "bg-green-50";
        return "bg-green-50";
    };

    return (
        <div
            className={`fixed top-20 right-6 z-50 transition-transform duration-500 ease-in-out transform
            ${isShown ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
            <div
                className={`min-w-52 bg-white border-2 border-gray-100 shadow-xl rounded-md after:w-[5px] after:h-full 
                ${ type === "delete" || type === "unpin" ? "after:bg-red-500" 
                  : type === "undo" ? "after:bg-gray-500" 
                  : "after:bg-green-500" } 
                after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
            >
                <div className='flex items-center gap-3 py-2 px-4'>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getBackgroundColor()}`}>
                        {getIcon()}
                    </div>
                    <p className='text-sm text-slate-800 flex-grow'>{message}</p>
                    {type === 'undo' && (
                        <button
                            onClick={onUndo}
                            className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md ml-auto hover:bg-blue-600 transition-colors"
                        >
                            Undo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Toast;
