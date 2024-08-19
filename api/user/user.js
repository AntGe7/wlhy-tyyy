import { http } from '@/utils/service/service'
//  获取路由 其实是为了解决无token问题
export const getTokenMenu =async (data) => {
	return await http({
		url: '/sys/user/getUserSectionInfoByToken',
		method: 'GET',
		data
	});
};