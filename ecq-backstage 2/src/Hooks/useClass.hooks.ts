
const funw = (parmas: any) => () => console.log(parmas)
const debounceDecartor = (callback: Function, delay: number, args?: any) => {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {
        console.log(target, key, descriptor, callback, 'decarotor')
        const originalMethod = descriptor.value; // 获取原始函数

        descriptor.value = function () {
            let _this = this
            let timer: any = null
            console.log(callback, '----n')
            return function (...arg: any[]) {

                clearTimeout(timer as any);
                timer = setTimeout(() => {
                    console.log(callback, '----n2,', delay, _this, arg)

                    callback.apply(_this, arg)
                }, delay)
            }

        }
    }
}


const debounce3 = () => (target: Object, key: string, descriptor: PropertyDescriptor) => {
    descriptor.value = function (callback: Function, delay: number) {
        let timer: any = null;
        let _this = this
        return function (...arg: Array<any>) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback.apply(_this, arg)
            }, delay)
        }
    }
    return descriptor
}
class HookService {
    @debounceDecartor(funw(21), 1000)
    static debuounce() {
    }
    @debounce3()
    static debuounce1(a: any, b: any) {

    }
}
export {
    HookService
}
enum PromiseState {
    PENDING = 'pending',
    FUFILLED = 'fulfilled',
    REJECTED = 'rejected',
}
const { PENDING } = PromiseState
const { FUFILLED } = PromiseState
const { REJECTED } = PromiseState

export class MyPromise<T>{
    #state: string = PENDING;
    protected result: any = null
    protected handlers: any = []
    constructor(callback: Function) {
        const resolve = (data: any) => {
            this.changeState(FUFILLED, data)
        }
        const reject = (reason: any) => {
            this.changeState(REJECTED, reason)
        }
        // 异步错误无法影响promise的状态
        try {
            callback(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    protected runOne(callback: Function, resolve: Function, reject: Function) {
        // 回调不是函数
        this.runmicoTask(() => {
            if (typeof callback !== "function") {
                const settled = this.#state === FUFILLED ? resolve : reject
                settled(this.result)
                return
            }
            // 回调是函数
            try {
                const data = callback(this.result)
                // 当传入的回调执行结果是一个thenable,调用它的then,并传入参数
                if (this.isPromise(data)) {
                    data.then(resolve, reject)
                }
                else {
                    resolve(data)
                }
            } catch (err) {
                reject(err)
            }
        })
    }
    // 执行传入回调
    protected run() {
        if (this.#state === PENDING) return
        while (this.handlers.length) {
            const { onFufilled, onRejected, resolve, reject } = this.handlers.shift()
            if (this.#state === FUFILLED) {

                this.runOne(onFufilled, resolve, reject)
            }
            if (this.#state === REJECTED) {
                this.runOne(onRejected, resolve, reject)
            }
        }
    }
    // 改变promise状态
    protected changeState(changeState: string, changeRes: any) {
        if (this.#state !== PENDING) return
        this.#state = changeState
        this.result = changeRes
        this.run()
    }
    // 判断是否是一个promise
    protected isPromise(mise: any) {
        if (mise !== null && (typeof mise == 'object' || typeof mise == 'function')) {
            return typeof mise.then === 'function'
        }
        return false
    }
    // 微队列执行回调
    protected runmicoTask(callback: MutationCallback) {
        if (typeof process === 'object' && typeof process.nextTick === 'function') {
            process.nextTick(callback)
        }
        else if (typeof MutationObserver === 'function') {
            const ob = new MutationObserver(callback)
            const textNode = document.createTextNode('2')
            ob.observe(textNode, {
                characterData: true
            })
            textNode.data = '1'
        } else {
            setTimeout(callback, 0)
        }
    }



    // promise的状态改变时 1.返回一个promise对象,状态为已改变,2.执行传入的回调
    public then(onFufilled: Function | undefined, onRejected?: Function) {
        return new MyPromise((resolve: Function, reject: Function) => {
            // 解决异步的回调(放进一个数组,然后当状态改变时弹出数组元素调用),以及可以链式调用then
            this.handlers.push(
                {
                    onFufilled,
                    onRejected,
                    resolve,
                    reject
                }
            )
            this.run()

        })
    }


    catch(onRejected: Function) {
        return this.then(undefined, onRejected)
    }
    // 状态穿透/透明 执行finally要与执行前保持一致
    finally(onFinally: Function) {
        return this.then(
            // 写成内置回调的形式是为了做状态透明,直接执行onFinally无法return data
            (data: any) => { onFinally(); return data },
            (err: Error) => { onFinally(); throw err }
        )
    }
    static resolve(value: any) {
        if (value instanceof MyPromise) return value
        let _resolve: any, _reject: any
        const p = new MyPromise((resolve: Function, reject: Function) => {
            _resolve = resolve
            _reject = reject
        })
        if (p.isPromise(value)) {
            value.then(_resolve, _reject)
        }
        else { _resolve(value) }
    }
    static reject(reason: any) {
        return new MyPromise((_: Function, reject: Function) => {
            reject(reason)
        })
    }

}

const creatRequest = (params: { pool: number }) => {
    const urlArray: Array<string> = []
    const { pool } = params
    let requestCount = 0
    const http = () => {
        if (urlArray.length === 0 || requestCount > pool) return
        const url = urlArray.shift()!
        requestCount++
        fetch(url)
            .then((res: any) => {
                return res
            })
            .catch((res: any) => res)
            .then(() => { requestCount--; http() })
    }

    return (url: string) => {
        return new Promise(() => {
            urlArray.push(url)
            http()
        })
    }
}

const deepClone = (params: any) => {
    if (typeof params === null || typeof params !== "object") return
    let clone = {}
    for (let key in params) {

    }

}