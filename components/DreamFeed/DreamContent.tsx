import { Post } from "@customTypes/globals";

const DreamContent = (props: Post) => {
  return (
      <div className="flex flex-col gap-y-2 text-white border-[0.5vw] px-[2.5vw] py-[1vw] rounded-r-3xl">
        <div className="flex justify-between">
          <div className="text-xl font-robotoRegular white-text-shadow">{props.title}</div>
          <div>{props.date}</div>
        </div>
        <div className="flex flex-row font-robotoLight">
          <div className="">
            <p>{props.body}</p>
          </div>
          <img src={props.thumbnail} className="w-[15vw] h-[15vw]" />
        </div>
        <div className="flex flex-row basis-1/5 w-[10%]">
          <p className="text-2xl">💖</p>
          <p className="text-2xl">💬</p>
        </div>
      </div>
  );
};

export default DreamContent;
