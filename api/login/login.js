import { http } from '@/utils/http'
export const login1 = (data) => {
	return http({
		url: '/sys/login',
		method: 'POST',
		data
	});
};

export const login2 = (data) =>{
	return uni.request({
		url: '/sys/phoneLoginPC',
		method: 'POST',
		data
	})
}
export const sendCode=(data)=> {
	return uni.request({
		url: '/sms/send/verifyCode',
		method: 'POST',
		data
	})
}
