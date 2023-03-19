import Widget from "./Widget";
import AvatarWidget from "./AvatarWidget";
import ReactionPost from "./ReactionPost";

function Widgets() {
  return (
    <div className="flex flex-col justify-center items-end h-screen absolute right-0 z-30 mr-5">
      <AvatarWidget />
      <Widget />
      <ReactionPost />
    </div>
  );
}

export default Widgets;
