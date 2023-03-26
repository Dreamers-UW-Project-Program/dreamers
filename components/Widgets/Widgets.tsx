import Widget from "./Widget";

import Bot from "../Bot/Bot";
import FriendsList from "./FriendsList";
import AvatarWidget from "./AvatarWidget";
import ReactionPost from "./ReactionPost";

const Widgets = () => {
  return (
    <div className="fixed top-[55%] left-[15%] fixed-center z-[999]">
      <div className="flex flex-col justify-center items-center h-screen">
        <AvatarWidget />
        <Widget inner={FriendsList({})} />
        <ReactionPost />
        <Bot />
      </div>
    </div>
  );
};

export default Widgets;
