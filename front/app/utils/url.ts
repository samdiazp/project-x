export const getBackendUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000'
  }
  return 'http://backend:8000'
}

export const getFrontendUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return '0.0.0.0:3000'
}


export const getRedisUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '127.0.0.1'
  }
  return 'redis'
}
