const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;
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
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
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
