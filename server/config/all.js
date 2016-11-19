
module.exports = {
  env: 'development',
  secret: 'server',
  db: {
    database: 'stock_price',
    host: 'localhost',
    port: 5306,
    user: '',
    password: '',
    connectionLimit: 10
  }
};