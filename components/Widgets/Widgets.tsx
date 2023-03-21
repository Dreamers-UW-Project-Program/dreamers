import Widget from "./Widget";
import Bot from "../Bot/Bot";

function Widgets() {
    return (
        <div className="fixed top-[55%] left-[15%] fixed-center z-[999]">
            <div className="flex flex-col justify-center items-center h-screen">
                <Widget />
                <Widget />
                <Widget />
                <Bot />
            </div>
        </div>
    )
}

export default Widgets;