
import axios, { AxiosInstance } from 'axios';

export default (cb: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('@ProffyAuth:token')}`

    return config
  }, (err) => {
    return Promise.reject(err);
  })

  api.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        originalReq.__retry = true;

        const responseRetry = axios.post('http://localhost:3333/update_refresh_token', {
          refresh_token: localStorage.getItem('@ProffyAuth:refreshToken')
        }).then(response => {
          if (response.status === 200) {
            const { refresh_token, access_token } = response.data;

            localStorage.setItem('@ProffyAuth:token', access_token);
            localStorage.setItem('@ProffyAuth:refreshToken', refresh_token);

            originalReq.headers['Authorization'] = `Bearer ${access_token}`
            return axios(originalReq)
          }
        }).catch(response => {
          console.log('dsads')
          cb()
        })

        resolve(responseRetry)
      }

      if (!err.response) {
        console.log('dddd')
        cb()
      }
      return Promise.reject(err)
    }
    )
  })

  return api
};