# **angular-charts**

## **Passos de construção**
---

## **Sumário**
[1. Sem Docker](#without-docker)  
[2. Com Docker](#with-docker) 

<a name="without-docker"></a>
## 1. **Without Docker**
### **Requer o cliente para construção do REST API falso (Backend)**
    npm install -g json-server

### **Executando a API falsa**

A partir do diretório raiz do projeto, execute o seguinte comando:

    json-server --watch ./backend/data.json --port 4000 -H 0.0.0.0
    
Onde: 
- `--watch ./backend/data.json` especifica o endpoint `/results`;
- `--port 4000` especifica o acesso de conexão do cliente, através da porta 4000;
- `-H 0.0.0.0` aceita conexões de qualquer endereço IP do host através da LAN (necessário com Docker).

Em seguida, você pode acessar os seguintes endpoints:
- [http://localhost:4000](http://localhost:4000) - o endpoint raiz da API falsa.
- [http://localhost:4000/results](http://localhost:4000/results) - o endpoint /results do arquivo `data.json` simulado.

### **CLI necessário para o aplicativo Web Angular (Frontend).**
    npm install -g @angular/cli

### **Instalando as dependências do aplicativo Web Angular**

A partir do diretório raiz do projeto, execute os seguintes comandos:

    cd ./frontend
    npm install

### **Executando o aplicativo Web**

A partir do diretório frontend do projeto, execute o seguinte comando:

    ng serve --open --host 0.0.0.0 --disable-host-check
  
Onde:
- `ng serve --open` inicia o servidor na porta 4200; e
- `--host 0.0.0.0 --disable-host-check` aceita conexões de qualquer endereço IP do host sem verificação.

Em seguida, você pode acessar o aplicativo web a partir da seguinte URL:
- [http://localhost:4200](http://localhost:4200) - que requer que a API falsa já esteja em execução.

<a name="with-docker"></a>
## 2. **Com Docker**

Vamos configurar dois arquivos Dockerfile para construção das imagens (Backend e Frontend):

    docker build . -t fake-backend -f ./backend/Dockerfile
    docker build . -t angular-charts-frontend -f ./frontend/Dockerfile

Em seguida, execute os contêineres:

    docker run --rm -p 4000:4000 -d --name fake-backend_container fake-backend
    docker run --rm -p 4200:4200 -d --name angular-charts-frontend_container angular-charts-frontend

Agora, você já pode acessar o aplicativo web através da seguinte URL:
- [http://localhost:4200](http://localhost:4200)