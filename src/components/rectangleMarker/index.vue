<template>
	<div class="rectangle-marker">
		<div class="mark-wrap">
			<img ref="backImg" :src="imgUrl" class="img-responsive" alt="响应式图像" @load="onload">
			<div class="draw-rect" :class="{ 'no-event': disabled }" @mousemove="mouseMove"
				@mousedown="mouseDown" @mouseup="mouseUp">
				<div ref="box" v-if="boxVisible" :id="boxId" class="box"
					:style="{ width: boxW + 'px', height: boxH + 'px', left: boxL + 'px', top: boxT + 'px' }">
					<div id="upleftbtn" class="upleftbtn" @mousedown="onUpleftbtn"></div>
					<div id="uprightbtn" class="uprightbtn" @mousedown="onUpRightbtn"></div>
					<div id="downleftbtn" class="downleftbtn" @mousedown="onDownleftbtn"></div>
					<div id="downrightbtn" class="downrightbtn" @mousedown="onDownRightbtn"></div>
				</div>
			</div>

			<transition name="fade">
				<div v-if="showBtns && !markFlag" class="act-btns" @mouseleave="mouseLeave">
					<button @click="mark">mark</button>&nbsp;&nbsp;
					<button @click="reset">reset</button>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'rectangleMarker',

		data() {
			return {
				imgW: 0,
				imgH: 0,

				showBtns: false,
				markFlag: false,

				// 鼠标事件属性
				dragging: false,

				startX: undefined,
				startY: undefined,

				diffX: undefined,
				diffY: undefined,

				obj: null, //当前操作对象
				box: null, //要处理的对象

				backImgRect: null,

				boxId: '',

				boxW: 0,
				boxH: 0,
				boxL: 0,
				boxT: 0,

				boxVisible: false
			}
		},

		props: {
			imgUrl: {
				type: String,
				required: true,
				default: ''
			},

			disabled: {
				type: Boolean,
				default: false
			},

			value: {
				type: Array,
				default: function () {
					return []
				}
			}
		},

		created() {
			// this.rectB

		},

		mounted() {
			// this.initData()

			// 根据wrap dom 来重新计算图片长宽 再进行合理的定位布局
			// this.initData(this.value)
		},

		methods: {
			onload() {
				let rect = this.$refs.backImg.getBoundingClientRect()

				this.backImgRect = {
					height: rect.height,
					width: rect.width
				}
				console.log("initConfig -> this.backImgRect", this.backImgRect)
			},

			mouseLeave() {
				this.showBtns = false
			},

			mark() {
				this.markFlag = true
			},

			reset() {
				this.boxVisible = false
				this.boxId = ''

				this.boxH = 0
				this.boxW = 0
				this.boxL = 0
				this.boxT = 0
			},

			initData(data) {
				// this.boxId = 'changeBox'
				// this.boxL = data[0][0] * this.backImgRect.width
				// this.boxT = data[0][1] * this.backImgRect.height
				// this.boxW =  (data[3][1] - data[0][1]) * this.backImgRect.height
				// this.boxH = (data[1][0] - data[0][0]) * this.backImgRect.width

				// this.boxVisible = true
			},

			mouseDown(e) {
				if (!this.markFlag && !this.boxVisible) {
					return
				}

				this.startX = e.offsetX;
				this.startY = e.offsetY;

				// 如果鼠标在 box 上被按下
				if (e.target.className.match(/box/)) {
					// 允许拖动
					this.dragging = true;

					// 设置当前 box 的 id 为 movingBox
					if (this.boxId !== 'movingBox') {
						this.boxId = 'movingBox'
					}

					// 计算坐标差值
					this.diffX = this.startX
					this.diffY = this.startY
				} else {
					console.log(445566);
					if (this.boxId === 'changeBox') {
						return
					}

					this.boxId = 'activeBox'
					this.boxT = this.startY
					this.boxL = this.startX
					this.boxVisible = true
				}
			},

			mouseMove(e) {
				if (!this.markFlag && !this.boxVisible) {
					let toRight = this.backImgRect.width - e.offsetX
					let toTop = e.offsetY

					if (toRight <= 100 && toTop <= 40) {
						this.showBtns = true
					}

					return
				}

let toRight = this.backImgRect.width - e.offsetX
					let toTop = e.offsetY

					if (toRight <= 100 && toTop <= 40) {
						this.showBtns = true
						return
					}

				// 更新 box 尺寸
				if (this.boxId === 'activeBox') {
					this.boxW = e.offsetX - this.startX
					this.boxH = e.offsetY - this.startY
				}

				// 移动，更新 box 坐标
				if (this.boxId === 'movingBox' && this.dragging) {

					let realTop = (e.offsetY + e.target.offsetTop - this.diffY) > 0 ? (e.offsetY + e.target.offsetTop -
						this.diffY) : 0
					let realLeft = (e.offsetX + e.target.offsetLeft - this.diffX) > 0 ? (e.offsetX + e.target.offsetLeft -
						this.diffX) : 0

					let maxTop = this.backImgRect.height - this.$refs.box.offsetHeight
					let maxLeft = this.backImgRect.width - this.$refs.box.offsetWidth

					realTop = realTop >= maxTop ? maxTop : realTop
					realLeft = realLeft >= maxLeft ? maxLeft : realLeft

					this.boxT = realTop;
					this.boxL = realLeft;
				}

				if (this.obj) {
					e = e || window.event;
					var location = {
						x: e.x || e.offsetX,
						y: e.y || e.offsetY
					}
					switch (this.obj.operateType) {
						case "nw":
							this.move('n', location, this.$refs.box);
							this.move('w', location, this.$refs.box);
							break;
						case "ne":
							this.move('n', location, this.$refs.box);
							this.move('e', location, this.$refs.box);
							break;
						case "sw":
							this.move('s', location, this.$refs.box);
							this.move('w', location, this.$refs.box);
							break;
						case "se":
							this.move('s', location, this.$refs.box);
							this.move('e', location, this.$refs.box);
							break;
						case "move":
							this.move('move', location, this.box);
							break;
					}

				}
			},

			mouseUp() {
				if (!this.markFlag && !this.boxVisible) {
					return
				}

				// 禁止拖动
				this.dragging = false;

				if (this.boxId === 'activeBox') {
					if (this.$refs.box) {
						this.boxId = 'changeBox'

						if (this.$refs.box.offsetWidth < 3 || this.$refs.box.offsetHeight < 3) {
							this.boxVisible = false
							this.boxId = ''
						}
					}
				} else {
					if (this.$refs.box && this.boxId === 'movingBox') {
						this.boxId = 'changeBox'

						if (this.$refs.box.offsetWidth < 3 || this.$refs.box.offsetHeight < 3) {
							this.boxVisible = false
							this.boxId = ''
						}
					}
				}

				if (this.boxVisible) {
					this.getHotData()
	
					document.body.style.cursor = "auto";
					this.obj = null;
					this.markFlag = false
				} else {
					this.markFlag = true
				}

				// this.markFlag = false

			},

			getHotData() {
				let target = this.$refs.box

				if (target) {
					let {
						offsetTop,
						offsetLeft
					} = target

					let {
						width: WIDTH,
						height: HEIGHT
					} = this.backImgRect

					let {
						width,
						height
					} = target.getBoundingClientRect()

					// 矩形区域 角点位置（百分比）
					let data = [
						[this.toFixed6(offsetLeft, WIDTH), this.toFixed6(offsetTop, HEIGHT)],
						[this.toFixed6(offsetLeft + width, WIDTH), this.toFixed6(offsetTop, HEIGHT)],
						[this.toFixed6(offsetLeft + width, WIDTH), this.toFixed6(offsetTop + height, HEIGHT)],
						[this.toFixed6(offsetLeft, WIDTH), this.toFixed6(offsetTop + height, HEIGHT)]
					]

					// 矩形中点
					let centerPoint = [
						this.toFixed6(offsetLeft + 0.5 * width, WIDTH),
						this.toFixed6(offsetTop + 0.5 * height, HEIGHT)
					]

					let hotData = {
						data,
						centerPoint
					}

					console.log("getHotData -> hotData", hotData)
				}
			},

			toFixed6(v1, v2) {
				return (v1 / v2).toFixed(6)
			},

			move(type, location, tarobj) {
				switch (type) {
					case 'n': {
						let add_length = this.clickY - location.y;
						this.clickY = location.y;
						let length = parseInt(tarobj.style.height) + add_length;

						tarobj.style.height = length + "px";

						let realTop = this.clickY > 0 ? this.clickY : 0
						let maxTop = this.backImgRect.height - parseInt(tarobj.style.height)
						realTop = realTop >= maxTop ? maxTop : realTop

						tarobj.style.top = realTop + "px";

						break;
					}

					case 's': {
						let add_length = this.clickY - location.y;
						this.clickY = location.y;
						let length = parseInt(tarobj.style.height) - add_length;

						let maxHeight = this.backImgRect.height - parseInt(tarobj.style.top)
						let realHeight = length > maxHeight ? maxHeight : length

						tarobj.style.height = realHeight + "px";

						break;
					}


					case 'w': {
						var add_length = this.clickX - location.x;
						this.clickX = location.x;
						let length = parseInt(tarobj.style.width) + add_length;

						tarobj.style.width = length + "px";

						let realLeft = this.clickX > 0 ? this.clickX : 0
						let maxLeft = this.backImgRect.width - parseInt(tarobj.style.width)
						realLeft = realLeft >= maxLeft ? maxLeft : realLeft

						tarobj.style.left = realLeft + "px";

						break;
					}


					case 'e': {
						let add_length = this.clickX - location.x;
						this.clickX = location.x;

						let length = parseInt(tarobj.style.width) - add_length;
						let maxWidth = this.backImgRect.width - parseInt(tarobj.style.left)
						let realWidth = length > maxWidth ? maxWidth : length

						tarobj.style.width = realWidth + "px";

						break;
					}
				}
			},

			onUpleftbtn(e) {
				e.stopPropagation();
				this.onDragDown(e, "nw");
			},

			onUpRightbtn(e) {
				e.stopPropagation();
				this.onDragDown(e, "ne");
			},

			onDownleftbtn(e) {
				e.stopPropagation();
				this.onDragDown(e, "sw");
			},

			onDownRightbtn(e) {
				e.stopPropagation();
				this.onDragDown(e, "se");
			},

			onDragDown(e, type) {
				e = e || window.event;

				this.clickX = e.x || e.offsetX;
				this.clickY = e.y || e.offsetY;
				this.obj = window;
				this.obj.operateType = type;

				this.box = this.$refs.box;
				return false;
			}
		},
	}
</script>

<style lang="less" scoped>
	.rectangle-marker {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.mark-wrap {
			position: relative;

			.img-responsive {
				display: inline-block;
				max-width: 100%;
				max-height: 100%;
			}

			.draw-rect {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				width: 100%;
				height: 100%;
				z-index: 99;
				user-select: none;

				&.no-event {
					pointer-events: none;
				}


			}
		}

		.act-box {
			margin-top: 10px;
			display: flex;
		}


		.act-btns {
			position: absolute;
			right: 0;
			top: 0;
			z-index: 199;
			height: 40px;
			width: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.fade-enter-active {
			animation: hide-and-show .5s;
		}

		.fade-leave-active {
			animation: hide-and-show .5s reverse;
		}

		@keyframes hide-and-show {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}
</style>

<style lang="less">
	.rectangle-marker {
		.box {
			position: absolute;
			width: 0px;
			height: 0px;
			opacity: 0.5;
			z-index: 149;
			cursor: move;
			border: 1px solid #f00;

			.upleftbtn,
			.uprightbtn,
			.downleftbtn,
			.downrightbtn {
				width: 10px;
				height: 10px;
				border: 1px solid steelblue;
				position: absolute;
				z-index: 5;
				background: whitesmoke;
				border-radius: 10px;
			}

			.upleftbtn {
				top: -5px;
				left: -5px;
				cursor: nw-resize;
			}

			.uprightbtn {
				top: -5px;
				right: -5px;
				cursor: ne-resize;
			}

			.downleftbtn {
				left: -5px;
				bottom: -5px;
				cursor: sw-resize;
			}

			.downrightbtn {
				right: -5px;
				bottom: -5px;
				cursor: se-resize;
			}
		}
	}
</style>