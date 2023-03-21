interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
        <div className="py-3 text-white w-[15vw] h-[15vw] bg-[#b7b9bc] rounded-[2rem] my-[1vw] border-2 glassmorphism border-gradient-to-r from-teal-500 to-fuchsia-400">
            {props.inner ?? props.inner}
        </div>
    )
}

export default Widget;