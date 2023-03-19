import Image from "next/image";
function AvatarWidget() {
  function Greeting() {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
    return greeting;
  }
  return (
    <div className="w-[18vw] h-[10vw] bg-[#b7b9bc] rounded-[2rem] my-[1vw] border-2 glassmorphism border-gradient-to-r from-teal-500 to-fuchsia-400">
      <div className="flex flex-row items-center justify-evenly mx-[0.5vw] my-[1vw] h-[8vw]">
        <Image
          src="/images/profilePicture.jpg"
          alt="Your Profile Picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <p className="text-white font-serif">{Greeting()}!</p>
          <p className="text-white font-serif">@Your ID</p>
        </div>
      </div>
    </div>
  );
}

export default AvatarWidget;
