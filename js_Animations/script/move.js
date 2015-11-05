//获取属性 offsetWidth/Height有小bug  获取样式
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr]; //IE支持的
	} else {
		return getComputedStyle(obj, false)[attr]; //FF浏览器支持的
	}
}
//封装startMove方法
//(obj,{attr1:itarget1,attr2:itaget2},fn)---json封装多个属性
function startMove(obj, json, fn) { //fn 回调函数，当执行完前面的行为时不马上结束，而是执行一个函数
	
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var flag = true; //假设所有运动都到达目标值
		for (var attr in json) {
			//获取当前值			
			var   icur = 0;
			if (attr == "opacity") {
				icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				icur = parseInt(getStyle(obj, attr)); //parseint函数解析字符串并取整
			}

			//计算速度  json[attr]取的是属性的值
			var speed = (json[attr] - icur) / 8; //平均的增长或减小的速度
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //如果大于零向上取整，否则向下取整

			//检测停止 判断所有的运动都到达目标值，没有都到达目标值不执行关闭定时器
			if (icur != json[attr]) {
				flag = false;

				//如果flag为假的话继续执行以下代码
				if (attr == "opacity") {
					obj.style.filter = "alpha(opacity:" + (icur + speed) + ")";
					obj.style.opacity = (icur + speed) / 100;
				} else {
					obj.style[attr] = icur + speed + "px";
				}
			} 
			else {
				flag = true;
			}
		}
		if (flag) { //
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, 10);
}