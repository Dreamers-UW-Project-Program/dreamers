import Image from "next/image";
function Reaction(props: { response: string }) {
  function action(response: string) {
    if (response == "Like") {
      return "👍";
    } else if (response == "Comment") {
      return "📢";
    } else if (response == "Share") {
      return "👥";
    }
  }
  let response = props.response;
  return (
    <div className="flex flex-row justify-start gap-1">
      <p className="text-white">@User Name</p>
      <p>{action(response)}</p>
    </div>
  );
}

function ReactionPost() {
  function checkNewPost() {
    return " *";
  }
  return (
    <div className="w-[15vw] h-[15vw] bg-[#b7b9bc] rounded-[2rem] my-[1vw] border-2 overflow-y-scroll glassmorphism border-gradient-to-r from-teal-500 to-fuchsia-400">
      <div className="flex flex-col justify-start h-[13vw] grow-0 m-[0.5vw] gap-2">
        <div className="flex flex-row justify-start gap-1">
          <p className="text-white">Your Recent Post: </p>
          <p className="text-pink-400">{checkNewPost()}</p>
        </div>
        <div className="">
          <p className="text-white line-clamp-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam excepturi autem enim, quo, sit modi, doloremque consequuntur repellat cum aut similique ex. Ullam fuga molestiae ex repellat, id iusto nesciunt voluptate officia aliquam quam fugiat sunt, numquam quasi impedit perferendis dolorum totam sint! Id voluptatum, praesentium alias magnam dicta totam voluptas? Dicta quae rem sit iure alias tempora harum minus sed minima possimus? Libero beatae illum laboriosam eum porro officiis deleniti cupiditate! Perspiciatis ullam maiores, sint totam facilis suscipit ex porro odio quibusdam, adipisci hic obcaecati iste autem sed repellendus nemo nam eius consequatur praesentium nesciunt, animi excepturi quos! Nam?
          </p>
        </div>
        <div className="">
          <Reaction response="Like"></Reaction>
        </div>
        <div className="">
          <Reaction response="Share"></Reaction>
        </div>
        <div className="">
          <Reaction response="Comment"></Reaction>
        </div>
        <div className="">
          <Reaction response="Comment"></Reaction>
        </div>
        <div className="">
          <Reaction response="Comment"></Reaction>
        </div>
        <div className="">
          <Reaction response="Comment"></Reaction>
        </div>
      </div>
    </div>
  );
}

export default ReactionPost;
