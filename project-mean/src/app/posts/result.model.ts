import { Post } from "./post.model";

export class Result {
  message: string;
  posts: any;
}

export class ResultUpdate {
  message: string;
  id: string;
  imagePath: string
}
