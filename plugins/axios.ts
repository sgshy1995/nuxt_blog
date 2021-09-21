import https from 'https';

const axiosConfig = ({$axios, redirect})=>{

  // https self-signed ssl
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

  $axios.onRequest((config)=>{
    console.log('config',config)
    if (config.method==='options'){
      console.log('options')
    }
    if (process.browser){
      const token = localStorage.getItem('BLOG_KOA_TOKEN')
      if (token) config.headers['Authorization'] = token
      return config
    }
  })
}

export default axiosConfig;
