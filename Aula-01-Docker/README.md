# aula-01 - Trabalhando com Docker

### Atividade 1 - **ubuntu_curl** 
____________________

Pode ser necessário alterar o DNS da imagem para o do Google, pois o DNS padrão pode não funcionar.

Construa o seguinte Arquivo `Dockerfile`

**Dockerfile**

```dockerfile
FROM ubuntu:latest
RUN echo "nameserver 8.8.8.8" | tee /etc/resolv.conf > /dev/null \
    && apt-get update \
    && apt-get install -y curl
```

**Criação da imagem**

```bash
docker build  docker build -t ubuntu-curl -f ./aula-01/Dockerfile .
```

**Instanciando o container e entrando no bash de forma interativa**

```bash
docker run -it ubuntu /bin/bash
```

- onde -i é para interativo e -t é para terminal (tty)

**Versionando a imagem**

```bash
docker tag ubuntu-curl:latest <dockerhub_user>/ubuntu-curl:latest
```

**Enviando a imagem ao dockerhub**
    
```bash
docker push <dockerhub_user>/ubuntu-curl:latest
```

### Atividade 2 - **conversao-temperatura**
____________________

Construa o seguinte arquivo Dockerfile.

**Dockerfile**
    
```docker
FROM node:18-alpine3.17
WORKDIR /app
COPY package.json /app
RUN npm install
# Se vamos instalar os pacotes dentro do container, vamos ignorar node_modules durante a cópia
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```
Como o node_modules é gerado pelo npm install, não precisamos copiar ele para dentro do container, pois ele é gerado dentro do container. Logo, utilizamos o .dockerignore para ignorar o diretório node_modules.

**.dockerignore**
    
```docker
#ignora node_modules
node_modules
```

**Criação da imagem**

```bash
docker build -t conversao-temperatura -f ./aula-01/conversao-temperatura/Dockerfile .
```

**Instanciando o container e executando-o**
    
    ```bash
    docker run -d -p 8080:8080 conversao-temperatura
    ```
    
- onde -d é para rodar em background (*desvinculado* do container) e -p é para mapear a porta 8080 do container para a porta 8080 da máquina host.
