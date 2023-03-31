import { Post } from "@customTypes/globals";

const DreamContent = (props: Post) => {
  return (
    <div className="basis-6/10 flex flex-col gap-y-2 text-white border-[0.5vw] px-[4vw] py-[0.5vw] rounded-r-3xl font-serif">
      <div className="flex justify-between">
        <div className="text-lg ">{props.title}</div>
        <div>{props.date}</div>
      </div>
      <div className="flex flex-row gap-2">
        {props.body}
        <img src={props.thumbnail} className="w-[15vw]" />
      </div>
      <div className="flex flex-row">
        <p className="text-2xl">💖</p>
        <p className="text-2xl">💬</p>
      </div>
    </div>
  );
};

export default DreamContent;
