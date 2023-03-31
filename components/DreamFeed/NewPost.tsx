import { useState } from "react";

const NewPost = ({ setNewPost }: any) => {
  function handleClose() {
    setNewPost(false);
  }
  function handleSubmit() {
    setNewPost(false);
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-300 rounded-lg w-1/2">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Share your dream...</h2>
          <form
            className="flex flex-col justify-center mx-auto"
            onSubmit={handleSubmit}
          >
            <label className="text-black" htmlFor="title">
              Title:
            </label>
            <input
              className="px-3 py-2 rounded-lg mt-1 mb-4"
              type="text"
              id="title"
              name="title"
            />
            <label className="text-black" htmlFor="feed">
              Your dream:
            </label>
            <input
              className="px-3 py-2 rounded-lg mt-1 mb-4"
              type="text"
              id="feed"
              name="feed"
            />
            <label className="text-black" htmlFor="thumbnail">
              Add a photo!
            </label>
            <input
              className="px-3 py-2 rounded-lg mt-1 mb-4"
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/png, image/jpeg"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[5vw]"
            >
              Post!
            </button>
          </form>
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
