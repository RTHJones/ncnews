const ENV = process.env.NODE_ENV || 'development';
const secret = require('./sensitiveData')

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: 'be_nc_news',
      username: secret.username,
      password: secret.password
    },
  },
  test: {
    connection: {
      database: 'be_nc_news_test',
      username: secret.username,
      password: secret.password
    },
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
