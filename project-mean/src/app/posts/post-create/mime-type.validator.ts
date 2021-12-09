import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export const mimeTypeValidator = (control: AbstractControl):
  Promise<{ [Key: string]: any }> | Observable<{ [Key: string]: any }>  => {
    const file = control.value as File | string;
    const fileReader = new FileReader();

    if(typeof(file) !== 'object'){
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }

    return new Observable(observer => {
      fileReader.addEventListener('loadend', () => {
        const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        let isValid = false;

        for(let i = 0; i < array.length;i++) {
          header += array[i].toString(16);
        }

        switch(header){
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }

        if(isValid){
          observer.next(null);
        }
        else {
          observer.next({ invalidMimeType: true });
        }

        observer.complete();
      });

      fileReader.readAsArrayBuffer(file);
    });
}
