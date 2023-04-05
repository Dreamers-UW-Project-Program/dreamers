interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[20vw] h-[40%] bg-[#fffdf821] mt-[3vw] mb-[1vw] rounded-2xl text-white border-[1px] border-[#fffdf830] 
            overflow-auto white-box-shadow scrollbar-none">
            <h6 className="font-quicksandLight pl-4 least-white-text-shadow py-5 text-2xl text-center">Following</h6>
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;