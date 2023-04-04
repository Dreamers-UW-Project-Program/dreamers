interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[20vw] h-[40%] bg-transparent mt-[3vw] mb-[1vw] rounded-md text-white widget-glassmorphism">
            <h6 className="font-quicksandLight pl-2 py-3 text-2xl text-center">Following</h6>
            <hr className="w-full h-1 mb-2 bg-gradient-to-r from-rose-200 to-orange-200 sunset-hr-shadow"></hr>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;