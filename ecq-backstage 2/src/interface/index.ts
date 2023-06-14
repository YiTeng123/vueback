// * 请求响应参数(不包含data)
export interface Result {
	msg: string;
	retcode: 200

}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

export type Resource = {
	_id: string,
	personID: {
		_id: string
		age: string
		identifier: string
		name: string
		nation: string
		grade: string
		schemeNum: string
		organ: string
		sex: string
	}
	gaintestPoint: string
	looktestPoint: string[]
	viocetsetPoint: string
	gameReview: string
	Addvice: string
}

export type ResourceArray = Resource[]
export type backRes = {
	_id: string,
	personID: personType
	gaintestPoint: string
	looktestPoint: Array<string>
	viocetsetPoint: string
	gameReview: string
	Addvice: string

	gaintestMp4?: string
	expresstionMp4?: string
	voiceWav?: string

	gamesPoint: Array<Record<'name' | 'score' | 'time', string>> | string
	eegResult: {
		mood: string
		presure: string
		relax: string
		concentrate: string
		tired: string
	}
	cliAdvice: {
		gad7: number
		phq9: number
	}
}
export type ReArray = Array<backRes>
type P<T> = (pa: T ) =>  {
	a:string,
	b:T & number | string
}
export type GenRow = {
	row: { personID: personType }
}

export type personType = {
	_id: string
	age: string
	identifier: string
	name: string
	nation: string
	grade: string
	schemeNum: string
	organ: string
	sex: string,
	classApi: string,
	gradeApi: string,
}

/**
 * @name 登录
 */
export type formInterface = {
	username: string
	password: string
}

export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		// 赋值的时候，变量的形状必须和接口的形状保持一致，希望一个接口允许有任意的属性
		[propName: string]: any;
	}
}

