import Widget from "./Widget";

function Widgets() {
    return (
        <div className="flex flex-col justify-center center-items h-screen absolute right-0 z-30 mr-5">
            <Widget />
            <Widget />
            <Widget />
        </div>
    )
}

export default Widgets;