import { Result } from "./resultModel";

export class ResponseModel {
    success: boolean = false;
    data: Result[] = [];
    error: string = ''
}