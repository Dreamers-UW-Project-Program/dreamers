export interface Post {
    authorID: string;
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