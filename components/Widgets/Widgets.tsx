import Widget from "./Widget";

function Widgets() {
    return (
        <div className="flex flex-col space-y-6 items-start justify-between w-[400px] h-[900px] mt-[75px] ml-[50px]">
            <Widget></Widget>
            <Widget></Widget>
            <Widget></Widget>
        </div>
    )
}

export default Widgets;