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
    <div className="w-[25vw] h-[25%] bg-transparent my-[1vw] border-x-2 border-t-2 text-white">
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
