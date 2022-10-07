export interface ValidState {
    password?: string,
    confirmPassword?: string,
    email?: string,
    fullname?: string,
    username?: string,
}

export interface UserState {
    _id: string
    address: string
    avatar: string
    email: string
    followers: string[]
    following: string[]
    gender: string
    mobile: string
    username: string
    fullname: string
    website: string
    story: string
}

export interface CommentState {
    _id: string
    postId: string
    postUserId: string
    content: string
    createAt: Date
    likes: UserState[]
    user: UserState
    tag: UserState
}


export interface PostsState {
    _id: string
    comments: CommentState[],
    content: string,
    images: string[]
    likes: string[],
    createdAt: Date
    user: {
        _id: string
        avatar: string
        fullname: string
        username: string
    }
}

export interface NotifyPostsState {
    _id: string
    content: string
    createdAt: string
    id: string
    image: string
    isRead: boolean
    recipients: string[]
    text: string
    url: string
    user: UserState
}




