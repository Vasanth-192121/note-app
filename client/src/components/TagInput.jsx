// import React, { useState } from 'react'
// import { MdAdd, MdClose } from 'react-icons/md'

// const TagInput = ({tags, setTags}) => {

//     const [inputValue, setInputValue] = useState("");

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     }

//     const addNewTag = () => {
//         if(inputValue.trim() !== "") {
//             setTags([...tags, inputValue.trim()]);
//             setInputValue("");
//         }
//     }

//     const handleKeyDown = (e) => {
//         if(e.key === "Enter") {
//             addNewTag();
//         }
//     }

//     const handleRemoveTag = (tagToRemove) => {
//         setTags(tags.filter((tag) => tag !== tagToRemove))
//     }

//   return (
//     <div>
//         {tags?.length > 0 && (
//         <div className='flex items-center gap-2 flex-wrap mt-2'>
//             {tags.map((tag, index) => (
//                 <span
//                     key={index}
//                     className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'
//                 >
//                     # {tag}

//                     <button onClick={() => {handleRemoveTag(tag)}}>
//                         <MdClose />
//                     </button>
//                 </span>
//             ))}
//         </div>)}

//         <div className='flex items-center gap-4 mt-3'>
//         <input
//             type="text"
//             className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
//             placeholder='Add tags'
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             value={inputValue}
//         />

//         <button
//             className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
//             onClick={() => {
//                 addNewTag();
//             }}
//         >
//                 <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
//         </button>
//         </div>
//     </div>
//   )
// }

// export default TagInput

// import React, { useState } from 'react'
// import { MdAdd, MdClose } from 'react-icons/md'

// const TagInput = ({tags, setTags}) => {

//     const [inputValue, setInputValue] = useState("");

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     }

//     const addNewTag = () => {
//         if(inputValue.trim() !== "") {
//             setTags([...tags, inputValue.trim()]);
//             setInputValue("");
//         }
//     }

//     const handleKeyDown = (e) => {
//         if(e.key === "Enter") {
//             addNewTag();
//         }
//     }

//     const handleRemoveTag = (tagToRemove) => {
//         setTags(tags.filter((tag) => tag !== tagToRemove))
//     }

//   return (
//     <div>
//         {tags?.length > 0 && (
//         <div className='flex items-center gap-2 flex-wrap mt-2'>
//             {tags.map((tag, index) => (
//                 <span
//                     key={index}
//                     className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'
//                 >
//                     # {tag}

//                     <button onClick={() => {handleRemoveTag(tag)}}>
//                         <MdClose />
//                     </button>
//                 </span>
//             ))}
//         </div>)}

//         <div className='flex items-center gap-4 mt-3'>
//         <input
//             type="text"
//             className='text-sm bg-transparent border px-3 py-2 rounded outline-none w-32 xs:w-52'
//             placeholder='Add tags'
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             value={inputValue}
//         />

//         <button
//             className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
//             onClick={() => {
//                 addNewTag();
//             }}
//         >
//                 <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
//         </button>
//         </div>
//     </div>
//   )
// }

// export default TagInput

import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md"; // Changed icon import

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    // Ensure tag count does not exceed 5
    if (
      inputValue.trim() !== "" &&
      !tags.some(
        (tag) => tag.toLowerCase() === inputValue.trim().toLowerCase()
      ) &&
      tags.length < 5
    ) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addNewTag();
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 w-full max-w-full overflow-hidden">
      <input
        type="text"
        className="flex-grow min-w-0 text-base bg-gray-100 p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Add tags"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-blue-600 transition-colors duration-300 flex-shrink-0 shadow-md"
        onClick={addNewTag}
        aria-label="Add tag"
      >
        <MdAddCircleOutline className="text-2xl" />
      </button>
    </div>
  );
};

export default TagInput;
