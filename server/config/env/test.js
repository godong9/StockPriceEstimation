
module.exports = {
  env: 'test',
  secret: 'stock_price',
  db: {
    database: 'stock_price-test',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'dmdtka',
    connectionLimit: 10,
    multipleStatements: true
  }
};