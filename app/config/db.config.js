module.exports = {
  HOST: "db4free.net",
  USER: "amakenzi",
  PASSWORD: "Amakenzi1997!",
  DB: "mydbnode",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
