export class CreatePostPayload {
    post_id?: number;
    title!: string;
    content!: string;
    create_date!: number;
    username!:string;
    user_id!:number;
}