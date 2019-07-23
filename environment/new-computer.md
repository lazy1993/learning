# 新电脑装机软件

## 必备软件

### chrome
[下载地址](https://www.google.cn/intl/zh-CN/chrome/)  
直接下载，无需搭梯子。

### Visual Studio Code  
[下载地址](https://code.visualstudio.com/)  

软件下载地址：  

### node
http://nodejs.cn/download/  
选择安装路径，然后一直 next  
安装完成后测试一下：`node -v` `npm -v` 应该都会输出对应版本号  

安装 npm 源管理：nrm  [nrm —— 快速切换 NPM 源 （附带测速功能）](https://segmentfault.com/a/1190000000473869)  
安装 NVM ： [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)  
网速不好下的比较慢  
在安装目录下面增加两行镜像配置：  
node_mirror: https://npm.taobao.org/mirrors/node/   
npm_mirror: https://npm.taobao.org/mirrors/npm/  
 

安装 nrm 镜像源管理： ; npm install -g nrm  
介绍：https://segmentfault.com/a/1190000000473869  

### onenote
新电脑自动就有  

### Git
#### 下载
下载地址：
https://git-scm.com/
https://git-scm.com/download/win
下载比较慢，需要耐心等待。
选择安装位置为D盘某个地方，然后一直next。
#### 配置
* 生成 SSH key
[关于SSH的一些指引](https://help.github.com/en/articles/connecting-to-github-with-ssh)  
`ssh-keygen -t rsa -C "your.email@example.com" -b 4096`  然后下一步的时候修改那个默认文件名  
使用另一个邮箱生成另一个文件名（主要是为了同时使用gitlab和GitHub）    

然后重点要看的是[生成SSH key并且添加到GitHub 账户](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account)  
然后需要设置同时支持GitHub和gitlab，添加在 `~/.ssh` 添加 config 文件（无后缀名）  
文件示例：  
```txt
# 这是注释(xxx@qq.com)

Host github.com

HostName github.com

PreferredAuthentications publickey

IdentityFile ~/.ssh/github

User A



# (xxx@meicloud.com)

Host gitlab.meicloud.com

HostName gitlab.meicloud.com

PreferredAuthentications publickey

IdentityFile ~/.ssh/gitlab_midea

User B
```
### SVN
https://tortoisesvn.net/  
实际下载地址：https://osdn.net/projects/tortoisesvn/storage/1.12.0/Application/TortoiseSVN-1.12.0.28568-x64-svn-1.12.0.msi/  
上面那个连接很慢，但是下载很快，如果有百度网盘就不建议使用。  
百度网盘镜像（需要下载百度网盘）：https://pan.baidu.com/s/1dFuMCk5#list/path=%2F  

### Axure
[下载地址](https://www.axure.com.cn/3510/)  
汉化  
[汉化教程](https://www.axure.com.cn/2616/)  
### 微信开发者工具


### PxCook

下载地址： https://www.fancynode.com.cn/pxcook  
按照页面提示，先下载 adobe_air软件：  https://get.adobe.com/cn/air/download/?installer=Adobe_AIR_32.0_for_Win64&stype=7593&standalone=1  
然后下载 pxcook  

### GIthubDesktop
https://desktop.github.com/
下载很快，无法选择安装位置

### fiddler
### FlashFXP
### 美信
下载地址： http://im.midea.com/download/pcv5.html  
需要验证 mip 账号  
### 美的 vpn
[下载地址](https://vpn.midea.com/remote/login?lang=GB2312)  
### Xshell
### WSL
### video studio
### Xmind
https://www.xmind.cn/zen/thank-you-for-downloading/  
无法选择安装位置  
### LICEcap
录屏制作gif  
https://www.cockos.com/licecap/  
### lantern
[蓝灯下载地址](https://github.com/getlantern/download)  
下载速度很快，无法选择安装位置  
现在没有授权完全无法连接。  
### 网易有道词典
http://cidian.youdao.com/multi.html?vendor=fanyiweb  
### QQ
https://im.qq.com/download/index.shtml  
可以选择安装地址  

### 桌面版微信

下载地址：https://pc.weixin.qq.com/?t=win_weixin  

### Snipaste

截图软件，可以将截图直接放置在桌面上。直接在微软商店搜索下载的。  
或者在线下载：https://zh.snipaste.com/download.html  
