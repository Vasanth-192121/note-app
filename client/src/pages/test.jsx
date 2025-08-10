import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";
import AddNotesImg from "../../src/assets/add-notes.svg";
import NoDataImg from "../../src/assets/no-data.svg";
import Loader from "../animations/userInfoLoader";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import backgroundImage from "../../src/assets/bg-image.webp";
import ViewNoteModal from "../components/ViewNoteModal";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [viewNoteModal, setViewNoteModal] = useState({
    isShown: false,
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const navigate = useNavigate();

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleReadMore = (noteDetails) => {
    // Use a media query check or screen width to decide between modal and inline
    if (window.innerWidth >= 768) {
      // For desktop, show the modal
      setViewNoteModal({ isShown: true, data: noteDetails });
    } else {
      // For mobile, toggle the expanded state in the NoteCard
      setExpandedNoteId((prevId) =>
        prevId === noteDetails._id ? null : noteDetails._id
      );
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        { isPinned: !noteData.isPinned }
      );
      if (response.data?.note) {
        showToastMessage(
          noteData.isPinned ? "Unpinned Successfully" : "Pinned Successfully"
        );
        getAllNotes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getAllNotes(), getUserInfo()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (!isLoading && allNotes.length > 0) {
      body.classList.add("bg-no-repeat", "bg-cover", "bg-center");
      body.style.backgroundAttachment = "fixed";
      body.style.backgroundImage = `url(${backgroundImage})`;
    } else {
      body.classList.remove("bg-no-repeat", "bg-cover", "bg-center");
      body.style.backgroundImage = "none";
    }
    return () => {
      body.style.backgroundImage = "none";
      body.style.backgroundAttachment = "scroll";
      body.classList.remove("bg-no-repeat", "bg-cover", "bg-center");
    };
  }, [isLoading, allNotes]);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100, // Ensure modal is on top
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "90%",
      width: "600px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "2rem",
      borderRadius: "1rem",
      border: "none",
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar
          variant="home"
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>

      <div className="flex-grow container mx-auto p-4 md:p-6 pt-20">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                // Pass the expanded state and handler to NoteCard
                isExpanded={expandedNoteId === item._id}
                onReadMore={() => handleReadMore(item)}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgScr={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? `Oops! No notes matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 fixed right-6 bottom-24 md:right-10 md:bottom-28 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 z-50"
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: "add", data: null });
        }}
        aria-label="Add a new note"
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {
          setOpenAddEditModel({ isShown: false, type: "add", data: null });
        }}
        style={modalStyles}
        contentLabel="Add/Edit Note Modal"
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null });
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

      {/* This is the modal for desktop view */}
      {viewNoteModal.isShown && (
        <Modal
          isOpen={viewNoteModal.isShown}
          onRequestClose={() =>
            setViewNoteModal({ isShown: false, data: null })
          }
          style={modalStyles}
          contentLabel="View Note Modal"
        >
          <ViewNoteModal
            noteData={viewNoteModal.data}
            onClose={() => setViewNoteModal({ isShown: false, data: null })}
          />
        </Modal>
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-40 text-center py-4 bg-slate-200 rounded-t-xl shadow-custom-top-right bg-opacity-95">
        <div className="flex justify-center items-center mb-2 space-x-4">
          <a
            href="https://www.linkedin.com/in/Vasanthamohan-R"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin className="text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300" />
          </a>
          <a
            href="https://github.com/Vasanth-192121"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub className="text-gray-700 text-2xl md:text-3xl hover:text-gray-800 transition duration-300" />
          </a>
          <a
            href="mailto:vasanth27092002@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email address"
          >
            <FaEnvelope className="text-blue-700 text-2xl md:text-3xl hover:text-blue-800 transition duration-300" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;