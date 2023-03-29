interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[20vw] h-[25%] bg-transparent my-[1vw] border-l-[3px] border-t-[3px] border-r-[2px] border-b-[2px] 
            rounded-sm white-box-shadow text-white">
            <h6 className="font-robotoRegular pl-2 py-1">
                <span className="text-xl">Y</span>
                <span className="text-md">OUR </span> 
                <span className="text-xl">F</span>
                <span className="text-md">RIENDS</span></h6>
            <hr className="w-full h-2 mb-2 bg-gradient-to-r from-rose-400 to-orange-300 sunset-hr-shadow"></hr>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;