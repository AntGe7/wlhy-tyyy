<template>
	<!-- #ifndef APP-NVUE -->
	<view
	    class="uv-grid-item"
	    hover-class="uv-grid-item--hover-class"
	    :hover-stay-time="200"
	    @tap="clickHandler"
	    :class="classes"
	    :style="[itemStyle]"
	>
		<slot />
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<view
	    class="uv-grid-item"
	    :hover-stay-time="200"
	    @tap="clickHandler"
	    :class="classes"
	    :style="[itemStyle]"
	>
		<slot />
	</view>
	<!-- #endif -->
</template>

<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';
	/**
	 * gridItem 提示
	 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。搭配uv-grid使用
	 * @tutorial https://www.uvui.cn/components/grid.html
	 * @property {String | Number}	name		宫格的name ( 默认 null )
	 * @property {String}			bgColor		宫格的背景颜色 （默认 'transparent' ）
	 * @property {Object}			customStyle	自定义样式，对象形式
	 * @event {Function} click 点击宫格触发
	 * @example <uv-grid-item></uv-grid-item>
	 */
	export default {
		name: "uv-grid-item",
		mixins: [mpMixin, mixin, props],
		emits: ['$uvGridItem','click'],
		data() {
			return {
				parentData: {
					col: 3, // 父组件划分的宫格数
					border: true, // 是否显示边框，根据父组件决定
				},
				// #ifdef APP-NVUE
				width: 0, // nvue下才这么计算，vue下放到computed中，否则会因为延时造成闪烁
				// #endif
				classes: [], // 类名集合，用于判断是否显示右边和下边框
			};
		},
		created() {
			// 父组件的实例
			this.updateParentData()
		},
		mounted() {
			this.init()
		},
		computed: {
			// #ifndef APP-NVUE
			// vue下放到computed中，否则会因为延时造成闪烁
			width() {
				return 100 / Number(this.parentData.col) + '%'
			},
			// #endif
			itemStyle() {
				const style = {
					background: this.bgColor,
					width: this.width
				}
				return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle))
			}
		},
		methods: {
			init() {
				// 用于在父组件uv-grid的children中被添加入子组件时，
				// 重新计算item的边框
				uni.$on('$uvGridItem', () => {
					this.gridItemClasses()
				})
				// #ifdef APP-NVUE
				// 获取元素该有的长度，nvue下要延时才准确
				this.$nextTick(function(){
					this.getItemWidth()
				})
				// #endif
				// 发出事件，通知所有的grid-item都重新计算自己的边框
				uni.$emit('$uvGridItem')
				this.gridItemClasses()
			},
			// 获取父组件的参数
			updateParentData() {
				// 此方法写在mixin中
				this.getParentData('uv-grid');
			},
			clickHandler() {
				let name = this.name
				// 如果没有设置name属性，历遍父组件的children数组，判断当前的元素是否和本实例this相等，找出当前组件的索引
				const children = this.parent?.children
				if(children && this.name === null) {
					name = children.findIndex(child => child === this)
				}
				// 调用父组件方法，发出事件
				this.parent && this.parent.childClick(name)
				this.$emit('click', name)
			},
			async getItemWidth() {
				// 如果是nvue，不能使用百分比，只能使用固定宽度
				let width = 0
				if(this.parent) {
					// 获取父组件宽度后，除以栅格数，得出每个item的宽度
					const parentWidth = await this.getParentWidth()
					width = parentWidth / Number(this.parentData.col) + 'px'
				}
				this.width = width
			},
			// 获取父元素的尺寸
			getParentWidth() {
				// #ifdef APP-NVUE
				// 返回一个promise，让调用者可以用await同步获取
				const dom = uni.requireNativePlugin('dom')
				return new Promise(resolve => {
					// 调用父组件的ref
					dom.getComponentRect(this.parent.$refs['uv-grid'], res => {
						resolve(res.size.width)
					})
				})
				// #endif
			},
			gridItemClasses() {
				let classes = [];
				if(this.parentData.border) {
					this.parent.children.forEach((child, index) => {
						if(this === child) {
							// Add right border
							classes.push('uv-border-right');

							// Add bottom border
							classes.push('uv-border-bottom');
						}
					});
					// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
					// #ifdef MP-ALIPAY || MP-TOUTIAO
					classes = classes.join(' ')
					// #endif
					this.classes = classes
				}
			}
		},
		// #ifdef VUE2
		beforeDestroy() {
			// 移除事件监听，释放性能
			uni.$off('$uvGridItem')
		},
		// #endif
		// #ifdef VUE3
		unmounted() {
			// 移除事件监听，释放性能
			uni.$off('$uvGridItem')
		}
		// #endif
	};
</script>

<style lang="scss" scoped>
	$show-border: 1;
	$show-border-right: 1;
	$show-border-bottom: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	@import '@/uni_modules/uv-ui-tools/libs/css/components.scss';
	@import '@/uni_modules/uv-ui-tools/libs/css/color.scss';
	$uv-grid-item-hover-class-opcatiy:.5 !default;
	$uv-grid-item-margin-top:1rpx !default;
	$uv-grid-item-border-right-width:0.5px !default;
	$uv-grid-item-border-bottom-width:0.5px !default;
	$uv-grid-item-border-right-color:$uv-border-color !default;
	$uv-grid-item-border-bottom-color:$uv-border-color !default;
	.uv-grid-item {
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */

		/* #ifdef MP */
		position: relative;
		float: left;
		/* #endif */

		/* #ifdef MP-WEIXIN */
		margin-top:$uv-grid-item-margin-top;
		/* #endif */

		&--hover-class {
			opacity:$uv-grid-item-hover-class-opcatiy;
		}
	}

	/* #ifdef APP-NVUE */
	// 由于nvue不支持组件内引入app.vue中再引入的样式，所以需要写在这里
	.uv-border-right {
		border-right-width:$uv-grid-item-border-right-width;
		border-color: $uv-grid-item-border-right-color;
	}

	.uv-border-bottom {
		border-bottom-width:$uv-grid-item-border-bottom-width;
		border-color:$uv-grid-item-border-bottom-color;
	}
	/* #endif */
</style>
