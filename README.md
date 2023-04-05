## What it does :eyeglasses:

Dreamscape is an innovative dream journal platform that empowers users to record and share their fascinating dreams as captivating posts. Moreover, a unique image is thoughtfully generated to reflect the user's subconscious visions from the previous night. Users can seamlessly connect with other like-minded individuals, share their dreams anonymously, and add friends with similar dream interests to foster a supportive community. This dynamic app offers a secure and private space for users to explore the depths of their minds, gain profound insights, and even awaken hidden talents and passions.

## Inspiration :flashlight:

Our project idea originated from the book _Do Androids Dream Of Electric Sheep (1968)_ by Philip K. Dick, a more than influential sci-fi novel that set the groundwork for the concept of Cyberpunk. Further, the book was adapted into a film, better known as Blade Runners. 

### but who asked?

A large portion of the book discusses the nature of humanity and the discovery of one's identity and individuality; we are motivated to do the same. By keeping a dream journal and sharing your dreams with a supportive community of like-minded dreamers, we gain new perspectives and insights into our subconscious minds. In a fast moving world, it is more important than ever to understand yourself in the overwhelming amount of information.

## How we built it :wrench:

Dreamscape was built using a combination of modern web development technologies, including Typescript, Next.js, Tailwindcss for the front-end user interface, and a backend server for data storage and authentication through Firebase. DALLE-2 was leveraged to generate and visualize dreamscapes. As for the upcoming dreammate feature (see more below), we designed a RelativityModel to use in pytorch for tokenizing and comparing similarities between dream posts to match users. However, since we need more data from users to train our model, this feature is currently not integrated. 

## Challenges we ran into :hammer:

During the development of Dreamscape, we faced challenges in designing an intuitive and user-friendly interface that could capture the complexity of dreams. We also encountered technical hurdles in implementing the backend server and ensuring data security. Additionally, balancing the need for anonymity with the desire for social connections posed challenges in designing the friend and sharing features.

## What we learned :mortar_board:

Through the development of Dreamscape, we learned valuable lessons in UI/UX design, backend server implementation, data security, and some elementary stable diffusion principles. We also gained insights into the diverse and complex nature of dreams and the importance of creating a supportive community for dreamers to share their experiences.

## What's next for Dreamscape :sunglasses:

Coming years would be dedicated to enhancing features such as dreammate matching, a feature that recommends you an unique dreamer periodically based on similarities of your dreams and likes. We will also work on incorporating machine learning algorithms to provide personalized dream insights. Further, we plan on renting a GPU to host our own stable diffusion model for image generation, fine-tuned for dream visualizing. Our vision is to make Dreamscape the go-to platform for dreamers worldwide, fostering self-discovery, connection, and exploration of the fascinating world of dreams. Stay tuned for exciting updates! 

## API Reference :notebook_with_decorative_cover:

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
  GET /api/friends/${id}
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
  POST/DELETE /api/friends/${id}
```
| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  Unique hashed ID for user1 |
| `friendID` | `string` |  Unique hashed ID for user2. If method is POST, user1 befriends user2. If method is DELETE, user1 hates user2. |

| Header | Type | Description
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | User1's token obtained from Login. Uses bearer authentication |
