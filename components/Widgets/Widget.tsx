interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[25vw] h-[25%] bg-transparent my-[1vw] border-2 text-white">
            <h6 className="font-montserratRegular text-lg">Widget Title</h6>
            <hr className="w-full h-3 bg-gradient-to-r from-rose-400 to-orange-300"></hr>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;