import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'
 
declare module 'axios' {
  interface AxiosResponse<T = any> {
     // 这个地方放属性
    message: any
  }
  interface AxiosError<T = any>{
    response:{
        data:any
    }
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance

  type ERR_BAD_REQUEST={
    message:string
    path:string
    retcode:number
    timestamp:string
  }
}


