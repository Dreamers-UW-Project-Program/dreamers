import React, { useState, useContext } from "react";
import { makePost } from "@services/postServices";
import { RenderContext } from "@contexts/render";

interface newPostFormData {
  title: string;
  body: string;
}

const NewPost = ({ setNewPost, setLoading }: any) => {
  const renderState = useContext(RenderContext);

  const [formData, setFormData] = useState<newPostFormData>({
    title: "",
    body: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [numChars, setNumChars] = useState<number>(0);
  function handleClose() {
    setNewPost(false);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.title || !formData.body) {
      setErrorMessage("Make sure both your post's title and body have text!");
      return;
    }
    await setLoading(true);
    await makePost(
      formData.title,
      formData.body,
      isUploaded ? uploadedFile : "",
      renderState.user.token
    );
    console.log("New post created successfully!");
    await setLoading(false);
    setNewPost(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setNumChars(value.length);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0] as File;
      setUploadedFile(file);
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-brightness-100 glassmorphism flex items-center justify-center z-50">
      <div className="bg-[#ffffffb7] rounded-lg w-1/2 pt-8 px-[3vw] pb-[2vw] large-sunset-box-shadow">
        <form
          className="flex flex-col justify-center mx-auto"
          onSubmit={handleSubmit}
        >
            <label className="text-pink-500 font-quicksandMedium text-2xl sunset-text-shadow" htmlFor="title">
              Title:
            </label>
            <input
              className="px-3 py-2 rounded-lg mt-1 mb-4 bg-gray-200 w-[75%] font-quicksandRegular "
              type="text"
              id="title"
              name="title"
              onChange={handleInputChange}
            />
          <label className="text-pink-500 font-quicksandMedium text-2xl sunset-text-shadow" htmlFor="feed">
            Your dream:
          </label>
          <textarea
            className="font-quicksandRegular px-3 py-2 rounded-lg my-1 bg-gray-200 text-left items-end h-[10vw] resize-none overflow-scroll-x"
            id="body"
            name="body"
            maxLength={4000}
            onChange={handleTextAreaChange}
          />
          <div className="flex flex-col gap-3 items-end w-full">
            <div className="font-quicksandRegular text-sm text-zinc-800 mb-4">
              {numChars}/4000 characters
            </div>
            {errorMessage && (
              <div className="font-quicksandRegular pt-2 text-rose-200">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-orange-400 text-white font-bold py-2 px-4 rounded-xl w-[8vw] hover:scale-105 transition-1s sunset-box-shadow"
            >
              Post!
            </button>
            <button
              className="bg-gradient-to-r from-rose-400 to-orange-300 text-white font-bold py-2 px-4 rounded-xl w-[8vw] hover:scale-105 transition-1s sunset-box-shadow"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
