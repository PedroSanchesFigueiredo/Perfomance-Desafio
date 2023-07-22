import http from 'k6/http';
import { sleep } from 'k6';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // 5 usuários simulados durante 1 minuto
    { duration: '3m', target: 500 }, // Manter 50 usuários por mais 3 minutos
    { duration: '1m', target: 300 }, // Encerrar gradualmente os usuários em 1 minuto
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Define o limite de 500ms para o tempo de resposta da API (95% das solicitações devem estar abaixo disso)
  },
};

export function handleSummary(data) {
  return {
    "summaryAPIDatas.html": htmlReport(data),
  };
}

export default function () {
  let url = 'https://seazone-reservas.vercel.app/api/properties/availability_dates?propertyId=37&checkinDate=2023-07-01&checkoutDate=2023-07-31';
  let res = http.get(url);

  //ASSERT
  check(res, {
    'Status 200': (r) => r.status === 200,
  });


  sleep(1); // Aguarda 1 segundo antes de fazer a próxima solicitação
}
