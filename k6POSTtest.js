import http from 'k6/http';
import { check, sleep } from 'k6';
import generateSeedData from './server/database/generateSeedData.js';

const BASE_URL = 'http://localhost:3002';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 1000,
      maxVUs: 1000,
    },
  },
};

var id = 10000001;

export default function () {
  let data = generateSeedData(id);
  id++;
  let responses = http.batch([
    ['POST', `${BASE_URL}/api/sizes/`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }]
  ]);
  check(responses[0], {
    'add size': (res) => res.status === 200,
  });
}