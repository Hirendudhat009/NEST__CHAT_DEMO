module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'chat-demo',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  seeds: ['src/seeds/**/*{.ts}'],
  factories: ['src/factories/**/*{.ts}'],

  timezone: '+00:00',
}