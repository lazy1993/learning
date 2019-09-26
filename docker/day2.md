# docker

## day2

### docker run

#### 覆盖 Dockerfile 镜像的默认配置

有四个 Dockerfile 命令不能被运行时覆盖：FROM（基础镜像）, MAINTAINER（维护者）, RUN（运行的命令）, and ADD（添加）。   

docker 批量删除 没有标签的镜像命令（windows下）：docker rmi $((docker images | findstr "none") | %{($_ -split "\s+")[2]})

docker 主机和容器共享文件夹（--mount type=bind）：

```
docker run -d \
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  nginx:latest
```

```bash
docker run `
--mount type=bind,source="${pwd}/dist.zip",target=/APP/dist.zip `
--mount type=bind,source="${pwd}/dist",target=/APP/dist `
gujing-test uat 1004 1.0.05
```

> 使用 --mount 共享的文件夹或者文件必须存在