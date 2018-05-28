:: 生成客户端私钥、CSR、签名证书
openssl genrsa -out client.key 1024
openssl req -new -key client.key -out client.csr
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt