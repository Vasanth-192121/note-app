// import React from 'react';
// import {FaMagnifyingGlass} from "react-icons/fa6";
// import {IoMdClose} from "react-icons/io";

// const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {

//   return (
//     <div className='w-80 flex items-center px-4 bg-slate-100 rounded-xl'>   
//         <input 
//             type="text"
//             placeholder='Search Notes'
//             className='w-full text-xs bg-transparent py-[11px] outline-none'
//             value={value}
//             onChange={onChange}
//         />

//         {value && (
//             <IoMdClose
//                 className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
//                 onClick={onClearSearch}
//             />
//         )}

//         <FaMagnifyingGlass
//             className='text-slate-400 cursor-pointer hover:text-black'
//             onClick={handleSearch}
//         />

//     </div>
//   )
// }

// export default SearchBar

// import React from 'react';
// import {FaMagnifyingGlass} from "react-icons/fa6";
// import {IoMdClose} from "react-icons/io";

// const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {

//   return (
//     <div className='w-40 xs:w-80 flex items-center px-4 bg-slate-100 rounded-xl'>   
//         <input 
//             type="text"
//             placeholder='Search Notes'
//             className='w-full text-xs bg-transparent py-[11px] outline-none'
//             value={value}
//             onChange={onChange}
//         />

//         {value && (
//             <IoMdClose
//                 className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
//                 onClick={onClearSearch}
//             />
//         )}

//         <FaMagnifyingGlass
//             className='text-slate-400 cursor-pointer hover:text-black'
//             onClick={handleSearch}
//         />

//     </div>
//   )
// }

// export default SearchBar

import React, { useState, useEffect, useRef } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const [placeholder, setPlaceholder] = useState('Search');
  const inputRef = useRef(null);

  useEffect(() => {
    const updatePlaceholder = () => {
      if (inputRef.current) {
        const width = inputRef.current.offsetWidth * window.devicePixelRatio;
        if (width > 400) {
          setPlaceholder('Search Notes');
        } else {
          setPlaceholder('Search');
        }
      }
    };

    updatePlaceholder();

    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  return (
    <div className='w-40 xs:w-80 flex items-center px-4 bg-slate-100 rounded-xl'>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className='text-slate-400 cursor-pointer hover:text-black'
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

    };
  }, []);

  return (
    <div className='w-40 xs:w-80 flex items-center px-4 bg-slate-100 rounded-xl'>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3'
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className='text-slate-400 cursor-pointer hover:text-black'
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

