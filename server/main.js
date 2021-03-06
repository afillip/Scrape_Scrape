var express = require('express'),
	request = require("request-promise"),
	bodyParser = require("body-parser"),
	browserify = require('browserify-middleware'),
	fs = require('fs'),
	cheerio = require("cheerio"),
	path = require('path'),
	app = express();

module.exports = app;
//app.use('/music',require('./controllers/music'))
 app.use(bodyParser.json());

// //-----------------------Begin Scrape---------//
// var url1 = 'http://earmilk.com/';
// app.get('/scrape', function(req,res){
// 	 request(url1,function(error,response,html){
// 		//check to make sure no errors occured
// 		if(!error){
// 			//utilize cheerio library on returned html to give jquery functionality
// 			var $ = cheerio.load(html);

// 			var entries = {
// 				links: [],
// 				images: [],
// 				titles: [],
// 				genres: [],
// 				blurbs: [],
// 				articles: [],
// 			}
// 			$(".classic-blog .an-content h2 a").each(function(index, element){
// 				entries['links'].push($(element).attr('href'))
// 			})
// 			$(".classic-blog .an-content h2 a").each(function(index, element){
// 				if(element.children[0].data !== "Read More..." && element.children[0].data.length > 5){
// 					entries['titles'].push(element.children[0].data)
// 				}
// 			})
// 			$(".classic-blog img").each(function(index,element){
// 				entries['images'].push($(element).attr('src'))
// 			})
// 			$(".classic-blog .article-category a").each(function(index,element){
// 					entries['genres'].push(element.children[0].data)		
// 			})
// 			$(".classic-blog .an-content p").each(function(index,element){
// 					entries['blurbs'].push(element.children[0].data)
// 				})
// 		 }			
// 		else{
// 			console.log(error)
// 		}
// 		res.send(JSON.stringify(entries))
// 	})
// });
// var url2 = "http://poponandon.com/";
// app.get('/scrape2', function(req,res){
// 	 request(url2,function(error,response,html){
// 		//check to make sure no errors occured
// 		if(!error){
// 			//utilize cheerio library on returned html to give jquery functionality
// 			var $ = cheerio.load(html);
// 			var entries = {
// 				links: [],
// 				images: [],
// 				titles: [],
// 				blurbs: [],
// 				articles: [],
// 			}
			
// 			$("#content h2 a").each(function(index,element){
// 				entries['links'].push($(element).attr('href'))
// 			})
// 			$("#content .thumbnail img").each(function(index, element){
// 				entries['images'].push($(element).attr('src'))
// 			})
// 			$("#content h2 a").each(function(index, element){
// 				entries['titles'].push(element.children[0].data)				
// 			})
// 			$("#content p").each(function(index, element){
// 				entries['blurbs'].push(element.children[0].data)
// 			})
// 		 }			
// 		else{
// 			console.log("error!!!!!!~~~~", error)
// 		}
// 		res.send(JSON.stringify(entries))
// 	})
// });



var url3 = "http://pigeonsandplanes.com/";
app.get('/scrape3', function(req,res){
	request(url3, function(error, response, html){
		var entries3 = []
		if(!error){
			var $ = cheerio.load(html);
			 $("#home-posts .contentbox a").each(function(index, element){
			 	entries3.push({link: $(element).attr('href')})
			 })
			$("#home-posts h2 a").each(function(index,element){
				entries3.map(function(elem){
					elem['title'] = element.children[0].data
				})
			})
			$('#home-posts img').each(function(index,element){
				entries3.map((elem) => {elem['image'] = $(element).attr('src')})
			})
			$('#home-posts .contentbox p').each(function(index,element){
				entries3.map((blurb) =>{blurb['blurb'] = element.children[0].data})
			})
		}
		res.send(JSON.stringify(entries3))
	})
});

// app.get('/scrape3a', function(req,res){
// 	var count = 0;

// 	entries3['links'].map(function(link){
// 		request(link,function(error,response,html){
// 			if(!error){
// 				var $ = cheerio.load(html)
// 				$("#main_content ").each(function(index, element){
// 					if(element.children[3].children[0]){
// 						entries3['articles'].push(new Array(element.children[3].children[0].data))	
// 						console.log(element.children[3].children[0].data)
// 					}
// 				})
// 			}
// 		})
// 	})		
// 	myfunc = function(){
// 		console.log(entries3['articles']);
// 		console.log("how many articles?", entries3['articles'].length);
// 		console.log("links length",entries3['links'].length);
// 		res.send(JSON.stringify(entries3['articles']))
// 	}
// 	setTimeout(myfunc,1500)
// })



//----------------------------
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/app-bundle.js',
	browserify('./client/main.js',{
		transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
	})
);

var port = process.env.PORT || 8081;
app.listen(port);
console.log("listening on port" + port);



