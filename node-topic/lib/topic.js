const { where } = require('sequelize');
const Topic = require('../models/topic');
const User = require('../models/user');

async function getTopicList() {
  return await Topic.findAll({
    attributes: ['id', 'title'],
  });
  // return new Promise((resolve, reject) => {
  //   db.all(`select * from topic`, (err, result) => {
  //     if (err) {
  //       reject(err);
  //     }
  //     resolve(result);
  //   });
  // });
}

function isLogined(req, data) {
  const user = req.user;
  console.log(user);
  if (user) {
    data.user = user;
  } else {
    data.user = null;
  }
}

exports.home = async function(request,response){
  try {
    const results = await getTopicList();
    const title = 'Welcome';
    const description = 'Hello, Node.js';
    const list = results;
    const data = {
      title: title, 
      description: description, 
      topicList: list,
    }
    isLogined(request, data);
    response.render('topic/list', data);
  } catch(e) {
    throw e;
  }
}

exports.page = async function(request,response){
  const pageId = request.params.pageId;
  const list = await getTopicList();
  const topic = await Topic.findOne({
    where: {
      id: pageId
    }
  });
  let name = null;
  if (topic.user_id) {
    const user = await User.findOne({
      attributes: ['name'],
      where: {
        id: topic.user_id
      }
    })
    name = user.name;
  }
  
  const title = topic.title;
  const description = topic.description;
  const topicList = list;
  const id = topic.id;
  const data = {title, description, topicList, id, name}
  isLogined(request, data);
  response.render('topic/page', data);

  // db.get(`select topic.*, member.name from topic left outer join member on topic.member_id = member.id where topic.id=?`,[pageId],function(error, result){
  //   if (error) throw error;
  //   const title = result.title;
  //   const description = result.description;
  //   const topicList = results;
  //   const name = result.name;
  //   const id = result.id;
  //   const data = {title, description, topicList, name, id}
  //   isLogined(request, data);
  //   response.render('topic/page', data);
  // });
}

exports.create = async function(request,response){
  const results = await getTopicList();
  const topicList = results;
  const data = {topicList}
  isLogined(request, data);
  response.render('topic/create', data);
}

exports.create_process = async function(request, response){
  const post = request.body;
  const data = {
    title: post.title,
    description: post.description,
  }

  if (request.isAuthenticated()) {
    data.user_id = request.user.id
  }

  const result = await Topic.create(data);
  response.redirect(`/topic/${result.id}`);

  // db.run(`insert into topic(title,description,member_id,created_at) values(?,?,?,datetime('now','localtime'))`,
  // [post.title, post.description, request.user.id],function(error, result){
  //   if (error) throw error;
  //   response.redirect(`/topic/${this.lastID}`);
  // });
}

exports.update = async function(request,response){
  const results = await getTopicList();
  const topic = await Topic.findOne({
    where: {id: request.params.pageId}
  });
  const topicList = results;
  const data = {topicList, topic}
  isLogined(request, data);
  response.render('topic/update', data);

  // db.get(`select * from topic where id=?`, [request.params.pageId], function(error, result){
  //   if (error) throw error;
  //   const topicList = results;
  //   const topic = result;
  //   const data = {topicList, topic}
  //   isLogined(request, data);
  //   response.render('topic/update', data);
  // });
}

exports.update_process = async function(request,response){
  const post = request.body;
  const data = {
    title: post.title,
      description: post.description,
  }
  await Topic.update(
    data, {
      where: {
      id: post.id
    }
  });
  response.redirect(`/topic/${post.id}`);
  
  // db.run(`update topic set title=?, description=?, member_id=? where id=?`,
  // [post.title, post.description, request.user.id, post.id], function(error,result){
  //   if (error) throw error;
  //   response.redirect(`/topic/${post.id}`);
  // });
}

exports.delete_process = async function(request, response){
  var post = request.body;
  await Topic.destroy({
    where: {
      id: post.id
    }
  });
  response.redirect(`/topic/`);

  // db.run(`delete from topic where id=?`, [post.id], function(error, result){
  //   if (error) throw error;
  //   response.redirect(`/topic/`);
  // });
}