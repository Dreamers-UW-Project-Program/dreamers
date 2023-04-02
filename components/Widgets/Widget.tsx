interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[20vw] h-[40%] bg-transparent my-[1vw] rounded-lg white-box-shadow text-white">
            <h6 className="font-quicksandRegular pl-2 pt-3 pb-1 text-2xl text-center">My Friends</h6>
            <hr className="hidden w-full h-2 mb-2 bg-gradient-to-r from-rose-400 to-orange-300 sunset-hr-shadow"></hr>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;