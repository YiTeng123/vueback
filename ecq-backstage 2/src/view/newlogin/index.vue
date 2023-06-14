<template>
	<div class="login-container displayy">
		<!-- <SwitchDark class="dark" /> -->
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/headImg/logoo.png" alt="" />
					<h2 class="logo-text">ECQSystem</h2>
					<!-- <h2 class="logo-text">疫情可视化系统</h2> -->
					<!-- <h2 class="logo-text">疫情可视化系统</h2> -->

				</div>
				<LoginForm />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
// import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
</script>

<style scoped lang="scss" >
@import "./index.scss";


</style>
