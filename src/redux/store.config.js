if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  module.exports = require('./store.prod.js');
} else {
  module.exports = require('./store.dev.js');
}
