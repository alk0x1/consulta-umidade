# Weather API - Verificação de Umidade com Alerta

Esta aplicação backend permite ao usuário consultar a umidade de uma localização específica, utilizando a API do OpenWeather. Se a umidade atual for maior que o valor informado pelo usuário, um alerta será gerado.

## Funcionalidades

- Receber um valor de umidade e uma localização (latitude e longitude).
- Consultar a API do OpenWeather para obter a umidade atual do local informado.
- Comparar o valor de umidade retornado pela API com o valor informado pelo usuário.
- Retornar um alerta se o valor da API for maior, ou uma mensagem informando que a umidade está dentro do limite.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **NestJS** - Framework usado para estruturar a aplicação
- **Axios** - Para fazer requisições HTTP
- **OpenWeather API** - API usada para consultar os dados de umidade
- **Swagger** - Para documentação e teste da API
- **Jest** - Para testes unitários

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (ou **yarn**)
- Conta na [OpenWeather](https://openweathermap.org/api) para obter uma chave de API.

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/seu-usuario/weather-api.git
    cd weather-api
    ```

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto com a sua chave de API do OpenWeather:
    ```bash
    OPENWEATHER_API_KEY=your_openweather_api_key
    ```

4. Inicie a aplicação:
    ```bash
    npm run start
    ```

## Endpoints

### Verificar Umidade

#### POST `/weather/check-humidity`

Este endpoint recebe um valor de umidade e uma localização (latitude e longitude). Ele consulta a API do OpenWeather para obter a umidade atual e retorna uma mensagem comparando os valores.

#### Exemplo de Requisição:

```json
{
  "humidity": 60,
  "latitude": -25.42778,
  "longitude": -49.27306
}
```

#### Exemplo de Resposta (Alerta):
```json
{
  "message": "Alerta: A umidade atual é de 70%, que é maior que o valor informado de 60%",
}
```

#### Exemplo de Resposta (Dentro do Limite):
```json
{
  "message": "A umidade atual é de 50%, que está dentro do limite informado de 60%",
}
```

## Documentação da API (Swagger)
A documentação gerada automaticamente pode ser acessada em:

```bash
http://localhost:3000/api-docs
```
Você pode visualizar todos os endpoints, parâmetros e testar as requisições diretamente na interface do Swagger.

## Testes
Para rodar os testes unitários, utilize o comando:
```bash
npm run test
```

## Estrutura do Projeto
```
src/
│
├── controllers/
│   └── openweather.controller.ts  # Controller responsável pelos endpoints de consulta de umidade
│
├── dto/
│   └── get-humidity.dto.ts  # Data Transfer Object para receber os parâmetros de umidade e localização
│
├── services/
│   └── openweather.service.ts  # Serviço responsável pela integração com a API do OpenWeather
│
├── tests/
│   └── openweather.controller.spec.ts  # Testes unitários do controller
│
├── main.ts  # Arquivo principal que inicia a aplicação e configura o Swagger
│
└── app.module.ts  # Módulo principal do NestJS que organiza os controllers e serviços
```

