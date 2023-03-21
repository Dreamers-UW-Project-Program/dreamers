interface WidgetProps {
    inner?: JSX.Element
}

const Widget = (props: WidgetProps) => {
    return (
<<<<<<< HEAD
        <div className="w-[25vw] h-[25%] bg-transparent my-[1vw] border-x-2 border-t-2">
            
=======
        <div className="py-3 text-white w-[15vw] h-[15vw] bg-[#b7b9bc] rounded-[2rem] my-[1vw] border-2 glassmorphism border-gradient-to-r from-teal-500 to-fuchsia-400">
            {props.inner ?? props.inner}
>>>>>>> 2b8c160f0385d45d5db8501e9a062473688de02c
        </div>
    )
}

export default Widget;