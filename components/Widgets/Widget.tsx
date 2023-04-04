interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[20vw] h-[40%] bg-[#fffdf821] mt-[3vw] mb-[1vw] rounded-2xl text-white border-[1px] border-[#fffdf830] white-box-shadow">
            <h6 className="font-quicksandLight pl-2 py-3 text-2xl text-center">Following</h6>
            <hr className="hidden w-full h-1 mb-2 bg-gradient-to-r from-rose-200 to-orange-200 sunset-hr-shadow"></hr>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;