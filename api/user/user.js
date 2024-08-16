//  获取路由 其实是为了解决无token问题
export const getTokenMenu = (data) => {
	return uni.request({
		url: '/sys/user/getUserSectionInfoByToken',
		method: 'GET',
		data
	});
};