import axios from 'axios';
import { OnRun } from './OnRun';

const api = axios.create({
  baseURL: OnRun,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

export default api;
