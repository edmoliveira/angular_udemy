import { Post } from "./post.model";

export class Result {
  message: string;
  posts: any;
  total: number;
  userId: string;
}

export class ResultUpdate {
  message: string;
  id: string;
  imagePath: string;
  total: number;
}
