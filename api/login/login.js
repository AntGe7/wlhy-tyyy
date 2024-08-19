import { http } from '@/utils/service/service'
export const login1 =async (data) => {
	return await http({
		url: '/sys/login',
		method: 'POST',
		data
	});
};

export const login2 =async (data) =>{
	return await http({
		url: '/sys/phoneLoginPC',
		method: 'POST',
		data
	})
}
export const sendCode=async (data)=> {
	return await http({
		url: '/sms/send/verifyCode',
		method: 'POST',
		data
	})
}
