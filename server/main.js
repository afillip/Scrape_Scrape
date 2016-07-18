var express = require('express'),
	request = require("request-promise"),
	bodyParser = require("body-parser"),
	fs = require('fs'),
	cheerio = require("cheerio"),
	app = express();
module.exports = app;

 app.use(bodyParser.json());

//-----------------------Begin Scrape---------//
var url1 = 'http://earmilk.com/';
app.get('/scrape', function(req,res){
	 request(url1,function(error,response,html){
		//check to make sure no errors occured
		if(!error){
			//utilize cheerio library on returned html to give jquery functionality
			var $ = cheerio.load(html);

			var entries = {
				links: [],
				images: [],
				titles: [],
				genres: [],
				blurbs: []
			}
			$(".classic-blog .an-content h2 a").each(function(index, element){
				entries['links'].push($(element).attr('href'))
			})
			$(".classic-blog .an-content h2 a").each(function(index, element){
				if(element.children[0].data !== "Read More..." && element.children[0].data.length > 5){
					entries['titles'].push(element.children[0].data)
				}
			})
			$(".classic-blog img").each(function(index,element){
				entries['images'].push($(element).attr('src'))
			})
			$(".classic-blog .article-category a").each(function(index,element){
					entries['genres'].push(element.children[0].data)		
			})
			$(".classic-blog .an-content p").each(function(index,element){
					entries['blurbs'].push(element.children[0].data)
				})
		 }			
		else{
			console.log(error)
		}
		res.send(JSON.stringify(entries))
	})
});
var url2 = "http://poponandon.com/";
app.get('/scrape2', function(req,res){
	 request(url2,function(error,response,html){
		//check to make sure no errors occured
		if(!error){
			//utilize cheerio library on returned html to give jquery functionality
			var $ = cheerio.load(html);
			var entries = {
				links: [],
				images: [],
				titles: [],
				blurbs: []
			}
			
			$("#content h2 a").each(function(index,element){
				entries['links'].push($(element).attr('href'))
			})
			$("#content .thumbnail img").each(function(index, element){
				entries['images'].push($(element).attr('src'))
			})
			$("#content h2 a").each(function(index, element){
				entries['titles'].push(element.children[0].data)				
			})
			$("#content p").each(function(index, element){
				entries['blurbs'].push(element.children[0].data)
			})
		 }			
		else{
			console.log("error!!!!!!~~~~", error)
		}
		res.send(JSON.stringify(entries))
	})
});
var url3 = "http://pigeonsandplanes.com/";
app.get('/scrape3', function(req,res){
	request(url3, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var entries = {
				links: [],
				titles: [],
				images: [],
				blurbs:[],
			};
			 $("#home-posts .contentbox a").each(function(index, element){
			 	entries['links'].push($(element).attr('href'))
			 })
			$("#home-posts h2 a").each(function(index,element){
				entries['titles'].push(element.children[0].data)
			})
			$('#home-posts img').each(function(index,element){
				entries['images'].push($(element).attr('src'))
			})
			$('#home-posts .contentbox p').each(function(index,element){
				entries['blurbs'].push(element.children[0].data)
			})
			res.send(JSON.stringify(entries));
		}
	})
})



//----------------------------
app.use(express.static('./client'))
app.get('/', function(req,res){
	res.sendFile(__dirname + '/client/index.html')
});
var port = process.env.PORT || 8081;
app.listen(port);
console.log("listening on port" + port);



