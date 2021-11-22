export class DataService {
    getDetails() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Data');
            }, 1500);
        });
    }
}