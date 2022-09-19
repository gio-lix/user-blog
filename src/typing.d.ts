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



