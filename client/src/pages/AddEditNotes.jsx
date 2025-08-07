// import React, { useState } from 'react'
// import TagInput from '../components/TagInput'
// import { MdClose } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';

// const AddEditNotes = ({noteData, type, getAllNotes, onClose, showToastMessage}) => {

//     const [title, setTitle] = useState( noteData?.title || "" );
//     const [content, setContent] = useState( noteData?.content || "" );
//     const [tags, setTags] = useState( noteData?.tags || [] );

//     const [error, setError] = useState(null);

//     // Add Note

//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully")
//                 getAllNotes()
//                 onClose()
//             }

//         } catch (error) {
//             if (
//                 error.response && 
//                 error.response.data && 
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             } 
//         }
//     };

//     // Edit Note

//     const editNote = async () => {

//         const noteId = noteData._id;

//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully")
//                 getAllNotes()
//                 onClose()
//             }

//         } catch (error) {
//             if (
//                 error.response && 
//                 error.response.data && 
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             } 
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }

//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }

//         setError("");

//         if(type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     }

//   return (
//     <div className='relative'>
//         <button 
//             className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
//             onClick={onClose}
//         >
//             <MdClose 
//                 className='text-xl text-slate-400 '
//             />
//         </button>
//         <div className='flex flex-col gap-2'>
//             <label className='input-lable'>TITLE</label>

//             <input 
//                 type="text"
//                 className='text-2xl text-slate-950 outline-none'
//                 placeholder='Go to gym at 5pm' 
//                 value={title}
//                 onChange={({target}) => setTitle(target.value)}
//             />
//         </div>
 
//         <div className='flex flex-col gap-2 mt-4'>
//             <label className='input-lable'>CONTENT</label>
//             <textarea 
//                 type="text"
//                 className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
//                 placeholder='Content'
//                 rows={10}
//                 value={content}
//                 onChange={({target}) => setContent(target.value)}
//             />
//         </div>
//             <div className='mt-3'>
//                 <label className='input-lable'>
//                     TAGS
//                 </label>

//                 <TagInput 
//                     tags={tags}
//                     setTags={setTags}
//                 />

//             </div>
            
//             {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

//             <button 
//                 className='btn-primary font-medium mt-5 p-3' 
//                 onClick={handleAddNote}
//             >
//                 { type === "edit" ? "UPDATE" : "ADD" }
//             </button>
//     </div>
//   )
// }

// export default AddEditNotes

// import React, { useState } from 'react'
// import TagInput from '../components/TagInput'
// import { MdClose } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';

// const AddEditNotes = ({noteData, type, getAllNotes, onClose, showToastMessage}) => {

//     const [title, setTitle] = useState( noteData?.title || "" );
//     const [content, setContent] = useState( noteData?.content || "" );
//     const [tags, setTags] = useState( noteData?.tags || [] );

//     const [error, setError] = useState(null);

//     // Add Note

//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully")
//                 getAllNotes()
//                 onClose()
//             }

//         } catch (error) {
//             if (
//                 error.response && 
//                 error.response.data && 
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             } 
//         }
//     };

//     // Edit Note

//     const editNote = async () => {

//         const noteId = noteData._id;

//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully")
//                 getAllNotes()
//                 onClose()
//             }

//         } catch (error) {
//             if (
//                 error.response && 
//                 error.response.data && 
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             } 
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }

//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }

//         setError("");

//         if(type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     }

//   return (
//     <div className='relative'>
//         <button 
//             className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
//             onClick={onClose}
//         >
//             <MdClose 
//                 className='text-xl text-slate-400 '
//             />
//         </button>
//         <div className='flex flex-col gap-2'>
//             <label className='input-lable'>TITLE</label>

//             <input 
//                 type="text"
//                 className='text-xs xs:text-2xl text-slate-950 outline-none'
//                 placeholder='Go to gym at 5pm' 
//                 value={title}
//                 onChange={({target}) => setTitle(target.value)}
//             />
//         </div>
 
//         <div className='flex flex-col gap-2 mt-4'>
//             <label className='input-lable'>CONTENT</label>
//             <textarea 
//                 type="text"
//                 className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
//                 placeholder='Content'
//                 rows={10}
//                 value={content}
//                 onChange={({target}) => setContent(target.value)}
//             />
//         </div>
//             <div className='mt-3'>
//                 <label className='input-lable'>
//                     TAGS
//                 </label>

//                 <TagInput 
//                     tags={tags}
//                     setTags={setTags}
//                 />

//             </div>
            
//             {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

//             <button 
//                 className='btn-primary font-medium mt-5 p-3' 
//                 onClick={handleAddNote}
//             >
//                 { type === "edit" ? "UPDATE" : "ADD" }
//             </button>
//     </div>
//   )
// }

// export default AddEditNotes


// import React, { useState } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../index.css'; // Make sure to import the CSS file where the animation is defined

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {

//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);

//     const [error, setError] = useState(null);

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }

//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;

//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }

//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }

//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }

//         setError("");

//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto transition-all duration-500 transform pop-up">
//             <button 
//                 className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-5 -right-5 bg-gray-200 hover:bg-gray-300 transition duration-300"
//                 onClick={onClose}
//             >
//                 <MdClose className="text-xl text-red-600" />
//             </button>
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">{type === "edit" ? "Edit Note" : "Add New Note"}</h2>
//             <div className="flex flex-col gap-4">
//                 <label className="text-lg font-medium text-gray-600">Title</label>
//                 <input 
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Go to gym at 5pm"
//                     value={title}
//                     onChange={({ target }) => setTitle(target.value)}
//                 />
//             </div>
//             <div className="flex flex-col gap-4 mt-4">
//                 <label className="text-lg font-medium text-gray-600">Content</label>
//                 <textarea 
//                     className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Content"
//                     value={content}
//                     onChange={({ target }) => setContent(target.value)}
//                 />
//             </div>
//             <div className="mt-4">
//                 <label className="text-lg font-medium text-gray-600">Tags</label>
//                 <TagInput 
//                     tags={tags}
//                     setTags={setTags}
//                 />
//             </div>
//             {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
//             <button 
//                 className="w-full bg-blue-500 text-white p-3 rounded-lg mt-6 hover:bg-blue-600 transition-all"
//                 onClick={handleAddNote}
//             >
//                 {type === "edit" ? "Update" : "Add"}
//             </button>
//         </div>
//     );
// };

// export default AddEditNotes;



// import React, { useState } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../index.css'; // Make sure to import the CSS file where the animation is defined

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {

//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);

//     const [error, setError] = useState(null);

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }

//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;

//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags
//             });

//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }

//         } catch (error) {
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }

//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }

//         setError("");

//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         <div className="relative bg-white p-4 md:p-8 rounded-xl shadow-lg max-w-md md:max-w-lg mx-auto transition-all duration-500 transform pop-up">
//             <button 
//                 className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300 transition duration-300"
//                 onClick={onClose}
//             >
//                 <MdClose className="text-xl text-red-600" />
//             </button>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{type === "edit" ? "Edit Note" : "Add New Note"}</h2>
//             <div className="flex flex-col gap-2 md:gap-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Title</label>
//                 <input 
//                     type="text"
//                     className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Go to gym at 5pm"
//                     value={title}
//                     onChange={({ target }) => setTitle(target.value)}
//                 />
//             </div>
//             <div className="flex flex-col gap-2 md:gap-4 mt-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Content</label>
//                 <textarea 
//                     className="w-full p-2 md:p-3 border border-gray-300 rounded-lg h-32 md:h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Content"
//                     value={content}
//                     onChange={({ target }) => setContent(target.value)}
//                 />
//             </div>
//             <div className="mt-3 md:mt-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Tags</label>
//                 <TagInput 
//                     tags={tags}
//                     setTags={setTags}
//                 />
//             </div>
//             {error && <p className="text-red-500 text-sm md:text-base mt-3 md:mt-4">{error}</p>}
//             <button 
//                 className="w-full bg-blue-500 text-white p-2 md:p-3 rounded-lg mt-5 md:mt-6 hover:bg-blue-600 transition-all"
//                 onClick={handleAddNote}
//             >
//                 {type === "edit" ? "Update" : "Add"}
//             </button>
//         </div>
//     );
// };

// export default AddEditNotes;



// import React, { useState } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import '../index.css'; // Make sure to import the CSS file where the animation is defined

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);
//     const [error, setError] = useState(null);

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }
//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }
//         setError("");
//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         <div className="relative bg-white p-4 md:p-8 rounded-xl shadow-lg max-w-md md:max-w-lg mx-auto transition-all duration-500 transform pop-up">
//             <button 
//                 className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300 transition duration-300"
//                 onClick={onClose}
//             >
//                 <MdClose className="text-xl text-red-600" />
//             </button>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{type === "edit" ? "Edit Note" : "Add Note"}</h2>
//             <div className="flex flex-col gap-2 md:gap-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Title</label>
//                 <input 
//                     type="text"
//                     className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Go to gym at 5pm"
//                     value={title}
//                     onChange={({ target }) => setTitle(target.value)}
//                 />
//             </div>
//             <div className="flex flex-col gap-2 md:gap-4 mt-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Content</label>
//                 <textarea 
//                     className="w-full p-2 md:p-3 border border-gray-300 rounded-lg h-32 md:h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Content"
//                     value={content}
//                     onChange={({ target }) => setContent(target.value)}
//                 />
//             </div>
//             <div className="mt-3 md:mt-4">
//                 <label className="text-sm md:text-lg font-medium text-gray-600">Tags</label>
//                 <TagInput 
//                     tags={tags}
//                     setTags={setTags}
//                 />
//             </div>
//             {error && <p className="text-red-500 text-sm md:text-base mt-3 md:mt-4">{error}</p>}
//             <button 
//                 className="w-full bg-blue-500 text-white p-2 md:p-3 rounded-lg mt-5 md:mt-6 hover:bg-blue-600 transition-all"
//                 onClick={handleAddNote}
//             >
//                 {type === "edit" ? "Update" : "Add"}
//             </button>
//         </div>
//     );
// };

// export default AddEditNotes;

// import React, { useState, useEffect, useCallback } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose, MdTag } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import { useDebounce } from 'use-debounce';
// import '../index.css';

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);
//     const [suggestedTags, setSuggestedTags] = useState([]);
//     const [isSuggesting, setIsSuggesting] = useState(false);
//     const [error, setError] = useState(null);

//     const [debouncedTitle] = useDebounce(title, 1000);
//     const [debouncedContent] = useDebounce(content, 1000);

//     const getSuggestedTags = useCallback(async (text) => {
//         if (!text || text.trim() === '') {
//             setSuggestedTags([]);
//             return;
//         }

//         setIsSuggesting(true);
//         try {
//             const response = await axiosInstance.post("/suggest-tags", { text });
//             if (response.data && response.data.tags) {
//                 // Filter out tags that are already in the user's list
//                 const uniqueTags = response.data.tags.filter(
//                     (tag) => !tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())
//                 );
//                 setSuggestedTags(uniqueTags);
//             }
//         } catch (error) {
//             console.error('Error fetching suggested tags:', error);
//             setSuggestedTags([]);
//         } finally {
//             setIsSuggesting(false);
//         }
//     }, [tags]);

//     useEffect(() => {
//         const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
//         getSuggestedTags(textToAnalyze);
//     }, [debouncedTitle, debouncedContent, getSuggestedTags]);

//     const handleAddSuggestedTag = (tag) => {
//         if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
//             setTags([...tags, tag]);
//             // Remove the added tag from the suggested list
//             setSuggestedTags(suggestedTags.filter((t) => t !== tag));
//         }
//     };

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }
//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }
//         setError("");
//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-lg mx-auto transition-all duration-500 transform scale-100 opacity-100">
//             <button 
//                 className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute -top-4 -right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none"
//                 onClick={onClose}
//             >
//                 <MdClose className="text-xl text-red-500" />
//             </button>
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">
//                 {type === "edit" ? "Edit Note" : "Add New Note"}
//             </h2>
//             <div className="flex flex-col gap-4">
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Title</label>
//                     <input 
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         placeholder="e.g., Go to the gym at 5pm"
//                         value={title}
//                         onChange={({ target }) => setTitle(target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Content</label>
//                     <textarea 
//                         className="w-full p-3 border border-gray-300 rounded-lg h-32 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
//                         placeholder="Write your note content here..."
//                         value={content}
//                         onChange={({ target }) => setContent(target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Tags</label>
//                     <TagInput 
//                         tags={tags}
//                         setTags={setTags}
//                     />
//                     {isSuggesting && (
//                         <p className="text-sm text-gray-500 mt-2 flex items-center animate-pulse">
//                             <MdTag className="mr-1" /> Suggesting tags...
//                         </p>
//                     )}
//                     {suggestedTags.length > 0 && (
//                         <div className="mt-4">
//                             <p className="text-sm font-semibold text-gray-700 mb-2">Suggested Tags:</p>
//                             <div className="flex flex-wrap gap-2">
//                                 {suggestedTags.map((tag, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleAddSuggestedTag(tag)}
//                                         className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-blue-200 transition-colors"
//                                     >
//                                         #{tag}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 <button 
//                     className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
//                     onClick={handleAddNote}
//                 >
//                     {type === "edit" ? "Update Note" : "Add Note"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddEditNotes;



// import React, { useState, useEffect, useCallback } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose, MdTag } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import { useDebounce } from 'use-debounce';
// import '../index.css'; // Ensure global styles like blinking-text and custom-scrollbar are available

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);
//     const [suggestedTags, setSuggestedTags] = useState([]);
//     const [isSuggesting, setIsSuggesting] = useState(false);
//     const [error, setError] = useState(null);

//     const [debouncedTitle] = useDebounce(title, 1000);
//     const [debouncedContent] = useDebounce(content, 1000);

//     const getSuggestedTags = useCallback(async (text) => {
//         if (!text || text.trim() === '') {
//             setSuggestedTags([]);
//             return;
//         }

//         setIsSuggesting(true);
//         try {
//             const response = await axiosInstance.post("/suggest-tags", { text });
//             if (response.data && response.data.tags) {
//                 // Filter out tags that are already in the user's list
//                 const uniqueTags = response.data.tags.filter(
//                     (tag) => !tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())
//                 );
//                 setSuggestedTags(uniqueTags);
//             }
//         } catch (error) {
//             console.error('Error fetching suggested tags:', error);
//             setSuggestedTags([]);
//         } finally {
//             setIsSuggesting(false);
//         }
//     }, [tags]);

//     useEffect(() => {
//         const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
//         getSuggestedTags(textToAnalyze);
//     }, [debouncedTitle, debouncedContent, getSuggestedTags]);

//     const handleAddSuggestedTag = (tag) => {
//         if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
//             setTags([...tags, tag]);
//             // Remove the added tag from the suggested list
//             setSuggestedTags(suggestedTags.filter((t) => t !== tag));
//         }
//     };

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }
//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }
//         setError("");
//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         // Main modal content container - adjusted padding for mobile
//         <div className="relative bg-white p-4 rounded-2xl shadow-2xl w-full h-full overflow-y-auto sm:p-6 md:p-8">
//             {/* Close Button - positioned inside for mobile, outside for desktop */}
//             <button 
//                 className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute top-2 right-2 md:-top-4 md:-right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none z-10"
//                 onClick={onClose}
//                 aria-label="Close modal"
//             >
//                 <MdClose className="text-xl text-red-500" />
//             </button>
            
//             {/* Title - adjusted margin-bottom for mobile */}
//             <h2 className="text-xl md:text-3xl font-extrabold text-gray-800 mb-4 border-b pb-4 md:mb-6">
//                 {type === "edit" ? "Edit Note" : "Add New Note"}
//             </h2>
            
//             {/* Form Fields Container - adjusted gap for mobile */}
//             <div className="flex flex-col gap-3 md:gap-4">
//                 {/* Title Input */}
//                 <div>
//                     <label htmlFor="note-title" className="text-sm font-semibold text-gray-700">Title</label>
//                     <input 
//                         id="note-title"
//                         type="text"
//                         className="w-full p-2.5 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:p-3"
//                         placeholder="e.g., Go to the gym at 5pm"
//                         value={title}
//                         onChange={({ target }) => setTitle(target.value)}
//                     />
//                 </div>
//                 {/* Content Textarea - adjusted height for mobile */}
//                 <div>
//                     <label htmlFor="note-content" className="text-sm font-semibold text-gray-700">Content</label>
//                     <textarea 
//                         id="note-content"
//                         className="w-full p-2.5 border border-gray-300 rounded-lg h-28 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all sm:h-32 sm:p-3"
//                         placeholder="Write your note content here..."
//                         value={content}
//                         onChange={({ target }) => setContent(target.value)}
//                     />
//                 </div>
//                 {/* Tags Input and Suggestions - new scrollable wrapper for mobile */}
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Tags</label>
//                     <div className="max-h-28 overflow-y-auto pr-2 custom-scrollbar md:max-h-full md:overflow-visible">
//                         <TagInput 
//                             tags={tags}
//                             setTags={setTags}
//                         />
//                         {isSuggesting && (
//                             <p className="text-sm text-gray-500 mt-2 flex items-center animate-pulse">
//                                 <MdTag className="mr-1" /> Suggesting tags...
//                             </p>
//                         )}
//                         {suggestedTags.length > 0 && (
//                             <div className="mt-3"> {/* Adjusted margin-top */}
//                                 <p className="text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Suggested Tags:</p>
//                                 <div className="flex flex-wrap gap-1.5"> {/* Adjusted gap */}
//                                     {suggestedTags.map((tag, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleAddSuggestedTag(tag)}
//                                             className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
//                                         >
//                                             #{tag}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div> {/* End of new scrollable wrapper */}
//                 </div>
//                 {/* Error Message */}
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 {/* Action Button - adjusted padding and font size for mobile */}
//                 <button 
//                     className="w-full bg-blue-600 text-white p-2.5 rounded-lg mt-4 font-bold text-base hover:bg-blue-700 transition-colors shadow-lg sm:p-3 sm:text-lg"
//                     onClick={handleAddNote}
//                 >
//                     {type === "edit" ? "Update Note" : "Add Note"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddEditNotes;




// import React, { useState, useEffect, useCallback } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose, MdTag } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import { useDebounce } from 'use-debounce';
// import '../index.css';

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);
//     const [suggestedTags, setSuggestedTags] = useState([]);
//     const [isSuggesting, setIsSuggesting] = useState(false);
//     const [error, setError] = useState(null);

//     const [debouncedTitle] = useDebounce(title, 1000);
//     const [debouncedContent] = useDebounce(content, 1000);

//     const getSuggestedTags = useCallback(async (text) => {
//         if (!text || text.trim() === '') {
//             setSuggestedTags([]);
//             return;
//         }

//         setIsSuggesting(true);
//         try {
//             const response = await axiosInstance.post("/suggest-tags", { text });
//             if (response.data && response.data.tags) {
//                 const uniqueTags = response.data.tags.filter(
//                     (tag) => !tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())
//                 );
//                 setSuggestedTags(uniqueTags);
//             }
//         } catch (error) {
//             console.error('Error fetching suggested tags:', error);
//             setSuggestedTags([]);
//         } finally {
//             setIsSuggesting(false);
//         }
//     }, [tags]);

//     useEffect(() => {
//         const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
//         getSuggestedTags(textToAnalyze);
//     }, [debouncedTitle, debouncedContent, getSuggestedTags]);

//     const handleAddSuggestedTag = (tag) => {
//         if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
//             setTags([...tags, tag]);
//             setSuggestedTags(suggestedTags.filter((t) => t !== tag));
//         }
//     };

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }
//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }
//         setError("");
//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         // Main modal content container with a consistent, contained look
//         <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto md:max-w-xl">
//             {/* Close Button - consistently positioned */}
//             <button 
//                 className="w-8 h-8 rounded-full flex items-center justify-center absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none z-10"
//                 onClick={onClose}
//                 aria-label="Close modal"
//             >
//                 <MdClose className="text-xl text-red-500" />
//             </button>
            
//             {/* Title - unified font size and spacing */}
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 {type === "edit" ? "Edit Note" : "Add New Note"}
//             </h2>
            
//             {/* Form Fields Container with consistent gap */}
//             <div className="flex flex-col gap-4">
//                 {/* Title Input */}
//                 <div>
//                     <label htmlFor="note-title" className="text-sm font-semibold text-gray-700">Title</label>
//                     <input 
//                         id="note-title"
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         placeholder="Go to the gym at 5pm"
//                         value={title}
//                         onChange={({ target }) => setTitle(target.value)}
//                     />
//                 </div>
//                 {/* Content Textarea - consistent height and padding */}
//                 <div>
//                     <label htmlFor="note-content" className="text-sm font-semibold text-gray-700">Content</label>
//                     <textarea 
//                         id="note-content"
//                         className="w-full p-3 border border-gray-300 rounded-lg h-32 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
//                         placeholder="Write your note content here..."
//                         value={content}
//                         onChange={({ target }) => setContent(target.value)}
//                     />
//                 </div>
//                 {/* Tags Input and Suggestions - no scrollbar override, it's consistent */}
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Tags</label>
//                     <div className="max-h-28 overflow-y-auto pr-2 custom-scrollbar">
//                         <TagInput 
//                             tags={tags}
//                             setTags={setTags}
//                         />
//                         {isSuggesting && (
//                             <p className="text-sm text-gray-500 mt-2 flex items-center animate-pulse">
//                                 <MdTag className="mr-1" /> Suggesting tags...
//                             </p>
//                         )}
//                         {suggestedTags.length > 0 && (
//                             <div className="mt-3">
//                                 <p className="text-sm font-semibold text-gray-700 mb-2">Suggested Tags:</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {suggestedTags.map((tag, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleAddSuggestedTag(tag)}
//                                             className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
//                                         >
//                                             #{tag}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 {/* Error Message */}
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 {/* Action Button - consistent styling */}
//                 <button 
//                     className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
//                     onClick={handleAddNote}
//                 >
//                     {type === "edit" ? "Update Note" : "Add Note"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddEditNotes;





// import React, { useState, useEffect, useCallback } from 'react';
// import TagInput from '../components/TagInput';
// import { MdClose, MdTag } from 'react-icons/md';
// import { axiosInstance } from '../utils/axiosInstance';
// import { useDebounce } from 'use-debounce';
// import '../index.css';

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
//     const [title, setTitle] = useState(noteData?.title || "");
//     const [content, setContent] = useState(noteData?.content || "");
//     const [tags, setTags] = useState(noteData?.tags || []);
//     const [suggestedTags, setSuggestedTags] = useState([]);
//     const [isSuggesting, setIsSuggesting] = useState(false);
//     const [error, setError] = useState(null);

//     const [debouncedTitle] = useDebounce(title, 1000);
//     const [debouncedContent] = useDebounce(content, 1000);

//     const getSuggestedTags = useCallback(async (text) => {
//         if (!text || text.trim() === '') {
//             setSuggestedTags([]);
//             return;
//         }

//         setIsSuggesting(true);
//         try {
//             const response = await axiosInstance.post("/suggest-tags", { text });
//             if (response.data && response.data.tags) {
//                 const uniqueTags = response.data.tags.filter(
//                     (tag) => !tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())
//                 );
//                 setSuggestedTags(uniqueTags);
//             }
//         } catch (error) {
//             console.error('Error fetching suggested tags:', error);
//             setSuggestedTags([]);
//         } finally {
//             setIsSuggesting(false);
//         }
//     }, [tags]);

//     useEffect(() => {
//         const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
//         getSuggestedTags(textToAnalyze);
//     }, [debouncedTitle, debouncedContent, getSuggestedTags]);

//     const handleAddSuggestedTag = (tag) => {
//         if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
//             setTags([...tags, tag]);
//             setSuggestedTags(suggestedTags.filter((t) => t !== tag));
//         }
//     };

//     // Add Note
//     const addNewNote = async () => {
//         try {
//             const response = await axiosInstance.post("/add-note", {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Added Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     // Edit Note
//     const editNote = async () => {
//         const noteId = noteData._id;
//         try {
//             const response = await axiosInstance.put("/edit-note/" + noteId, {
//                 title,
//                 content,
//                 tags,
//             });
//             if (response.data && response.data.note) {
//                 showToastMessage("Note Updated Successfully");
//                 getAllNotes();
//                 onClose();
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     const handleAddNote = () => {
//         if (!title) {
//             setError("Please enter the title.");
//             return;
//         }
//         if (!content) {
//             setError("Please enter the content.");
//             return;
//         }
//         setError("");
//         if (type === "edit") {
//             editNote();
//         } else {
//             addNewNote();
//         }
//     };

//     return (
//         <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto md:max-w-xl">
//             <button 
//                 className="w-8 h-8 rounded-full flex items-center justify-center absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none z-10"
//                 onClick={onClose}
//                 aria-label="Close modal"
//             >
//                 <MdClose className="text-xl text-red-500" />
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 {type === "edit" ? "Edit Note" : "Add New Note"}
//             </h2>
            
//             <div className="flex flex-col gap-4">
//                 <div>
//                     <label htmlFor="note-title" className="text-sm font-semibold text-gray-700">Title</label>
//                     <input 
//                         id="note-title"
//                         type="text"
//                         className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                         placeholder="Go to the gym at 5pm"
//                         value={title}
//                         onChange={({ target }) => setTitle(target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="note-content" className="text-sm font-semibold text-gray-700">Content</label>
//                     <textarea 
//                         id="note-content"
//                         className="w-full p-3 border border-gray-300 rounded-lg h-32 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
//                         placeholder="Write your note content here..."
//                         value={content}
//                         onChange={({ target }) => setContent(target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label className="text-sm font-semibold text-gray-700">Tags</label>
//                     <div className="max-h-28 overflow-y-auto pr-2 custom-scrollbar">
//                         <TagInput 
//                             tags={tags}
//                             setTags={setTags}
//                         />
//                         {isSuggesting && (
//                             <p className="text-sm text-gray-500 mt-2 flex items-center animate-pulse">
//                                 <MdTag className="mr-1" /> Suggesting tags...
//                             </p>
//                         )}
//                         {suggestedTags.length > 0 && (
//                             <div className="mt-3">
//                                 <p className="text-sm font-semibold text-gray-700 mb-2">Suggested Tags:</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {suggestedTags.map((tag, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleAddSuggestedTag(tag)}
//                                             className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
//                                         >
//                                             #{tag}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 <button 
//                     className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
//                     onClick={handleAddNote}
//                 >
//                     {type === "edit" ? "Update Note" : "Add Note"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddEditNotes;



import React, { useState, useEffect, useCallback } from 'react';
import TagInput from '../components/TagInput';
import { MdClose, MdTag } from 'react-icons/md';
import { axiosInstance } from '../utils/axiosInstance';
import { useDebounce } from 'use-debounce';
import '../index.css';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [error, setError] = useState(null);

    const [debouncedTitle] = useDebounce(title, 1000);
    const [debouncedContent] = useDebounce(content, 1000);

    const getSuggestedTags = useCallback(async (text) => {
        if (!text || text.trim() === '') {
            setSuggestedTags([]);
            return;
        }

        setIsSuggesting(true);
        try {
            const response = await axiosInstance.post("/suggest-tags", { text });
            if (response.data && response.data.tags) {
                const uniqueTags = response.data.tags.filter(
                    (tag) => !tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())
                );
                setSuggestedTags(uniqueTags);
            }
        } catch (error) {
            console.error('Error fetching suggested tags:', error);
            setSuggestedTags([]);
        } finally {
            setIsSuggesting(false);
        }
    }, [tags]);

    useEffect(() => {
        const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
        getSuggestedTags(textToAnalyze);
    }, [debouncedTitle, debouncedContent, getSuggestedTags]);

    const handleAddSuggestedTag = (tag) => {
        if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
            setTags([...tags, tag]);
            setSuggestedTags(suggestedTags.filter((t) => t !== tag));
        }
    };

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title.");
            return;
        }
        if (!content) {
            setError("Please enter the content.");
            return;
        }
        setError("");
        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto md:max-w-xl">
            <button 
                className="w-8 h-8 rounded-full flex items-center justify-center absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none z-10"
                onClick={onClose}
                aria-label="Close modal"
            >
                <MdClose className="text-xl text-red-500" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {type === "edit" ? "Edit Note" : "Add New Note"}
            </h2>
            
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="note-title" className="text-sm font-semibold text-gray-700">Title</label>
                    <input 
                        id="note-title"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Go to the gym at 5pm"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="note-content" className="text-sm font-semibold text-gray-700">Content</label>
                    <textarea 
                        id="note-content"
                        className="w-full p-3 border border-gray-300 rounded-lg h-32 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                        placeholder="Write your note content here..."
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700">Tags</label>
                    <div className="max-h-28 overflow-y-auto pr-2 custom-scrollbar">
                        {/* Tag Input Field and Add Button */}
                        <TagInput 
                            tags={tags}
                            setTags={setTags}
                        />

                        {/* Suggested Tags Section */}
                        {isSuggesting && (
                            <p className="text-sm text-gray-500 mt-2 flex items-center animate-pulse">
                                <MdTag className="mr-1" /> Suggesting tags...
                            </p>
                        )}
                        {suggestedTags.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Suggested Tags:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedTags.map((tag, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAddSuggestedTag(tag)}
                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* User Added Tags Display */}
                        {tags?.length > 0 && (
                            <div className='flex items-center gap-2 flex-wrap mt-2'>
                                <p className="text-sm font-semibold text-gray-700 mb-2 w-full">Your Tags:</p>
                                {tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'
                                    >
                                        # {tag}
                                        <button onClick={() => setTags(tags.filter(t => t !== tag))}>
                                            <MdClose />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button 
                    className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                    onClick={handleAddNote}
                >
                    {type === "edit" ? "Update Note" : "Add Note"}
                </button>
            </div>
        </div>
    );
};
export default AddEditNotes;