import Widget from "./Widget";
import Bot from "../Bot/Bot";
import FriendsList from "./FriendsList";


const Widgets = () => {
    return (
        <div className="fixed top-[55%] left-[15%] fixed-center z-[999]">
            <div className="flex flex-col justify-center items-center h-screen">
                <Widget />
                <Widget inner={FriendsList({})}/>
                <Widget />
                <Bot />
            </div>
        </div>
    )
}

export default Widgets;