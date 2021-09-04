import {Middleware, ServerMiddleware} from '@nuxt/types';

const logger:ServerMiddleware = (req, res, next)=>{
  console.log('req.url',req.url)
  next()
}
