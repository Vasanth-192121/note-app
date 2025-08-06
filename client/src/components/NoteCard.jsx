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



// import React, { useState } from 'react';
// import moment from 'moment';
// import { MdOutlinePushPin, MdCreate, MdDelete, MdClose } from "react-icons/md";

// const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div 
//       className='border rounded-xl p-4 bg-slate-100 hover:shadow-xl transition-all ease-in-out cursor-pointer' 
//       onClick={handleToggleOpen}
//     >
//       <div className='flex items-center justify-between'>
//         <div>
//           <h6 className='text-sm font-medium'>{title}</h6>
//           <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
//         </div>

//         <MdOutlinePushPin 
//           className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`} 
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent click event from bubbling up
//             onPinNote();
//           }} 
//         />
//       </div>

//       <div className={`mt-2 text-xs text-slate-600 ${isOpen ? 'max-h-96 overflow-auto' : 'max-h-12 overflow-hidden'} transition-all ease-in-out`}>
//         {content}
//       </div>

//       <div className='flex items-center justify-between mt-2'>
//         <div className='text-xs text-slate-500'> {tags.map((item) => `#${item} `)} </div>

//         <div className='flex items-center gap-2'>
//           <MdCreate 
//             className='icon-btn hover:text-green-600 text-slate-400'
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent click event from bubbling up
//               onEdit();
//             }}
//           />
//           <MdDelete 
//             className='icon-btn hover:text-red-500 text-slate-400'
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent click event from bubbling up
//               onDelete();
//             }}
//           />
//           {/* {isOpen && (
//             <MdClose 
//               className='icon-btn hover:text-red-500'
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent click event from bubbling up
//                 handleToggleOpen();
//               }}
//             />
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;


// import React, { useState } from 'react';
// import moment from 'moment';
// import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

// const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
//     const [isOpen, setIsOpen] = useState(false);
    
//     // Check if content is longer than a certain number of lines or characters
//     const isContentLong = content.split('\n').length > 7 || content.length > 200;

//     const handleToggleOpen = () => {
//         if (isContentLong) {
//             setIsOpen(!isOpen);
//         }
//     };
    
//     const handleActionClick = (e) => {
//         e.stopPropagation();
//     };

//     return (
//         <div
//             className='relative border rounded-xl p-4 bg-slate-100 hover:shadow-xl transition-all ease-in-out cursor-pointer'
//             onClick={handleToggleOpen}
//         >
//             <div className='flex items-center justify-between mb-2'>
//                 <div>
//                     <h6 className='text-sm font-medium w-40'>{title}</h6>
//                     <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
//                 </div>
//                 <MdOutlinePushPin
//                     className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`}
//                     onClick={(e) => {
//                         handleActionClick(e);
//                         onPinNote();
//                     }}
//                 />
//             </div>

//             <div 
//                 className={`text-xs text-slate-600 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-full' : 'line-clamp-5'}`}
//             >
//                 {content}
//             </div>
            
//             {isContentLong && (
//                 <div 
//                     className={`text-center mt-2 cursor-pointer text-primary text-sm font-medium`}
//                     onClick={(e) => {
//                         handleActionClick(e);
//                         handleToggleOpen();
//                     }}
//                 >
//                     {isOpen ? 'Read Less' : 'Read More'}
//                 </div>
//             )}
            
//             <div className='flex items-center justify-between mt-2 pt-2 border-t border-slate-200'>
//                 <div className='text-xs text-slate-500 truncate pr-4'>{tags.map((item) => `#${item} `)}</div>
//                 <div className='flex items-center gap-2'>
//                     <MdCreate
//                         className='icon-btn hover:text-green-600 text-slate-400'
//                         onClick={(e) => {
//                             handleActionClick(e);
//                             onEdit();
//                         }}
//                     />
//                     <MdDelete
//                         className='icon-btn hover:text-red-500 text-slate-400'
//                         onClick={(e) => {
//                             handleActionClick(e);
//                             onDelete();
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NoteCard;


// import React, { useState } from 'react';
// import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
// import moment from 'moment';

// const NoteCard = ({
//     title,
//     date,
//     content,
//     tags,
//     isPinned,
//     onEdit,
//     onDelete,
//     onPinNote,
//     onReadMore,
// }) => {
//     // Truncate content for a cleaner look on the card list, but allow reading more in a modal
//     const truncatedContent = content.length > 150 ? content.slice(0, 150) + '...' : content;
//     const showReadMore = content.length > 150;

//     return (
//         <div className="relative border rounded-lg p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between h-full">
//             <div className="flex-grow">
//                 {/* Header Section */}
//                 <div className="flex items-center justify-between mb-2">
//                     <h6 className="text-base md:text-lg font-semibold text-slate-900 line-clamp-2">{title}</h6>
//                     <MdOutlinePushPin
//                         className={`icon-btn w-6 h-6 flex-shrink-0 ${isPinned ? 'text-blue-500' : 'text-slate-300'} hover:text-blue-600 transition-colors cursor-pointer`}
//                         onClick={onPinNote}
//                         title={isPinned ? "Unpin Note" : "Pin Note"}
//                     />
//                 </div>
//                 <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>

//                 {/* Content Section */}
//                 <p className="text-sm text-slate-600 mt-4 mb-2 whitespace-pre-wrap">
//                     {truncatedContent}
//                 </p>

//                 {/* "Read more" link for long content */}
//                 {showReadMore && (
//                     <button
//                         className="text-xs text-blue-600 hover:underline font-medium mb-4"
//                         onClick={onReadMore}
//                     >
//                         Read more
//                     </button>
//                 )}
//             </div>

//             {/* Footer Section with tags and actions */}
//             <div className="mt-auto pt-4 border-t border-gray-200">
//                 <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-4 min-h-[1.5rem]">
//                     {tags.length > 0 && tags.map((item, index) => (
//                         <span key={index} className="bg-gray-100 px-2 py-1 rounded-full">#{item}</span>
//                     ))}
//                 </div>
//                 <div className="flex items-center justify-end gap-2">
//                     <MdCreate
//                         className="icon-btn text-lg text-slate-500 hover:text-green-600 transition-colors cursor-pointer"
//                         onClick={onEdit}
//                         title="Edit Note"
//                     />
//                     <MdDelete
//                         className="icon-btn text-lg text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
//                         onClick={onDelete}
//                         title="Delete Note"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NoteCard;



import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
    onReadMore,
}) => {
    // Truncate content for a cleaner look on the card list, but allow reading more in a modal
    const truncatedContent = content.length > 150 ? content.slice(0, 150) + '...' : content;
    const showReadMore = content.length > 150;

    return (
        <div className="relative border rounded-lg p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between h-full">
            <div className="flex-grow">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-2">
                    <h6 className="text-base md:text-lg font-semibold text-slate-900 line-clamp-2">{title}</h6>
                    <MdOutlinePushPin
                        className={`icon-btn w-6 h-6 flex-shrink-0 ${isPinned ? 'text-blue-500' : 'text-slate-300'} hover:text-blue-600 transition-colors cursor-pointer`}
                        onClick={onPinNote}
                        title={isPinned ? "Unpin Note" : "Pin Note"}
                    />
                </div>
                <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>

                {/* Content Section */}
                <p className="text-sm text-slate-600 mt-4 mb-2 whitespace-pre-wrap">
                    {truncatedContent}
                </p>

                {/* "Read more" link for long content */}
                {showReadMore && (
                    <button
                        className="text-xs text-blue-600 hover:underline font-medium mb-4"
                        onClick={onReadMore}
                    >
                        Read more
                    </button>
                )}
            </div>

            {/* Footer Section with tags and actions */}
            <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-4 min-h-[1.5rem]">
                    {tags.length > 0 && tags.map((item, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded-full">#{item}</span>
                    ))}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <MdCreate
                        className="icon-btn text-lg text-slate-500 hover:text-green-600 transition-colors cursor-pointer"
                        onClick={onEdit}
                        title="Edit Note"
                    />
                    <MdDelete
                        className="icon-btn text-lg text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                        onClick={onDelete}
                        title="Delete Note"
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;