export interface ChatUsersState {
    _id: string
    fullname: string
    username: string
    avatar: string
    text: string
    media: string[]
}



export interface ChatDataState {
    _id?: string
    conversation?: string
    sender: string
    text: string
    media: string[]
    recipient: UserState | string
    createdAt: string
    updatedAt?: string
}

export interface ValidState {
    password?: string,
    confirmPassword?: string,
    email?: string,
    fullname?: string,
    username?: string,
}

export interface UserState {
    _id: string
    avatar: string
    address: string
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
    content: string,
    images: string[]
    likes: string[],
    comments: CommentState[],
    user: {
        _id: string
        avatar: string
        fullname: string
        username: string
    }
    createdAt: Date
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




