:: 服务器向CA申请签名证书：创建CSR文件、向CA机构申请签名
openssl req -new -key server.key -out server.csr
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt