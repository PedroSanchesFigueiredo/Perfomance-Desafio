https://k6.io/docs/

## K6 para testes de desempenho

- Ferramenta Open Source (código aberto) que nos possibilita reutilizar testes
- Ferramenta CLI para executar, evitando consumo desnecessário de memória por GUI
- Regressão de Testes de forma automatizada
- Scripts escritos em JS
- K6 pode ser utilizado por dev e QA para testes de desempenho de web service

### Features
- É possível converter Collections (postman) para o K6 (JS)
- É possível converter Jmx (Jmeter) para o K6 (JS)
- Interface grática para executar os testes via Test Builder https://k6.io/docs/test-authoring/test-builder/
- Gravar caminho do sistema para executar o teste com K6 via Browser Recorder

- K6 GUI

Inspired in Postman API Builder. Codeless UI tool to generate a k6 test quickly.

https://k6.io/docs/test-authoring/test-builder/

- K6 Browser Recorder

Record a user journey to base your k6 test.

https://k6.io/docs/test-authoring/recording-a-session/browser-recorder/


### Download
Instalador para Windows via [link](https://dl.k6.io/msi/k6-latest-amd64.msi])

### Convertendo Postman para K6
É muito importante utilizar somente funções Javascript para Pré-request ou Assertions (Test) na Collection (Postman), recomenda-se converter todas as funções PM para funções de JS nativo.

Instalar o pacote 

`npm i -g postman-to-k6`

Converter a collection (.json) para javascript (.js)

`postman-to-k6 nomecollection.json -o nomeDesejado.js`

### Convertendo JMeter para K6
Pendente.

### Asserções
```javascript
  check(res, {
    'Status 200': (r) => r.status === 200,
  });
```

### Estratégias de Execução

![imagem](https://i.imgur.com/9OZeOPl.png)

- Testes de desempenho para API 
 - Teste de Carga (api-testesCarga.js)
 - Teste de Desempenho (api-testesDesempenho.js)
 - Teste de Stress (api-testesStress.js)

- Testes de desempenho para Web (website-load.js)

- Stages

A configuração a seguir teria k6 aumentando de 1 para 10 VUs por 3 minutos, então permanecendo estável em 10 VUs por 5 minutos, então aumentando de 10 para 35 VUs nos próximos 10 minutos antes de finalmente descer para 0 VUs para outro 3 minutos.
```javascript
export let options = {
  stages: [
    { duration: '3m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '10m', target: 35 },
    { duration: '3m', target: 0 },
  ],
};
```

- Thresholds

Uma coleção de especificações de limite para configurar sob quais condições um teste é considerado bem-sucedido ou não, quando foi aprovado ou reprovado, com base em dados métricos. Para saber mais, dê uma olhada na documentação de Limites. Disponível em comandos de execução k6.

```javascript
  thresholds: {
    http_req_duration: ['p(95)<500'], // Define o limite de 500ms para o tempo de resposta da API (95% das solicitações devem estar abaixo disso)
  },
};
```

- VUs

Um valor inteiro que especifica o número de VUs a serem executadas simultaneamente, usado junto com as iterações ou opções de duração. Se você quiser ter mais controle, olhe para as opções de estágios ou cenários.

```javascript
export let options = {
  vus: 10,
  duration: '1h',
};
```

### Datadriven
https://k6.io/docs/examples/data-parameterization/

## Relatórios HTML
Vai ser gerado um arquivo HTML ao final da execução dos testes. Requer dependência k6-reporter e handleSummary.
```javascript
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
```

### Relatório - Grafana - InfluxDB
https://k6.io/docs/results-visualization/influxdb-+-grafana/


### Rodando um Teste
Script de testes
-Salvar como script.js
```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```
Executando o Script

`k6 run script.js`




https://www.sitepen.com/blog/performance-testing-with-k6
