const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
module.exports = { db };
const Page = db.define('pages', {
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  content: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
});
