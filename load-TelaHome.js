import http from 'k6/http';
import { sleep } from 'k6';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 1000, 
  duration: '1m', 
};

export function handleSummary(data) {
  return {
    "summaryload-TelaHome.html": htmlReport(data),
  };
}

export default function () {
  let url = 'https://seazone.com.br/';

  // Realiza a solicitação HTTP GET para a página e mede o tempo de resposta
  let startTime = new Date();
  let res = http.get(url);
  let endTime = new Date();

  check(res, {
    'Status 200': (r) => r.status === 200,
  });

  // Calcula o tempo de resposta da página
  let responseTime = endTime - startTime;

  check(responseTime, {
    'Tempo de resposta abaixo do limite': (t) => t < 2000,
  });

  // Aguarda 1 segundo antes de fazer a próxima solicitação
  sleep(5);
}
