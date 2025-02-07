// import React, { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown : false,
//     type : "add",
//     data : null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown : false,
//       message : ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown : true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);

//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown : true, data : noteDetails, type : "edit" });
//   };

//   // Get User Info
  
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Delete Note

//   const deleteNote = async (data) => {

//     const noteId = data._id;

//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);

//       if (response.data && !response.data.error) {
//           showToastMessage("Note Deleted Successfully" ,"delete");
//           getAllNotes()
//       }

//   } catch (error) {
//       if (
//           error.response && 
//           error.response.data && 
//           error.response.data.message
//       ) {
//         console.log("An unexpected error occurred. Please try again.");
//       } 
//   }
//   };

//   // Search for a Note

//   const onSearchNote = async (query) => {

//     try {
//       const response = await axiosInstance.get("/search-notes", {
//         params : { query },
//       });

//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
    
//   };

//   // Update isPinned

//   const updateIsPinned = async (noteData) => {

//     const noteId = noteData._id;

//     try {
//         const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
//           "isPinned" : !noteData.isPinned
//         });

//         if (response.data && response.data.note) {
//           // showToastMessage("Pinned Successfully");
//           noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//           getAllNotes();
//         }

//     } catch (error) {
//         console.log(error);
//     }
//   };

//   // Handle Clear Search

//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     getAllNotes();
//     getUserInfo();
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

//       <div className='container mx-auto'>
//         {allNotes.length > 0 ? ( <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>

//           {
//           allNotes.map((item, index) => (
//             <NoteCard 
//               key={item._id}
//               title={item.title}
//               date={item.createdOn}
//               content={item.content}
//               tags={item.tags}
//               isPinned={item.isPinned}
//               onEdit={() => {handleEdit(item)}}
//               onDelete={() => {deleteNote(item)}}
//               onPinNote={() => {updateIsPinned(item)}}
//             />
//           ))}
//         </div> 
//         ) : (
//           <EmptyCard 
//             imgScr={ isSearch ? NoDataImg : AddNotesImg} 
//             message={ isSearch 
//                 ? `Oops! No notes matching your search` 
//                 : `Start creating your first note! Click the 'Add' button to 
//                   jot down your thoughts, ideas and reminders. Let's get started!`
//               }
//           />
//         )}
//       </div>

//       <button 
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal 
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes 
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({ 
//               isShown: false, 
//               type: "add", 
//               data: null 
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>
      
//       <Toast 
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };

// export default Home;




// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown : false,
//     type : "add",
//     data : null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown : false,
//       message : ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown : true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);

//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown : true, data : noteDetails, type : "edit" });
//   };

//   // Get User Info
  
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error;

//     }
//   };

//   // Delete Note

//   const deleteNote = async (data) => {

//     const noteId = data._id;

//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);

//       if (response.data && !response.data.error) {
//           showToastMessage("Note Deleted Successfully" ,"delete");
//           getAllNotes()
//       }

//   } catch (error) {
//       if (
//           error.response && 
//           error.response.data && 
//           error.response.data.message
//       ) {
//         console.log("An unexpected error occurred. Please try again.");
//       } 
//   }
//   };

//   // Search for a Note

//   const onSearchNote = async (query) => {

//     try {
//       const response = await axiosInstance.get("/search-notes", {
//         params : { query },
//       });

//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
    
//   };

//   // Update isPinned

//   const updateIsPinned = async (noteData) => {

//     const noteId = noteData._id;

//     try {
//         const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
//           "isPinned" : !noteData.isPinned
//         });

//         if (response.data && response.data.note) {
//           // showToastMessage("Pinned Successfully");
//           noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//           getAllNotes();
//         }

//     } catch (error) {
//         console.log(error);
//     }
//   };

//   // Handle Clear Search

//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     getAllNotes();
//     getUserInfo();
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

//       <div className='container mx-auto'>
//         {allNotes.length > 0 ? ( <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>

//           {
//           allNotes.map((item) => (
//             <NoteCard 
//               key={item._id}
//               title={item.title}
//               date={item.createdOn}
//               content={item.content}
//               tags={item.tags}
//               isPinned={item.isPinned}
//               onEdit={() => {handleEdit(item)}}
//               onDelete={() => {deleteNote(item)}}
//               onPinNote={() => {updateIsPinned(item)}}
//             />
//           ))}
//         </div> 
//         ) : (
//           <EmptyCard 
//             imgScr={ isSearch ? NoDataImg : AddNotesImg} 
//             message={ isSearch 
//                 ? `Oops! No notes matching your search` 
//                 : `Start creating your first note! Click the 'Add' button to 
//                   jot down your thoughts, ideas and reminders. Let's get started!`
//               }
//           />
//         )}
//       </div>

//       <button 
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal 
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes 
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({ 
//               isShown: false, 
//               type: "add", 
//               data: null 
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>
      
//       <Toast 
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown : false,
//     type : "add",
//     data : null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown : false,
//       message : ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown : true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown : true, data : noteDetails, type : "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully" ,"delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params : { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned" : !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='container mx-auto'>
//         {allNotes.length > 0 ? ( <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>
//           { allNotes.map((item) => (
//             <NoteCard key={item._id}
//               title={item.title}
//               date={item.createdOn}
//               content={item.content}
//               tags={item.tags}
//               isPinned={item.isPinned}
//               onEdit={() => {handleEdit(item)}}
//               onDelete={() => {deleteNote(item)}}
//               onPinNote={() => {updateIsPinned(item)}}
//             />
//           ))}
//         </div> 
//         ) : (
//           <EmptyCard 
//             imgScr={ isSearch ? NoDataImg : AddNotesImg} 
//             message={ isSearch 
//                 ? `Oops! No notes matching your search` 
//                 : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//               }
//           />
//         )}
//       </div>
//       <button 
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal 
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes 
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({ 
//               isShown: false, 
//               type: "add", 
//               data: null 
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>
      
//       <Toast 
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };

// export default Home;


// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component
// import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown : false,
//     type : "add",
//     data : null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown : false,
//       message : ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown : true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown : true, data : noteDetails, type : "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully" ,"delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params : { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned" : !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button 
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => {}}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       {/* Social Media Links and Copyright Notice */}
//       <footer className='text-center py-4 mt-auto'>
//         <div className='flex justify-center items-center mb-2'>
//           <a href='https://www.linkedin.com/in/your-profile' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-4xl hover:text-blue-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;




// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component
// import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Import LinkedIn, GitHub, and Email icons

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     type: "add",
//     data: null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params: { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => { }}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       {/* Social Media Links and Copyright Notice */}
//       <footer className='text-center py-4 mt-auto'>
//         <div className='flex justify-center items-center mb-2 space-x-4'>
//           <a href='https://www.linkedin.com/in/your-profile' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-4xl hover:text-blue-800 transition duration-300' />
//           </a>
//           <a href='https://github.com/your-profile' target='_blank' rel='noopener noreferrer'>
//             <FaGithub className='text-gray-700 text-4xl hover:text-gray-800 transition duration-300' />
//           </a>
//           <a href='mailto:your-email@gmail.com' target='_blank' rel='noopener noreferrer'>
//             <FaEnvelope className='text-red-700 text-4xl hover:text-red-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;




// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component
// import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Import LinkedIn, GitHub, and Email icons

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     type: "add",
//     data: null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params: { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button
//         className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-20'
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => { }}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-5/12 min-w-64 max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       {/* Social Media Links and Copyright Notice */}
//       <footer className='text-center py-4 mt-auto'>
//         <div className='flex justify-center items-center mb-2 space-x-4'>
//           <a href='https://www.linkedin.com/in/Vasanthamohan-R' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//           <a href='https://github.com/Vasanth-192121' target='_blank' rel='noopener noreferrer'>
//             <FaGithub className='text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300' />
//           </a>
//           <a href='mailto:vasanth27092002@gmail.com' target='_blank' rel='noopener noreferrer'>
//             <FaEnvelope className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component
// import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Import LinkedIn, GitHub, and Email icons

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     type: "add",
//     data: null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params: { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-4 mt-8'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button
//         className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 md:right-10 bottom-20 md:bottom-20'
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[24px] md:text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => { }}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-10/12 md:w-5/12 min-w-64 max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       {/* Social Media Links and Copyright Notice */}
//       <footer className='text-center py-4 mt-auto'>
//         <div className='flex justify-center items-center mb-2 space-x-4'>
//           <a href='https://www.linkedin.com/in/Vasanthamohan-R' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//           <a href='https://github.com/Vasanth-192121' target='_blank' rel='noopener noreferrer'>
//             <FaGithub className='text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300' />
//           </a>
//           <a href='mailto:vasanth27092002@gmail.com' target='_blank' rel='noopener noreferrer'>
//             <FaEnvelope className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader';  // Import the Loader component
// import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Import LinkedIn, GitHub, and Email icons

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     type: "add",
//     data: null
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: ""
//     });
//   }

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Add loading state
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       console.log('User Info Response:', response);
  
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       console.log('Error fetching user info:', error);
//       if (error.response) {
//         console.log('Response Data:', error.response.data);
//         console.log('Response Status:', error.response.status);
//       }
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };
  

//   // Get All Notes
//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Delete Note
//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes()
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//       return error
//     }
//   };

//   // Search for a Note
//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params: { query }, });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update isPinned
//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Handle Clear Search
//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className={`flex flex-col min-h-svh ${allNotes.length > 0 ? 'bg-hero-pattern bg-no-repeat bg-center bg-cover' : 'bg-white'} h-screen w-screen`}>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-3 mt-10'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button
//         className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 md:right-10 bottom-24 md:bottom-24'
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[24px] md:text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => { }}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-10/12 md:w-5/12 min-w-64 max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       {/* Social Media Links and Copyright Notice */}
//       <footer className='text-center py-4 mt-auto bg-slate-50 rounded-xl'>
//         <div className='flex justify-center items-center mb-2 space-x-4'>
//           <a href='https://www.linkedin.com/in/Vasanthamohan-R' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//           <a href='https://github.com/Vasanth-192121' target='_blank' rel='noopener noreferrer'>
//             <FaGithub className='text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300' />
//           </a>
//           <a href='mailto:vasanth27092002@gmail.com' target='_blank' rel='noopener noreferrer'>
//             <FaEnvelope className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import Navbar from "../components/Navbar";
// import NoteCard from '../components/NoteCard';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from './AddEditNotes';
// import Modal from "react-modal";
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import EmptyCard from '../components/EmptyCard';
// import AddNotesImg from '../../src/assets/add-notes.svg';
// import NoDataImg from "../../src/assets/no-data.svg";
// import Loader from '../animations/userInfoLoader'; 
// import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// const Home = () => {
//   const [openAddEditModel, setOpenAddEditModel] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const [showToastMsg, setShowToastMsg] = useState({
//     isShown: false,
//     type: "add",
//     message: ""
//   });

//   const handleCloseToast = () => {
//     setShowToastMsg({
//       isShown: false,
//       message: ""
//     });
//   };

//   const showToastMessage = (message, type) => {
//     setShowToastMsg({
//       isShown: true,
//       message,
//       type
//     });
//   };

//   const [userInfo, setUserInfo] = useState(null);
//   const [allNotes, setAllNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSearch, setIsSearch] = useState(false);

//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
//   };

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get("/get-user");
//       // console.log('User Info Response:', response);

//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       console.log('Error fetching user info:', error);
//       if (error.response) {
//         console.log('Response Data:', error.response.data);
//         console.log('Response Status:', error.response.status);
//       }
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }
//     }
//   };

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get("/get-all-notes");

//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   const deleteNote = async (data) => {
//     const noteId = data._id;
//     try {
//       const response = await axiosInstance.delete("/delete-note/" + noteId);
//       if (response.data && !response.data.error) {
//         showToastMessage("Note Deleted Successfully", "delete");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log("An unexpected error occurred. Please try again.");
//     }
//   };

//   const onSearchNote = async (query) => {
//     try {
//       const response = await axiosInstance.get("/search-notes", { params: { query } });
//       if (response.data && response.data.notes) {
//         setIsSearch(true);
//         setAllNotes(response.data.notes);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateIsPinned = async (noteData) => {
//     const noteId = noteData._id;
//     try {
//       const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
//       if (response.data && response.data.note) {
//         noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
//         getAllNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClearSearch = () => {
//     setIsSearch(false);
//     getAllNotes();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       await getAllNotes();
//       await getUserInfo();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className={`flex flex-col min-h-svh ${allNotes.length > 0 ? 'bg-hero-pattern bg-no-repeat bg-center bg-cover' : 'bg-slate-300'} h-svh w-screen`}>
//       <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
//       <div className='flex-grow container mx-auto'>
//         {allNotes.length > 0 ? (
//           <div className='grid grid-cols-2 xs:grid-cols-3 gap-3 mt-10'>
//             {allNotes.map((item) => (
//               <NoteCard key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => { handleEdit(item) }}
//                 onDelete={() => { deleteNote(item) }}
//                 onPinNote={() => { updateIsPinned(item) }}
//               />
//             ))}
//           </div>
//         ) : (
//           <EmptyCard
//             imgScr={isSearch ? NoDataImg : AddNotesImg}
//             message={isSearch
//               ? `Oops! No notes matching your search`
//               : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
//             }
//           />
//         )}
//       </div>
//       <button
//         className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 md:right-10 bottom-24 md:bottom-24'
//         onClick={() => {
//           setOpenAddEditModel({
//             isShown: true,
//             type: "add",
//             data: null
//           });
//         }}
//       >
//         <MdAdd className='text-[24px] md:text-[32px] text-white' />
//       </button>

//       <Modal
//         isOpen={openAddEditModel.isShown}
//         onRequestClose={() => { }}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.2)",
//           },
//         }}
//         contentLabel=''
//         className="w-10/12 md:w-5/12 min-w-64 max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-visible"
//       >
//         <AddEditNotes
//           type={openAddEditModel.type}
//           noteData={openAddEditModel.data}
//           onClose={() => {
//             setOpenAddEditModel({
//               isShown: false,
//               type: "add",
//               data: null
//             });
//           }}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>

//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />

//       <footer className={`text-center py-4 mt-auto bg-slate-200 rounded-xl shadow-custom-top-right ${allNotes.length > 0 ? 'bg-opacity-100' : 'bg-opacity-20'}`}>
//         <div className='flex justify-center items-center mb-2 space-x-4'>
//           <a href='https://www.linkedin.com/in/Vasanthamohan-R' target='_blank' rel='noopener noreferrer'>
//             <FaLinkedin className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//           <a href='https://github.com/Vasanth-192121' target='_blank' rel='noopener noreferrer'>
//             <FaGithub className='text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300' />
//           </a>
//           <a href='mailto:vasanth27092002@gmail.com' target='_blank' rel='noopener noreferrer'>
//             <FaEnvelope className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
//           </a>
//         </div>
//         <p className='text-sm text-gray-500'>
//           &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



import { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import Toast from '../components/Toast';
import EmptyCard from '../components/EmptyCard';
import AddNotesImg from '../../src/assets/add-notes.svg';
import NoDataImg from "../../src/assets/no-data.svg";
import Loader from '../animations/userInfoLoader'; 
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import backgroundImage from '../../src/assets/bg-image.webp'; // Assuming public folder is at '../../src/assets'
import bgImage from '../../src/assets/bg-image.webp';

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: ""
  });

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
      if (error.response) {
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
      }
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", { params: { query } });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, { "isPinned": !noteData.isPinned });
      if (response.data && response.data.note) {
        noteData.isPinned ? showToastMessage("Unpinned Successfully") : showToastMessage("Pinned Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getAllNotes();
      await getUserInfo();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = bgImage; // Using the imported path
        // img.src = '/bg-image.webp'; // Path relative to the public folder
        img.onload = () => {
          // console.log('Image loaded:', img.src);
          if (containerRef.current) { // Null check
            containerRef.current.style.backgroundImage = `url(${img.src})`;
          }
        };
        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
        observer.disconnect();
      }
    }, { threshold: 0.1 });
  
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
    );
  }

  return (
    <div
    ref={containerRef}
      className={`flex flex-col min-h-svh ${allNotes.length > 0 ? 'bg-no-repeat bg-center bg-cover' : 'bg-slate-100'} h-svh w-screen`}
        style={allNotes.length > 0 ? { backgroundImage: `url(${backgroundImage})` } : {}}
      >
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='flex-grow container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-2 xs:grid-cols-3 gap-3 mt-10'>
            {allNotes.map((item) => (
              <NoteCard key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => { handleEdit(item) }}
                onDelete={() => { deleteNote(item) }}
                onPinNote={() => { updateIsPinned(item) }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgScr={isSearch ? NoDataImg : AddNotesImg}
            message={isSearch
              ? `Oops! No notes matching your search`
              : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!`
            }
          />
        )}
      </div>
      <button
        className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-5 md:right-10 bottom-24 md:bottom-28'
        onClick={() => {
          setOpenAddEditModel({
            isShown: true,
            type: "add",
            data: null
          });
        }}
      >
        <MdAdd className='text-[24px] md:text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=''
        className="w-10/12 md:w-5/12 min-w-64 max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-visible"
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({
              isShown: false,
              type: "add",
              data: null
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

      <footer className={`text-center py-4 mt-auto bg-slate-200 rounded-xl shadow-custom-top-right ${allNotes.length > 0 ? 'bg-opacity-100' : 'bg-opacity-20'}`}>
        <div className='flex justify-center items-center mb-2 space-x-4'>
          <a href='https://www.linkedin.com/in/Vasanthamohan-R' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
          </a>
          <a href='https://github.com/Vasanth-192121' target='_blank' rel='noopener noreferrer'>
            <FaGithub className='text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300' />
          </a>
          <a href='mailto:vasanth27092002@gmail.com' target='_blank' rel='noopener noreferrer'>
            <FaEnvelope className='text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300' />
          </a>
        </div>
        <p className='text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
