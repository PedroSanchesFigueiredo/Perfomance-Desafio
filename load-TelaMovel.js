import http from 'k6/http';
import { sleep } from 'k6';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 10, // Número de usuários virtuais (simultâneos) a serem simulados
  duration: '1m', // Duração do teste
};

export function handleSummary(data) {
  return {
    "summaryload-TelaMovel.html": htmlReport(data),
  };
}

export default function () {
  // URL da página que você deseja testar
  let url = 'https://seazone.com.br/acomodacoes/lindo-apto-em-bc-a-2min-do-mar-erg605/384/2023-07-30;2023-08-04/adults=1;kids=0;babies=0';

  // Realiza a solicitação HTTP GET para a página e mede o tempo de resposta
  let startTime = new Date();
  let res = http.get(url);
  let endTime = new Date();

  // Verifica se a resposta tem o status 200 (OK)
  check(res, {
    'Status 200': (r) => r.status === 200,
  });

  // Calcula o tempo de resposta da página
  let responseTime = endTime - startTime;

  // Verifica se o tempo de resposta está abaixo do limite de 1000ms (1 segundo)
  check(responseTime, {
    'Tempo de resposta abaixo do limite': (t) => t < 1000,
  });

  // Aguarda 1 segundo antes de fazer a próxima solicitação
  sleep(5);
}
