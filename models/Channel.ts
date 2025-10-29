

export class Chanel <T>{
    private quue: T[] = []
    private resolvers: ((value: T) => void)[] = []


    send(value: T) {
        if(this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve?.(value); 
        }else {
            this.quue.push(value)
        }
    }


    recive(): Promise<T> {
        return new Promise<T>((resolve) => {
            if(this.resolvers.length >  0) {
                resolve(this.quue.shift()!)
            }else {
                this.resolvers.push(resolve)
            }
        })
    }

    clear(): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            if(this.resolvers.length > 0) {}else {
                resolve(true)
            }
        })
    }
}