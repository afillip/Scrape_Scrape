//-----------------------------Get All Music-------------------//
 $('#noFilter').click(function(e){
 	e.preventDefault()
	$.ajax({
			url: 'scrape3',
			type: 'GET',
		 	contentType: 'application/json',
		 	dataType: 'json'
			}).complete(function(data){
				var entries = data.responseJSON;
				console.log("scrape3: ", entries)
				toList(entries)
				$.ajax({
					url: 'scrape2',
					type: 'GET',
					contentType: 'application/json',
					dataType: 'json'
				}).complete(function(data){
					var entries = data.responseJSON;
					console.log("scrape2: ", entries)
					toList(entries)
					$.ajax({
						url: 'scrape',
						type: 'GET',
					 	contentType: 'application/json',
					 	dataType: 'json'
						}).complete(function(data){
							console.log("client-scrape: ", data.responseJSON)
							var entries = data.responseJSON
							toList(entries)
					})
				})

			})


	});


//-------------------------------Get Music by Filter---------------//
var holder = {
				links: [],
				images: [],
				titles: [],
				blurbs: [],
				genres: [],
				articles: []
			}; 
var genre;
var found = false; 
 $('.searchMusic').submit(function(e){
 	e.preventDefault()
 	genre = $(".genre").val()
 	genre = genre.toLowerCase()
	$.ajax({
			url: 'scrape3',
			type: 'GET',
		 	contentType: 'application/json',
		 	dataType: 'json'
			}).complete(function(data){
				 var entries = data.responseJSON;
				 toHolder(entries)
				 $.ajax({
				 	url: 'scrape3a',
				 	type: 'GET',
				 	contentType: 'application/json',
				 	dataType: 'json'
				 	}).complete(function(data){
				 		var entries = data.responseJSON;
				 		console.log("articles", entries)
				 		toHolder(entries)
						$.ajax({
							url: 'scrape2',
							type: 'GET',
							contentType: 'application/json',
							dataType: 'json'
						}).complete(function(data){
							var entries = data.responseJSON;
							toHolder(entries)	
							$.ajax({
								url: 'scrape',
								type: 'GET',
							 	contentType: 'application/json',
							 	dataType: 'json'
								}).complete(function(data){
									var entries = data.responseJSON
									toHolder(entries)
									for(var k=2;k<entries.genres.length;k+=3){
											holder['genres'].push(entries.genres[k])	
									}
									toFilteredList('blurbs')
									toFilteredList('genres')
									toFilteredList('titles')
									toFilteredList('articles')
									console.log("filter finished")
								})
							})
					})
			})


	});

function toHolder(entries){
	console.log("entries", entries)
	for(var i=0;i<entries['links'].length;i++){
	 	holder['links'].push(entries.links[i]);
	 	holder['images'].push(entries.images[i]);
	 	holder['titles'].push(entries.titles[i]);
	 	holder['blurbs'].push(entries.blurbs[i]);
	 	holder['articles'].push(entries.articles[i]);
	}
}

function lower(text){
	for(var i =0;i<entries['titles'].length;i++){
		holder['titles']
	}
}

function toList(entries){
	for(var i=0; i<entries.links.length; i++){
		$('.linkTable').append(`<tr><td><img src='${entries.images[i]}' width=230 height=230></img></td><td><a href='${entries.links[i]}'>${entries.titles[i]}</a></td></tr>`)
	}
}

function toFilteredList(key){
	for(var i=0; i < holder[key].length; i++){
		if(holder[key][i]){
			var link = holder[key][i].toLowerCase();
			var substrings = [genre];
			var length = substrings.length;
			 while(length--){
				if(link.indexOf(substrings[length])!=-1){
					$('.linkTable').append(`<tr><td><img src='${holder.images[i]}' width=200 height=200></img></td><td><a href='${holder.links[i]}'>${holder.titles[i]}</a></td></tr>`)		
					console.log("found")
					found = true;					 	
			 	}
			}
		}			
	}
	if(!found){
		$('.searchErr').show()
	}
	else{
		$('.searchErr').hide()
	}
}
 



