import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdClose } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { axiosInstance } from "../utils/axiosInstance";
import TagInput from "../components/TagInput";
import Toast from "../components/Toast";

const AddEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const type = location.state?.type || (id ? "edit" : "add");
  const noteData = location.state?.noteData;

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const [debouncedTitle] = useDebounce(title, 1000);
  const [debouncedContent] = useDebounce(content, 1000);

  const isEdit = type === "edit";

  useEffect(() => {
    if (isEdit && !noteData) {
      navigate("/dashboard");
    }
  }, [isEdit, noteData, navigate]);

  const getSuggestedTags = useCallback(
    async (text) => {
      if (!text || text.trim() === "" || !navigator.onLine) {
        setSuggestedTags([]);
        return;
      }
      setIsSuggesting(true);
      try {
        const response = await axiosInstance.post("/suggest-tags", { text });
        if (response.data?.tags) {
          const uniqueTags = response.data.tags.filter(
            (tag) =>
              !tags.some(
                (userTag) => userTag.toLowerCase() === tag.toLowerCase()
              )
          );
          setSuggestedTags(uniqueTags);
        }
      } catch (error) {
        console.error("Error fetching suggested tags:", error);
        setSuggestedTags([]);
      } finally {
        setIsSuggesting(false);
      }
    },
    [tags]
  );

  useEffect(() => {
    const textToAnalyze = `${debouncedTitle} ${debouncedContent}`;
    if (textToAnalyze.trim() !== "") {
      getSuggestedTags(textToAnalyze);
    } else {
      setSuggestedTags([]);
    }
  }, [debouncedTitle, debouncedContent, getSuggestedTags]);

  const handleAddSuggestedTag = (tag) => {
    if (!tags.some((userTag) => userTag.toLowerCase() === tag.toLowerCase())) {
      const newTags = [...tags, tag].slice(0, 5);
      setTags(newTags);
      setSuggestedTags(suggestedTags.filter((t) => t !== tag));
    }
  };

  const handleSaveNote = async () => {
    if (!title.trim()) {
      setError("Please enter the title.");
      return;
    }
    if (!content.trim()) {
      setError("Please enter some content.");
      return;
    }
    setError("");

    const notePayload = {
      title: title.trim(),
      content: content.trim(),
      tags,
    };

    try {
      if (isEdit) {
        await axiosInstance.put(`/edit-note/${id}`, notePayload);
        setToastMessage("Note updated successfully.");
      } else {
        await axiosInstance.post("/add-note", notePayload);
        setToastMessage("Note added successfully.");
      }
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Error saving note:", err);
      setError(
        err.response?.data?.message || "Failed to save note. Please try again."
      );
    }
  };

  const handleCloseToast = () => setToastMessage(null);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-sm"
          onClick={() => navigate("/dashboard")}
          aria-label="Go back to dashboard"
        >
          <MdArrowBack className="text-xl text-blue-600" />
        </button>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit Note" : "Add New Note"}
        </h2>
        <div className="w-10 h-10"></div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-2 max-w-3xl md:w-full mx-auto ">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            placeholder="Go to the gym at 5pm"
            className="text-sm sm:text-base bg-gray-100 px-3 py-2 rounded-md w-full border border-gray-300 focus:outline-none focus:border-blue-500 transition"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base font-medium text-gray-600">
            Content
          </label>
          <textarea
            className="text-sm sm:text-base bg-gray-100 px-3 py-2 rounded-md w-full min-h-[14rem] sm:min-h-[18rem] resize-none border border-gray-300 focus:outline-none focus:border-blue-500 transition"
            placeholder="Write your note content here..."
            rows={window.innerWidth < 780 ? 15 : 10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base font-medium text-gray-600">
            Tags
          </label>

          {/* Existing Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-xs sm:text-sm font-medium px-2 py-1 rounded-md"
              >
                # {tag}
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="ml-1 text-blue-800 hover:text-blue-900"
                  aria-label="Remove tag"
                >
                  <MdClose className="text-xs" />
                </button>
              </div>
            ))}
          </div>

          {/* Suggested Tags */}
          <div className="flex flex-col gap-2">
            {isSuggesting ? (
              <span className="text-xs text-gray-500">
                # Suggesting tags...
              </span>
            ) : (
              suggestedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="text-xs font-semibold text-gray-700 w-full">
                    Suggested:
                  </span>
                  {suggestedTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddSuggestedTag(tag)}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full hover:bg-blue-200 transition"
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Tag Input */}
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white flex justify-center">
        <button
          className="w-full max-w-3xl px-6 py-3 bg-blue-600 text-white rounded-md text-sm sm:text-base font-medium hover:bg-blue-700 transition"
          onClick={handleSaveNote}
        >
          {isEdit ? "Update Note" : "Add Note"}
        </button>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          isShown={true}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default AddEditPage;
