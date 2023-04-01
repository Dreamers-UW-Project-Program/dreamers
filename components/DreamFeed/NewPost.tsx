import { useState } from "react";

const NewPost = ({ setNewPost }: any) => {
  function handleClose() {
    setNewPost(false);
  }
  function handleSubmit() {
    setNewPost(false);
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-brightness-100 bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="p-4">
          <form
            className="flex flex-col justify-center mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row justify-start items-center gap-3 stretch">
              <label className="text-pink-500 font-bold" htmlFor="title">
                Title:
              </label>
              <input
                className="px-3 py-2 rounded-lg mt-1 mb-4 bg-gray-200 w-[200%]"
                type="text"
                id="title"
                name="title"
              />
            </div>
            <label className="text-pink-500 font-bold" htmlFor="feed">
              Your dream:
            </label>
            <div className="flex flex-row justify-end">
              <textarea
                className="w-[98%] px-3 py-2 rounded-lg mt-1 mb-4 bg-gray-200 text-left items-end h-[10vw] resize-none overflow-scroll-x"
                id="feed"
                name="feed"
              />
            </div>
            <div className="flex flex-col gap-3 items-end w-full">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl w-[8vw]"
            >
              Post!
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl w-[8vw]"
              onClick={handleClose}
            >
              Cancel
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
