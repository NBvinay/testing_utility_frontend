import axios from 'axios';
export const ibm = axios.create({
      baseURL: 'http://127.0.0.1:8000/', //django backend 
      headers: {
            'Content-Type': 'application/json'
      }
});
