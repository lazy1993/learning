# docker

## day 1

> [docker 中文文档](http://www.dockerinfo.net/document)  
# ### [Docker概述](http://www.dockerinfo.net/document)

Docker 是一个开源项目，诞生于 2013 年初，最初是 dotCloud 公司内部的一个业余项目。它基于 Google 公司推出的 Go 语言实现。 项目后来加入了 Linux 基金会，遵从了 Apache 2.0 协议，项目代码在 [GitHub](https://github.com/docker/docker) 上进行维护。

Docker 项目的目标是实现轻量级的操作系统虚拟化解决方案。 Docker 的基础是 Linux 容器（LXC）等技术。

在 LXC 的基础上 Docker 进行了进一步的封装，让用户不需要去关心容器的管理，使得操作更为简便。用户操作 Docker 的容器就像操作一个快速轻量级的虚拟机一样简单。

容器是在操作系统层面上实现虚拟化，直接复用本地主机的操作系统，而传统方式则是在硬件层面实现。

### 安装

我使用的是 windows ，所以下面的教程为 windows 下的安装教程。  

[英文文档 - windows安装docker](https://docs.docker.com/docker-for-windows/install/)  

文档目前推荐使用：安装桌面版 docker 。  

安装之前有几个说明：  

1. windows 系统下的桌面版 docker 需要 Microsoft Hyper-V  

2. 安装完成需要注销才能生效

3. 注销再次登录后会询问是否需要重启以开启 Hyper-V

4. 所以要先保存好文件  

系统要求：  

- Windows 10 64bit: Pro, Enterprise or Education (Build 15063 or later).
- Virtualization is enabled in BIOS. Typically, virtualization is enabled by default. This is different from having Hyper-V enabled. For more detail see[Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled) in Troubleshooting.
- CPU SLAT-capable feature.
- At least 4GB of RAM.

[下载地址](https://hub.docker.com/editions/community/docker-ce-desktop-windows)   

进入之后提示需要登录才能免费下载，由于没有帐号，所以先注册了一个帐号再登录。下载包比较大，800多 M。  

一顿操作之后，启动 docker （如果已经启动了就不用管），然后可以在任意终端操作 docker 了。  

下面运行一些命令测试：

1. Open a terminal window (Command Prompt or PowerShell, *but not* PowerShell ISE).

2. Run `docker --version` to ensure that you have a supported version of Docker:

   ```
   > docker --version
   
   Docker version 18.03.0-ce, build 0520e24
   ```

3. Pull the [hello-world image](https://hub.docker.com/r/library/hello-world/) from Docker Hub and run a container:

   ```
   > docker run hello-world
   
   docker : Unable to find image 'hello-world:latest' locally
   ...
   
   latest:
   Pulling from library/hello-world
   ca4f61b1923c:
   Pulling fs layer
   ca4f61b1923c:
   Download complete
   ca4f61b1923c:
   Pull complete
   Digest: sha256:97ce6fa4b6cdc0790cda65fe7290b74cfebd9fa0c9b8c38e979330d547d22ce1
   Status: Downloaded newer image for hello-world:latest
   
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   ...
   ```

4. List the `hello-world` *image* that was downloaded from Docker Hub:

   ```
   > docker image ls
   ```

5. List the `hello-world` *container* (that exited after displaying “Hello from Docker!”):

   ```
   > docker container ls --all
   ```

6. Explore the Docker help pages by running some help commands:

   ```
   > docker --help
   > docker container --help
   > docker container ls --help
   > docker run --help
   ```

### Image 镜像

在 Docker 的术语里，一个只读层被称为镜像，一个镜像是永久不会变的。  

1. 父镜像：每一个镜像都可能依赖于由一个或多个下层的组成的另一个镜像。我们有时说，下层那个 镜像是上层镜像的父镜像。  
2. 基础镜像：一个没有任何父镜像的镜像，谓之基础镜像。  
3. 镜像ID：所有镜像都是通过一个 64 位十六进制字符串 （内部是一个 256 bit 的值）来标识的。 为简化使用，前 12 个字符可以组成一个短ID，可以在命令行中使用。短ID还是有一定的 碰撞机率，所以服务器总是返回长ID。  