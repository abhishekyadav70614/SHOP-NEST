// Async route me error aaye to server crash na ho, error handler tak pahunche
module.exports = fn => (req, res, next) => fn(req, res, next).catch(next);