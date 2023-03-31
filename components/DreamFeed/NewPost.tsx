import { useState, useContext } from "react";
import { makePost } from "@services/postServices";
import { RenderContext } from "@contexts/render";

interface newPostFormData {
  title: string;
  body: string;
}

const NewPost = ({ setNewPost }: any) => {
  const renderState = useContext(RenderContext);

  const [formData, setFormData] = useState<newPostFormData>({
    title: '',
    body: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  function handleClose() {
    setNewPost(false);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.title || !formData.body){
      setErrorMessage("Make sure both your post's title and body have text!");
      return;
    }
    await makePost(
      formData.title,
      formData.body,
      isUploaded ? uploadedFile : '',
      renderState.user.token
    )
    console.log("New post created successfully!");
    setNewPost(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value}));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
    if (event.target.files) {
        const file = event.target.files[0] as File;
        setUploadedFile(file);
        setIsUploaded(true);
    } else {
        setIsUploaded(false);
    }
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
              onChange={handleInputChange}
            />
            <label className="text-black" htmlFor="body">
              Your dream:
            </label>
            <input
              className="px-3 py-2 rounded-lg mt-1 mb-4"
              type="text"
              id="body"
              name="body"
              onChange={handleInputChange}
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
              onChange={handleFileChange}
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
