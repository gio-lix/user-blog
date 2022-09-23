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

export interface PostsState {
    _id: string
    comments: [],
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






