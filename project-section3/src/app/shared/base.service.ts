import { ResultService } from "./result-service.model";
import { environment } from 'src/environments/environment';

export abstract class BaseService {

    getResponse<T>(
        result: ResultService<T>, 
        onSuccess?: (data: T) => void, 
        onError?: (message: string) => void,
        onFinally?: () => void){
        if(result.success && onSuccess != null) {
            onSuccess(result.data);
        }
        else if(onError != null) {
            onError(result.error);
        }

        if(onFinally != null) {
            onFinally();
        }
    }

    manageHttpError(error: any): string { 
        if(!environment.production) {
            console.log(error);
        }

        return 'Operation failed: System error. Please contact your system administrator.';
    }
}