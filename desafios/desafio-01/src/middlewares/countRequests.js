function countRequest(_req, _res, next) {
  console.count("Número de requisições");
  next();
}

module.exports = countRequest;
