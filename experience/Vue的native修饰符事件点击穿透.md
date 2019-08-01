# Vue native修饰符 事件发生点击穿透

现象描述：点击按钮，弹窗没有打开；长按按钮，弹窗打开；点击事件绑定已经阻止冒泡了。  

下面是出现 bug 的代码：   

```js
<x-button
	@click.native.stop="$emit('left-click')"
>我是按钮</x-button>
```

bug 定位：


1. 弹窗没有打开不是没有触发打开弹框的代码，而是被其他地方的代码将弹框关闭了。  
2. 关闭弹框的代码是由遮罩点击事件触发的。  

bug 产生原因：用户触发 touchend 事件 -》fastclick 触发 click 事件 -》 开弹框（同时遮罩层被打开） -》 300 ms 后 原生的 click 事件触发（不清楚原因）-》 mask 上的 onClick 绑定处理函数执行 -》 关闭 mask

```js
	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};
```

长按能够正常弹框的逻辑：

长按操作触发的 click 事件，fastclick 不会做拦截处理，故能够正常触发。   

```js

	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
		
		....
		
	
		// 如果 onTouchEnd 和 onTouchStart 触发间隔时间大于 tapTimeout 则不触发后续逻辑
		// 也就是 300ms 后会正常触发一次点击事件
		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		...


		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the allowlist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};
```

简单讲一下 fastclick 原理：  

​	1. 如果开发者绑定了一个 click 事件， 则 fastclick 初始化的时候绑定 5 个 对应事件；

```js
		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);
```

2. 如果用户触发了一个 click 事件，则运行流程为：

   1. 触发 onTouchStart 事件

      ```js
      	FastClick.prototype.onTouchStart = function(event) {
      
      		。。。
      
      		// 这个标志
      		this.trackingClick = true;
      		this.trackingClickStart = event.timeStamp;
      
      		。。。
          
      		return true;
      	};
      ```

   2. 触发 onTouchmove 事件，这个忽略

   3. 触发 onTouchEnd 事件

      ```js
      FastClick.prototype.onTouchEnd = function(event) {
      		...
          // onTouchStart 已经设置为真 所以会继续运行下去
      		if (!this.trackingClick) {
      			return true;
      		}
      
          // 如果是长按，则不做任何处理
      		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
      			return true;
      		}
        。。。
      
      		// 重置标志位 为 false
      		this.trackingClick = false;
      
      
      		// 取消默认事件，触发一个合成的点击事件
          // 也就是实现了立即触发点击事件，而没有 300 ms 延迟
      		if (!this.needsClick(targetElement)) {
      			event.preventDefault();
      			this.sendClick(targetElement, event);
      		}
      
      		return false;
      	};
      ```

   4. 300 ms 后触发 onClick 事件

      ```js
      	FastClick.prototype.onClick = function(event) {
      		var permitted;
      
      		// trackingClick 为真，说明在 onTouchEnd 触发之前就被触发了 onClick
      		if (this.trackingClick) {
      			this.targetElement = null;
      			this.trackingClick = false;
      			return true;
      		}
          
          permitted = this.onMouse(event);
      	};
      ```

      