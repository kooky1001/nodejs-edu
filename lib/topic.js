const db = require('./db');

function getTopicList() {
  return new Promise((resolve, reject) => {
    db.all(`select * from topic`, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
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
  var pageId = request.params.pageId;
  const results = await getTopicList();
  db.get(`select topic.*, member.name from topic left outer join member on topic.member_id = member.id where topic.id=?`,[pageId],function(error, result){
    if (error) throw error;
    const title = result.title;
    const description = result.description;
    const topicList = results;
    const name = result.name;
    const id = result.id;
    const data = {title, description, topicList, name, id}
    isLogined(request, data);
    response.render('topic/page', data);
  });
}

exports.create = async function(request,response){
  const results = await getTopicList();
  db.all(`select * from member`, function(error, authors){
    if (error) throw error;
    const topicList = results;
    const authorList = authors;
    const data = {topicList, authorList}
    isLogined(request, data);
    response.render('topic/create', data);
  });
}

exports.create_process = function(request, response){
  var post = request.body;
  db.run(`insert into topic(title,description,member_id,created_at) values(?,?,?,datetime('now','localtime'))`,
  [post.title, post.description, post.author],function(error, result){
    console.log(result);
    if (error) throw error;
    response.redirect(`/topic/${this.lastID}`);
  });
}

exports.update = async function(request,response){
  const results = await getTopicList();
  db.get(`select * from topic where id=?`, [request.params.pageId], function(error, result){
    if (error) throw error;
    db.all(`select * from member`, function(error3, authors){
      if (error3) throw error3;
      const topicList = results;
      const authorList = authors;
      const topic = result;
      const data = {topicList, authorList, topic}
      isLogined(request, data);
      response.render('topic/update', data);
    });
  });
}

exports.update_process = function(request,response){
  var post = request.body;
  db.run(`update topic set title=?, description=?, member_id=? where id=?`,
  [post.title, post.description, post.author, post.id], function(error,result){
    if (error) throw error;
    response.redirect(`/topic/${post.id}`);
  });
}

exports.delete_process = function(request, response){
  var post = request.body;
  db.run(`delete from topic where id=?`, [post.id], function(error, result){
    if (error) throw error;
    response.redirect(`/topic/`);
  });
}