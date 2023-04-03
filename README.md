
## API Reference

#### Register

```
  POST /api/register
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` |  Email to register with |
| `password` | `string` |  Password to register with|
| `username` | `string` |  Your preferred username |
| `avatar` | `string` |  Avatar Image Url |

#### Login to get authorization token

```
  POST /api/login
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` |  The user's email you are trying to login |
| `password` | `string` |  The user's password you are trying to login |

#### Retrieve user info
```
  GET /api/users/${id}
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  The target user's id |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Author token obtained from Login.  Uses bearer authentication |

#### Get all posts

```
  GET /api/posts
```

#### Make new post
```
  POST /api/posts
```
| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title for the new post |
| `body` | `string` |  Post body |
| `startKey` | `string` | Starting post |
| `num` | `integer` | Number of posts to fetch from startKey |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Author token obtained from Login. Uses bearer authentication |

#### Get specific post
```
  GET /api/posts/${postID}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postID` | `string` |  Unique hashed ID for target post |

#### Delete specific post
```
  DELETE /api/posts/${postID}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postID` | `string` |  Unique hashed ID for target post |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Author token obtained from Login. Uses bearer authentication |

#### Like/Comment specific post
```
  POST /api/posts/${postID}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `postID` | `string` |  Unique hashed ID for target post |
| `userID` | `string` |  Unique hashed ID for author of new comment/like |
| `like` | `boolean` | If true, the author will like this post  |
| `comment` | `string` | __Optional.__ If provided, the author will post this comment under the post |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Author token obtained from Login. Uses bearer authentication |

#### Get friend list for user
```
  GET /api/posts/${id}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  Unique hashed ID for user1 |
| `friendID` | `string` |  __Optional.__ Unique hashed ID for user2. If provided, returns if user2 is user1's friend. Otherwise, returns a list of user1's friends |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | User1's token obtained from Login. Uses bearer authentication

#### Post/Delete friend for user
```
  POST/DELETE /api/posts/${id}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  Unique hashed ID for user1 |
| `friendID` | `string` |  Unique hashed ID for user2. If method is POST, user1 befriends user2. If method is DELETE, user1 hates user2. |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | User1's token obtained from Login. Uses bearer authentication |