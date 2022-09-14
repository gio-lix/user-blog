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
    followers: []
    following: []
    gender: string
    mobile: string
    username: string
    website: string
}



