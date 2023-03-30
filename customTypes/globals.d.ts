export interface Post {
    authorID: string;
    postID: string;
    body: string;
    date: string;
    thumbnail: string;
    title: string;
    likes: PostLikes;
    comments: PostComments;
}

export type PostLikes = {[s: string]: boolean}

export type PostComments = {
    [s: string]: {comment: string; userID: string};
}

export interface User {
    avatar: string;
    email: string;
    passHash: string;
    username: string;
}

export interface Comment {
    comment: string;
    userID: string;
}