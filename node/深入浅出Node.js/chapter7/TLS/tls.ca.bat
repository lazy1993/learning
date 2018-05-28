:: 自签名证书（扮演CA角色需要的证书）：生成私钥、生成CSR文件、通过私钥自签名生成证书
openssl genrsa -out ca.key 1024
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt