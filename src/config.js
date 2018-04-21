export default {
  UPLOAD_STATEMENT: 'I AM Visiting Dravatar and I want to Upload Avatar'
}

export const uploadServer = process.env.NODE_ENV === 'production' ? '139.162.79.136' : 'localhost'

export const serverConfig = {
  server: 'https://s3-ap-northeast-1.amazonaws.com',
  bucket: 'dravatar.frankwei.xyz'
}
