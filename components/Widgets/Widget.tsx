interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="w-[25vw] h-[25%] bg-transparent my-[1vw] border-x-2 border-t-2 text-white">
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;