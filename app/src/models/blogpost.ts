
export interface BlogPost {
    _id: any,
    title: string,
    content: string,
    createdDate: Date,
    likes: number,
    dislikes: number,
    author: any,
    comments: any,
    image?: string
}