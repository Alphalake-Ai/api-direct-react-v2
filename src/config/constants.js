// export const baseUrl = 'http://localhost:4000/api';
// export const baseUrl = window.location.origin+"/api";
export const baseUrl =  window.location.href.startsWith('https') ? 'https://apidirect.healthcare:8443' : 'http://apidirect.healthcare:5000' ;
// export const baseUrl = 'http://apidirect.healthcare:5000'