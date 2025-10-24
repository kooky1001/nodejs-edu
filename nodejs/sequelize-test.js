const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});
const User = require('../models/user.js')
const Topic = require('../models/topic.js')

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}

// test();

async function init() {
  // await sequelize.sync();
  await User.sync({force: true});
  await Topic.sync({force: true});
  
  const user = await User.create({name: 'bestuser', user_id: 'best', password: 'best'});
  console.log('user', user.toJSON())
  const topic = await Topic.create({title: 'test title', description: 'test desc....', user_id: user.id});
  console.log('topic', topic.toJSON())
  const list = await Topic.findAll();
  const test2 = list[0].getUsers();
  console.log('test2', test2);
  const list2 = await User.findAll();
  const test = await list2[0].getTopics();
  console.log('test', test);
}

init();