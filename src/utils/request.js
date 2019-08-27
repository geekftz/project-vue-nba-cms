import axios from 'axios'

var request = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5d649b214ead1e07bacd7233/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default request