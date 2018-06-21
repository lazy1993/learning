:: 生成服务器端私钥
openssl genrsa -out server.key 1024
:: 生成客户端私钥
openssl genrsa -out client.key 1024

:: 生成服务器端公钥
openssl rsa -in server.key -pubout -out server.pem
:: 生成客户端公钥
openssl rsa -in client.key -pubout -out client.pem
