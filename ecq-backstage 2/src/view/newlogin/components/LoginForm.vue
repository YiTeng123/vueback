
<template>
	<el-form ref="loginFormRef" :model="formLogin" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="formLogin.username" placeholder="用户名：admin ">
				<template #prefix>
					<el-icon class="el-input__icon">
						<user />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="formLogin.password" placeholder="biai2023" show-password
				autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon">
						<lock />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<!-- 要这样写函数才不会自执行 -->
		<el-button :icon="UserFilled" round @click="handleLogin(loginFormRef)" @keyup.enter="handleLogin" size="large"
			type="primary" :loading="loading">
			登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { Login } from "@/api/interface";
import { ElButton, ElFormItem, ElIcon, ElInput, ElNotification } from "element-plus";
// import { loginApi } from '../../server/modules/login'
import { formInterface } from '@/interface/index'
// import { useLogin } from "../../hook/useLogin"
// import { useStore } from "../../store/index"
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
// import { getTimeState } from "@/untils/util";
import http from "@/server/index";
import { useStore } from "@/store/index"
import { storeToRefs } from "pinia";
import to from 'await-to-js';
const store = useStore()
const { setloginToken } = store
let { loginToken, loginRole } = storeToRefs(store)
// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<any>({ username: "", password: "" });
// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
let isRememberFlag = ref(false)
const router = useRouter()
// console.log(import.meta.env.VITE_BASE_URL + Api.login)
let formLogin = reactive<formInterface>({
	username: '',
	password: '',

})
function getTimeState() {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}
type LoginData = {
	access_token: string
	expiresIn: number
	role: string
	name:string
}
// 登进系统
const handleLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(
		async (valid) => {
			if (!valid) return
			const tNow = new Date().getTime() 

			loading.value = true;
			const [err, res] = await to(http.post<LoginData>('/auth/login', formLogin))
			loading.value = err ? false : true
			const {
				retcode, data: {
					access_token,
					expiresIn,
					role,
					name
				} } = res!
			if (retcode == 200) {
				const tokenPromise = new Promise((resolve, reject) => {
					resolve(sessionStorage.setItem('token', access_token))
					resolve(sessionStorage.setItem('tokenTime',(tNow+(expiresIn*1000)).toString() )) 
					resolve(store.authName=name)
				})
				tokenPromise.then(() => {
					loginRole.value = role
					router.push('/backstage/')
					setTimeout(() =>{
						ElNotification({
						title: getTimeState(),
						message: "欢迎登录 管理者",
						type: "success",
						duration: 3000
					});
					},200)
				})

			}
		})

}



// onMounted(() => {
// 	// 监听enter事件（调用登录）
// 	document.onkeydown = (e: any) => {
// 		e = window.event || e;
// 		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
// 			if (loading.value) return;
// 			login(loginFormRef.value);
// 		}
// 	};
// });
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
	