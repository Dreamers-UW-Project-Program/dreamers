const NewPost = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-1/2">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Popup Title</h2>
            <p className="mb-4">Popup content goes here.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewPost;