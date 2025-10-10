var template = require('./template');
var db = require('./db');

exports.home = function(request,response){
  db.all(`select * from topic`, function(error, results) {
    if (error) throw error;
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(results);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <image src="/images/coding.jpg" style="width:300px; display:block;">`,
      `<a href="/topic/create">create</a>`
    );
    //response.writeHead(200);
    //response.end(html);
    response.send(html);
  });
}

exports.page = function(request,response){
  var pageId = request.params.pageId;
  db.all(`select * from topic`, function(error, results) {
    if (error) throw error;
    db.get(`select * from topic left outer join member on topic.member_id = member.id where topic.id=?`,[pageId],function(error2, result){
      if (error2) throw error2;
      var title = result.title;
      var description = result.description;
      var list = template.list(results);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>
        ${description}
        <p>by ${result.name}</p>`,
        `<a href="/topic/create">create</a>
          <a href="/topic/update/${pageId}">update</a>
          <form action="/topic/delete_process" method="post">
            <input type="hidden" name="id" value="${pageId}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    });
  });
}

exports.create = function(request,response){
  db.all(`select * from topic`, function(error, results){
    if (error) throw error;
    db.all(`select * from member`, function(error2, authors){
      if (error2) throw error2;
      var title = 'WEB - create';
      var list = template.list(results);
      var html = template.HTML(title, list, `
        <form action="/topic/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          ${template.selectAuthor(authors)}
          <p>
            <input type="submit">
          </p>
        </form>
      `, '');
    response.send(html);
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
        var title = result.title;
        var list = template.list(results);
        var html = template.HTML(title, list,
          `
          <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${result.id}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${result.description}</textarea>
            </p>
            ${template.selectAuthor(authors, result.member_id)}
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/topic/create">create</a> <a href="/topic/update/${result.id}">update</a>`
        );
        response.send(html);
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