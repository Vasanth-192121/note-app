// import React from 'react';
// import moment from 'moment';
// import {MdOutlinePushPin, MdCreate, MdDelete} from "react-icons/md";

// const NoteCard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
//   return (
//     <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
//         <div className='flex items-center justify-between'>
//             <div>
//                 <h6 className='text-sm font-medium'>{title}</h6>
//                 <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
//             </div>

//             <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`} onClick={onPinNote}/>
//         </div>

//         <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

//         <div className='flex items-center justify-between mt-2'>
//             <div className='text-xs text-slate-500'> {tags.map((item) => `#${item} `)} </div>

//             <div className='flex items-center gap-2'>
//                 <MdCreate 
//                     className='icon-btn hover:text-green-600'
//                     onClick={onEdit}
//                 />

//                 <MdDelete 
//                     className='icon-btn hover:text-red-500'
//                     onClick={onDelete}
//                 />
//             </div>
            
//         </div>
        
//     </div>
//   )
// }

// export default NoteCard;



// import React, { useState } from 'react';
// import moment from 'moment';
// import { MdOutlinePushPin, MdCreate, MdDelete, MdClose } from "react-icons/md";

// const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
//       <div className='flex items-center justify-between'>
//         <div>
//           <h6 className='text-sm font-medium'>{title}</h6>
//           <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
//         </div>

//         <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`} onClick={onPinNote} />
//       </div>

//       <p className='text-xs text-slate-600 mt-2' onClick={handleToggleOpen}>
//         {isOpen ? content : `${content?.slice(0, 60)}...`}
//       </p>

//       <div className='flex items-center justify-between mt-2'>
//         <div className='text-xs text-slate-500'> {tags.map((item) => `#${item} `)} </div>

//         <div className='flex items-center gap-2'>
//           <MdCreate 
//             className='icon-btn hover:text-green-600'
//             onClick={onEdit}
//           />
//           <MdDelete 
//             className='icon-btn hover:text-red-500'
//             onClick={onDelete}
//           />
//           {isOpen && (
//             <MdClose 
//               className='icon-btn hover:text-red-500'
//               onClick={handleToggleOpen}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;


// import React, { useState } from 'react';
// import moment from 'moment';
// import { MdOutlinePushPin, MdCreate, MdDelete, MdClose } from "react-icons/md";

// const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
//       <div className='flex items-center justify-between'>
//         <div>
//           <h6 className='text-sm font-medium'>{title}</h6>
//           <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
//         </div>

//         <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`} onClick={onPinNote} />
//       </div>

//       <div className={`mt-2 text-xs text-slate-600 ${isOpen ? 'max-h-96 overflow-auto' : 'max-h-12 overflow-hidden'} transition-all ease-in-out`} onClick={handleToggleOpen}>
//         {content}
//       </div>

//       <div className='flex items-center justify-between mt-2'>
//         <div className='text-xs text-slate-500'> {tags.map((item) => `#${item} `)} </div>

//         <div className='flex items-center gap-2'>
//           <MdCreate 
//             className='icon-btn hover:text-green-600'
//             onClick={onEdit}
//           />
//           <MdDelete 
//             className='icon-btn hover:text-red-500'
//             onClick={onDelete}
//           />
//           {isOpen && (
//             <MdClose 
//               className='icon-btn hover:text-red-500'
//               onClick={handleToggleOpen}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;



import React, { useState } from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete, MdClose } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className='border rounded-xl p-4 bg-slate-100 hover:shadow-xl transition-all ease-in-out cursor-pointer' 
      onClick={handleToggleOpen}
    >
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
        </div>

        <MdOutlinePushPin 
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`} 
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from bubbling up
            onPinNote();
          }} 
        />
      </div>

      <div className={`mt-2 text-xs text-slate-600 ${isOpen ? 'max-h-96 overflow-auto' : 'max-h-12 overflow-hidden'} transition-all ease-in-out`}>
        {content}
      </div>

      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'> {tags.map((item) => `#${item} `)} </div>

        <div className='flex items-center gap-2'>
          <MdCreate 
            className='icon-btn hover:text-green-600 text-slate-400'
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              onEdit();
            }}
          />
          <MdDelete 
            className='icon-btn hover:text-red-500 text-slate-400'
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              onDelete();
            }}
          />
          {isOpen && (
            <MdClose 
              className='icon-btn hover:text-red-500'
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                handleToggleOpen();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
