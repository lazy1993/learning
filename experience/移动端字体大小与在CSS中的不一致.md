# 移动端字体大小与在 CSS 中的不一致

做手机端页面时，可能会遇到了一个奇怪的问题：字体的显示大小，与在CSS中指定的大小不一致。什么鬼！！！  

随后开始对一顿排查：某个标签引起的？某个CSS引起的？又或者是某句JS代码引起的。通过一坨坨的删代码，发现貌似都不是。  

最后只能祭出开发大杀器：面向谷歌编程...  

然后自然就是一通各种关键字进行搜索，终于有了新的发现。原来这个特性被称做「Text Autosizer」，又称「Font Boosting」、「Font Inflation」，是 Webkit 给移动端浏览器提供的一个特性：当我们在手机上浏览网页时，很可能因为原始页面宽度较大，在手机屏幕上缩小后就看不清其中的文字了。而 Font Boosting 特性在这时会自动将其中的文字字体变大，保证在即不需要左右滑动屏幕，也不需要双击放大屏幕内容的前提下，也可以让人们方便的阅读页面中的文本。  

> 许多网页还没有用手机开发，智能手机浏览器和桌面浏览器渲染网页时在一些地方有不同。他们不是以设备屏幕宽度布局网页，而是用比屏幕宽一些的视窗去布局网页，通常是800到1000像素。为了将视窗上的布局映射到原始设备屏幕上，手机浏览器要么只渲染整个页面的一部分，要么将视窗缩放至原始屏幕大小。  
> 因为缩放适配小屏幕而导致文字会变得很小，许多手机浏览器会使用文本溢出算法让文本变大而更易读。当一个包含文本的元素宽度用了100%，他的文本大小会增加直到达到一个易读的大小，但是不会修改布局。  

在查找问题的同时，也找到了一些解决方案：  
    1、手动指定 viewport width=320，这时 Font Boosting 不会被触发。（后边可以知道，这个说法不严谨，在其他设置均为默认值时，这一条才有效）  
    2、Font Boosting 仅在未限定尺寸的文本流中有效，给元素指定宽高，就可以避免 Font Boosting 被触发。  
    3、显然第 2 条方案是有缺陷的，文本内容不可能都指定宽高。不过还好，我们通过指定 max-height 也是可以的。比如 body * { max-height: 999999px; } 就可以无副作用的禁掉 Font Boosting 特性。当然，我觉得没必要使用通用选择器，用类似 p { max-height: 999999px; } 可能更好一些。  
    4、在meta里面加入devide-width或者initial-scale可以限制缩放的。  
    5、text-size-adjust：auto | none | ，兼容性：chrome 54+、edge、opera 42+，其他未实现（20190520）  

> [Font Boosting](https://github.com/amfe/article/issues/10)  

解决方案已经有了，下面是选读部分，均摘录自上面的文章。  

简单说来，Font Boosting 的计算规则伪代码如下：  
```js
multiplier = Math.max(1, deviceScaleAdjustment * textScalingSlider * systemFontScale * clusterWidth / screenWidth);
if (originFontSize < 16) {
    computedFontSize = originFontSize * multiplier;
}
else if (16 <= originFontSize <= (32 * multiplier - 16)) {
    computedFontSize = (originFontSize / 2) + (16 * multiplier - 8);
}
else if (originFontSize > (32 * multiplier - 16)) {
    computedFontSize = originFontSize;
}
```

其中变量名解释如下:  
  * originFontSize: 原始字体大小  
  * computedFontSize: 经过计算后的字体大小  
  * multiplier: 换算系数，值由以下几个值计算得到  
      * deviceScaleAdjustment: 当指定 viewport width=device-width 时此值为 1，否则值在 1.05 - 1.3 之间，有专门的计算规则  
      * textScalingSlider: 浏览器中手动指定的缩放比例，默认为 1  
      * systemFontScale: 系统字体大小，Android设备可以在「设备 - 显示 - 字体大小」处设置，默认为 1  
      * clusterWidth: 应用 Font Boosting 特性字体所在元素的宽度  
      * screenWidth: 设备屏幕分辨率（DIPs, Density-Independent Pixels），如 iPhone 5 为 320  
