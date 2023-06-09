import Widget from "./Widget";

import Bot from "../Bot/Bot";
import FriendsList from "./FriendsList";
import AvatarWidget from "./AvatarWidget";
import ReactionPost from "./ReactionPost";

const Widgets = () => {
  return (
    <div className="fixed top-[40%] left-[14%] fixed-center z-[999]">
      <div className="flex flex-col justify-center items-center h-screen">
        <AvatarWidget />
        <Widget inner={FriendsList()} />
        <ReactionPost />
      </div>
    </div>
  );
};

export default Widgets;
