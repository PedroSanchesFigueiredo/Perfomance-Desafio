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
    http_req_duration: ['p(95)<500'], 
  },
};

export function handleSummary(data) {
  return {
    "summaryApiBuscarImovelRio.html": htmlReport(data),
  };
}

// Url de API
export default function () {
  let url = 'https://seazone.com.br/_next/data/FKhJANM4ye6R2Ci2FLpKo/resultados-da-busca/rio-de-janeiro.json?id=33&destinationName=Rio+de+Janeiro&checkin=&checkout=&adults=1&kids=0&babies=0&page=1&destination=rio-de-janeiro';
  let res = http.get(url);

  //ASSERT
  check(res, {
    'Status 200': (r) => r.status === 200,
  });

  sleep(1); 
}
