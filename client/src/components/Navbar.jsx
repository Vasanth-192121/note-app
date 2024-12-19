// import React, { useState } from 'react';
// import ProfileInfo from './ProfileInfo';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   }

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
//         <h2 className='text-xl font-medium text-black py-2'>
//             Notes
//         </h2>

//       <SearchBar
//         value={searchQuery}
//         onChange={({ target }) => {
//           setSearchQuery(target.value);
//         }}

//         handleSearch={handleSearch}
//         onClearSearch={onClearSearch}
//       />
        
//       <ProfileInfo 
//         userInfo={userInfo}
//         onLogOut={onLogout}
//       />

//     </div>
//   );
// }

// export default Navbar;



// import React, { useState } from 'react';
// import ProfileInfo from './ProfileInfo';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   }

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   return (
//     <div className='bg-white flex items-center gap-[8%] md:gap-[20%] lg:gap-[25%] xl:gap-[30%] px-6 py-2 drop-shadow'>
//         <h2 className='text-xl font-medium text-black py-2'>
//             Notes
//         </h2>

//       {userInfo && ( <SearchBar 
//           value={searchQuery} 
//           onChange={({ target }) => { setSearchQuery(target.value); }} 
//           handleSearch={handleSearch} 
//           onClearSearch={onClearSearch} 
//         />
//       )}
        
//       <ProfileInfo 
//         userInfo={userInfo}
//         onLogOut={onLogout}
//       />

//     </div>
//   );
// }

// export default Navbar;


// import React, { useState } from 'react';
// import ProfileInfo from './ProfileInfo';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   }

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
//       <h2 className='text-xl font-medium text-black py-2'>
//         Notes
//       </h2>

//       {userInfo ? (
//         <>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             handleSearch={handleSearch} 
//             onClearSearch={onClearSearch} 
//           />
//           <ProfileInfo 
//             userInfo={userInfo}
//             onLogOut={onLogout}
//           />
//         </>
//       ) : (
// // <<<<<<< update-keeper-notes
// //         <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/8826e0d9aa3eea67cad4856fd404f52994134ac6/client/src/assets/keeper-notes-logo.jpeg" alt="App Logo" className='h-8 w-auto' />
// // =======
//         null
// //         <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/8826e0d9aa3eea67cad4856fd404f52994134ac6/client/src/assets/keeper-notes-logo.jpeg" alt="App Logo" className='h-8 w-auto' />
// // >>>>>>> main
//       )}
//     </div>
//   );
// }

// export default Navbar;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { getInitials } from '../utils/Helper';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   }

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-4 py-2 drop-shadow md:px-6 md:py-2'>
//       <h2 className='md:text-xl font-medium text-black py-2'>
//         Keeper Notes
//       </h2>

//       {userInfo ? (
//         <div className='flex items-center justify-between'>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             handleSearch={handleSearch} 
//             onClearSearch={onClearSearch} 
//             className='w-full md:w-64'
//           />
//           <div className='relative ml-4'>
//             <div
//               className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
//               onClick={toggleDropdown}
//             >
//               {getInitials(userInfo.fullName)}
//             </div>
//             {dropdownOpen && (
//               <div className='absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg'>
//                 <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
//                 <button 
//                   className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
//                   onClick={() => {
//                     onLogout();
//                     setDropdownOpen(false); // Close dropdown after logout
//                   }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         null
//       )}
//     </div>
//   );
// }

// export default Navbar;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { getInitials } from '../utils/Helper';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-4 py-2 drop-shadow md:px-6 md:py-2 rounded-xl'>
//       <h2 className='md:text-2xl text-xl font-medium text-black py-2'>
//         Keeper Notes
//       </h2>

//       {userInfo ? (
//         <div className='flex items-center justify-center flex-grow'>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             handleSearch={handleSearch} 
//             onClearSearch={onClearSearch} 
//             className='w-full md:w-64'
//           />
//         </div>
//       ) : null}

//       {userInfo && (
//         <div className='relative ml-4'>
//           <div
//             className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
//             onClick={toggleDropdown}
//           >
//             {getInitials(userInfo.fullName)}
//           </div>
//           {dropdownOpen && (
//             <div className='absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg'>
//               <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
//               <button 
//                 className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
//                 onClick={() => {
//                   onLogout();
//                   setDropdownOpen(false); // Close dropdown after logout
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { getInitials } from '../utils/Helper';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-4 py-2 drop-shadow md:px-6 md:py-2 rounded-xl'>
//       <h2 className='md:text-2xl text-xl font-medium text-black py-2'>
//         Keeper Notes
//       </h2>

//       {userInfo ? (
//         <div className='flex items-center justify-center flex-grow'>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             handleSearch={handleSearch} 
//             onClearSearch={onClearSearch} 
//             className='w-full md:w-64'
//           />
//         </div>
//       ) : null}

//       {userInfo && (
//         <div className='relative ml-4'>
//           <div
//             className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
//             onClick={toggleDropdown}
//           >
//             {getInitials(userInfo.fullName)}
//           </div>
//           {dropdownOpen && (
//             <div className={`absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 pop-up transform ${dropdownOpen ? 'scale-100' : 'scale-0'}`}>
//               <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
//               <button 
//                 className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
//                 onClick={() => {
//                   onLogout();
//                   setDropdownOpen(false); // Close dropdown after logout
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { getInitials } from '../utils/Helper';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className='bg-white flex items-center justify-between px-4 py-2 drop-shadow md:px-6 md:py-2 rounded-xl'>
//       <h2 className='md:text-2xl text-xl font-medium text-black py-2'>
//         Keeper Notes
//       </h2>

//       {userInfo ? (
//         <div className='flex items-center justify-center flex-grow'>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             onSearchNote={onSearchNote} 
//             onClearSearch={onClearSearch} 
//             className='w-full md:w-64'
//           />
//         </div>
//       ) : null}

//       {userInfo && (
//         <div className='relative ml-4'>
//           <div
//             className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
//             onClick={toggleDropdown}
//           >
//             {getInitials(userInfo.fullName)}
//           </div>
//           {dropdownOpen && (
//             <div className={`absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 pop-up transform ${dropdownOpen ? 'scale-100' : 'scale-0'}`}>
//               <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
//               <button 
//                 className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
//                 onClick={() => {
//                   onLogout();
//                   setDropdownOpen(false); // Close dropdown after logout
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;



// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import { getInitials } from '../utils/Helper';

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null); // Ref for the dropdown menu

//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false); // Close the dropdown if clicked outside
//     }
//   };

//   useEffect(() => {
//     // Add event listener for clicks outside the dropdown
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       // Clean up event listener
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className='bg-white bg-opacity-30 flex items-center justify-between px-4 py-2 drop-shadow md:px-6 md:py-2 rounded-xl'>
//       <h2 className='md:text-2xl text-xl font-medium text-black py-2'>
//         Keeper Notes
//       </h2>

//       {userInfo ? (
//         <div className='flex items-center justify-center flex-grow'>
//           <SearchBar 
//             value={searchQuery} 
//             onChange={({ target }) => { setSearchQuery(target.value); }} 
//             onSearchNote={onSearchNote} 
//             onClearSearch={onClearSearch} 
//             className='w-full md:w-64'
//           />
//         </div>
//       ) : null}

//       {userInfo && (
//         <div className='relative ml-4' ref={dropdownRef}>
//           <div
//             className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
//             onClick={toggleDropdown}
//           >
//             {getInitials(userInfo.fullName)}
//           </div>
//           {dropdownOpen && (
//             <div className={`absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 pop-up transform ${dropdownOpen ? 'scale-100' : 'scale-0'}`}>
//               <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
//               <button 
//                 className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
//                 onClick={() => {
//                   onLogout();
//                   setDropdownOpen(false); // Close dropdown after logout
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;




import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { getInitials } from '../utils/Helper';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-slate-300 sm:bg-slate-400 bg-opacity-60 sm:bg-opacity-20 flex items-center justify-between px-4 py-4 shadow-custom-bottom-left md:px-6 md:py-4 sm:rounded-xl'>
      <h2 className='text-2xl font-medium text-black py-2'>
        Keeper Notes
      </h2>

      {userInfo ? (
        <div className='flex items-center justify-center flex-grow'>
          <SearchBar 
            value={searchQuery} 
            onChange={({ target }) => { setSearchQuery(target.value); }} 
            onSearchNote={onSearchNote} 
            onClearSearch={onClearSearch} 
            className='w-full md:w-64'
          />
        </div>
      ) : null}

      {userInfo && (
        <div className='relative ml-4' ref={dropdownRef}>
          <div
            className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
            onClick={toggleDropdown}
          >
            {getInitials(userInfo.fullName)}
          </div>
          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-36 py-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 pop-up transform ${dropdownOpen ? 'scale-100' : 'scale-0'}`}>
              <p className='px-4 py-4 text-sm font-medium text-black'>{userInfo.fullName}</p>
              <button 
                className='w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100'
                onClick={() => {
                  onLogout();
                  setDropdownOpen(false); // Close dropdown after logout
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
