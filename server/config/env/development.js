
module.exports = {
  env: 'development',
  secret: 'stock_price',
  db: {
    database: 'stock_price',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'dmdtka',
    connectionLimit: 10,
    multipleStatements: false
  }
};