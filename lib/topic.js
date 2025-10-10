var db = require('./db');

exports.home = function(request,response){
  db.all(`select * from topic`, function(error, results) {
    if (error) throw error;
    const title = 'Welcome';
    const description = 'Hello, Node.js';
    const list = results;
    response.render('topic/list', {title: title, description: description, topicList: list});
  });
}

exports.page = function(request,response){
  var pageId = request.params.pageId;
  db.all(`select * from topic`, function(error, results) {
    if (error) throw error;
    db.get(`select topic.*, member.name from topic left outer join member on topic.member_id = member.id where topic.id=?`,[pageId],function(error2, result){
      if (error2) throw error2;
      const title = result.title;
      const description = result.description;
      const topicList = results;
      const name = result.name;
      const id = result.id;
      response.render('topic/page', {title, description, topicList, name, id});
    });
  });
}

exports.create = function(request,response){
  db.all(`select * from topic`, function(error, results){
    if (error) throw error;
    db.all(`select * from member`, function(error2, authors){
      if (error2) throw error2;
      const topicList = results;
      const authorList = authors;
      response.render('topic/create', {topicList, authorList});
    });
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

exports.update = function(request,response){
  db.all(`select * from topic`, function(error,results){
    if (error) throw error;
    db.get(`select * from topic where id=?`, [request.params.pageId], function(error2, result){
      if (error2) throw error2;
      db.all(`select * from member`, function(error3, authors){
        if (error3) throw error3;
        const topicList = results;
        const authorList = authors;
        const topic = result;
        response.render('topic/update', {topicList, authorList, topic});
      });
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