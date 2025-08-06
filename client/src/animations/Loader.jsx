// client/src/animations/Loader.jsx

/**
 * Loader Component
 * A simple loading indicator to display while content is being loaded.
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loader;