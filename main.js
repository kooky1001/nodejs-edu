var http = require('http');
var url = require('url');
var qs = require('querystring');
var ssh = require('./lib/ssh');
var template = require('./lib/template.js');
var db = require('./lib/db');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        db.query(`select * from topic`, function(error, results) {
            if (error) throw error;
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(results);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
        });
      } else {
        db.query(`select * from topic`, function(error, results) {
          if (error) throw error;
          db.query(`select * from topic left outer join author on topic.author_id = author.id where topic.id=?`,[queryData.id],function(error2, result){
            if (error2) throw error2;
            var title = result[0].title;
            var description = result[0].description;
            var id = queryData.id;
            var list = template.list(results);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>
              ${description}
              <p>by ${result[0].name}</p>`,
              `<a href="/create">create</a>
               <a href="/update?id=${id}">update</a>
               <form action="delete_process" method="post">
                 <input type="hidden" name="id" value="${id}">
                 <input type="submit" value="delete">
               </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
      db.query(`select * from topic`, function(error, results){
        if (error) throw error;
        db.query(`select * from author`, function(error2, authors){
          if (error2) throw error2;
          var title = 'WEB - create';
          var list = template.list(results);
          var html = template.HTML(title, list, `
            <form action="/create_process" method="post">
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
        response.writeHead(200);
        response.end(html);
        });
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`insert into topic(title,description,author_id) values(?,?,?)`,
          [post.title, post.description, post.author],function(error, result){
            if (error) throw error;
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          });
      });
    } else if(pathname === '/update'){
      db.query(`select * from topic`, function(error,results){
        if (error) throw error;
        db.query(`select * from topic where id=?`, [queryData.id], function(error2, result){
          if (error2) throw error2;
          db.query(`select * from author`, function(error3, authors){
            var title = result[0].title;
            var list = template.list(results);
            var html = template.HTML(title, list,
              `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${result[0].id}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${result[0].description}</textarea>
                </p>
                ${template.selectAuthor(authors, result[0].author_id)}
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${result[0].id}">update</a>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`update topic set title=?, description=?, author_id=? where id=?`, 
          [post.title, post.description, post.author, post.id], function(error,result){
            if (error) throw error;
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`delete from topic where id=?`, [post.id], function(error, result){
            if (error) throw error;
            response.writeHead(302, {Location: `/`});
            response.end();
          });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
