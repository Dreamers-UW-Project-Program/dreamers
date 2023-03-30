import { getFriendsListByID, getUserByID } from "../../firebase/utils/userUtils";
import { useEffect, useState, useContext } from "react";
import { RenderContext } from "@contexts/render";

type user = {[t: string]: string};

const FriendsList = () => {
	const renderState = useContext(RenderContext);
	
    const [friendsList, setFriendsList] = useState({});
	const [friends, setFriends] = useState<{[s: string]: user}>({});

    useEffect(() => {
        async function getFriendsID(id: string) {
            try {
                const res = await getFriendsListByID(renderState.user.userID ?? process.env.DEFAULT_USER_ID ?? "");
                console.log(friendsList)
                setFriendsList(res);
            } catch (e) {
                console.log(e)
            }
        }
        getFriendsID(renderState.user.userID ?? process.env.DEFAULT_USER_ID ?? "");
    }, [])

	useEffect(() => {
		try {
			Object.keys(friendsList).forEach(async (friend) => {
				const currFriend = await getUserByID(friend);
				setFriends(friends => ({
					...friends,
					[friend] : currFriend,
				}))
				console.log(friends)
			})
		} catch (e) {
			console.log(e)
		}
	}, [friendsList])
    
    return (
        <div className="mx-4 mb-6 h-full overflow-hidden font-robotoLight">
			<div className="text-md">Your Friends</div>
            <div className="flex flex-col items-start text-sm overflow-auto h-full scroll-smooth">
				{Object.keys(friends??{}).map(friend => {
					console.log(friend)
					return <div>{friends[friend]["username"]}</div>
				})}
			</div>
        </div>
    )
}

export default FriendsList;