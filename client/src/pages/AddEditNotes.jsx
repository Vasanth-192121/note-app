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



import React, { useState } from 'react';
import TagInput from '../components/TagInput';
import { MdClose } from 'react-icons/md';
import { axiosInstance } from '../utils/axiosInstance';
import '../index.css'; // Make sure to import the CSS file where the animation is defined

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
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
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
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
        <div className="relative bg-white p-4 md:p-8 rounded-xl shadow-lg max-w-md md:max-w-lg mx-auto transition-all duration-500 transform pop-up">
            <button 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300 transition duration-300"
                onClick={onClose}
            >
                <MdClose className="text-xl text-red-600" />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{type === "edit" ? "Edit Note" : "Add Note"}</h2>
            <div className="flex flex-col gap-2 md:gap-4">
                <label className="text-sm md:text-lg font-medium text-gray-600">Title</label>
                <input 
                    type="text"
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Go to gym at 5pm"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 md:gap-4 mt-4">
                <label className="text-sm md:text-lg font-medium text-gray-600">Content</label>
                <textarea 
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg h-32 md:h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Content"
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>
            <div className="mt-3 md:mt-4">
                <label className="text-sm md:text-lg font-medium text-gray-600">Tags</label>
                <TagInput 
                    tags={tags}
                    setTags={setTags}
                />
            </div>
            {error && <p className="text-red-500 text-sm md:text-base mt-3 md:mt-4">{error}</p>}
            <button 
                className="w-full bg-blue-500 text-white p-2 md:p-3 rounded-lg mt-5 md:mt-6 hover:bg-blue-600 transition-all"
                onClick={handleAddNote}
            >
                {type === "edit" ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default AddEditNotes;
