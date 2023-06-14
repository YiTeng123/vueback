
/**
 * @install
 * npm i axios  --save
 * axios二次封装
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, ERR_BAD_REQUEST } from "axios";
import { ElMessage } from "element-plus";
import { Result, ResultData } from "../interface";
import { showFullScreenLoading, tryHideFullScreenLoading } from "./config/serviceLoading";
import router from '@/router/index'
// 路由二次封装
const config = {
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 10000 as number,
    // 跨域时候允许携带凭证
    // withCredentials: true
}

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 生成axios实例
        this.service = axios.create(config)
        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig | any) => {
                if (config.url !== '/ecq_login') {
                    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`
                } else {
                    ElMessage.error(`账号密码，请重新登录`)
                }
                config.headers!.noLoading || showFullScreenLoading();
                // const token: string = globalStore.token;
                // return { ...config, headers: { ...config.headers, "x-access-token": 'sdas' } };
                config.headers['Access-Control-Allow-Origin'] = '*'
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response
                setTimeout(() => {
                    tryHideFullScreenLoading();
                }, 200);
                // * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
                return data;
            },

            (error: AxiosError) => {
                const { response } = error;
                tryHideFullScreenLoading();
                console.log(response?.data);
                if (error.message.indexOf("timeout") !== -1) {
                    ElMessage.error("请求超时！请您稍后重试");
                }
                if (error) {
                    ElMessage.error(response?.data ?? error.message);
                }
                const errRes: ERR_BAD_REQUEST = response?.data as any
                if (errRes.retcode == 401) {
                    ElMessage.error('token过期,请重新登录');
                    tryHideFullScreenLoading();
                    const istokenBad = new Promise((reslove, reject) => {
                        reslove(sessionStorage.setItem('token', ''))
                    })
                    istokenBad.then(() => {
                        console.log(router);
                        router.replace({
                            path: "/ecq_login"
                        });
                    })
                    return Promise.reject(error);
                }
                else {
                    Promise.reject(error).catch(() => {
                        ElMessage.error(error.message);
                    });
                }
                // 请求超时单独判断，因为请求超时没有 response
                if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
                return Promise.reject(error);
            }
        );
    }

    // 封装常用的axios请求
    get<T>(url: string, params?: any,): Promise<ResultData<T>> {
        return this.service.get(url, { params, });
    }
    post<T>(url: string, params?: any,): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }
    patch<T>(url: string, params: any): Promise<ResultData<T>> {
        return this.service.patch(url, params)
    }
    delete<T>(url: string): Promise<ResultData<T>>{
        return this.service.patch(url)
    }
    
    put<T>(url: string, params?: object,): Promise<ResultData<T>> {
        return this.service.put(url, params,);
    }
    //查询字符串形式传参,要求传的paramas是个对象
    deleteByQUery<T>(url: string, params?: object,): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
    // 不太行
    deleteByBody<T>(url: string, data: any,): Promise<ResultData<T>> {
        console.log(data, 'data')
        return this.service.delete(url, data);
    }

    download(url: string, params?: object,): Promise<BlobPart> {
        return this.service.post(url, params,);
    }
}

export default new RequestHttp(config)

