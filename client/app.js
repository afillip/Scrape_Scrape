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
	 			for(var i=0; i<entries.links.length; i++){
	 				$('.linkTable').append(`<tr><td><img src='${entries.images[i]}' width=175 height=175></img></td><td><a href='${entries.links[i]}'>${entries.titles[i]}</a></td></tr>`)
	 			}
				$.ajax({
					url: 'scrape2',
					type: 'GET',
					contentType: 'application/json',
					dataType: 'json'
				}).complete(function(data){
					var entries = data.responseJSON;
					console.log("scrape2: ", entries)
					for(var i=0; i<entries.links.length; i++){
						$('.linkTable').append(`<tr><td><img src='${entries.images[i]}' width=175 height=175></img></td><td><a href='${entries.links[i]}'>${entries.titles[i]}</a></td></tr>`)
					}
					$.ajax({
						url: 'scrape',
						type: 'GET',
					 	contentType: 'application/json',
					 	dataType: 'json'
						}).complete(function(data){
							var hole = []
							console.log("client-scrape: ", data.responseJSON)
							var entries = data.responseJSON

							for(var i=0; i<entries.links.length; i++){
								$('.linkTable').append(`<tr><td><img src='${entries.images[i]}' width=175 height=175></img></td><td><a href='${entries.links[i]}'>${entries.titles[i]}</a></td></tr>`)
							}

					})
				})

			})


	});


//-------------------------------Get Music by Filter---------------//
 $('.searchMusic').submit(function(e){
 	e.preventDefault()
 	var genre = $(".genre").val()
 	var holder = {
 					links: [],
 					images: [],
 					titles: [],
 					blurbs: [],
 					genres: []
 				};
	$.ajax({
			url: 'scrape3',
			type: 'GET',
		 	contentType: 'application/json',
		 	dataType: 'json'
			}).complete(function(data){
				 var entries = data.responseJSON;
				 for(var i=0;i<entries['links'].length;i++){
					 holder['links'].push(entries.links[i]);
					 holder['images'].push(entries.images[i]);
					 holder['titles'].push(entries.titles[i]);
					 holder['blurbs'].push(entries.blurbs[i]);			 	
				 }
				$.ajax({
					url: 'scrape2',
					type: 'GET',
					contentType: 'application/json',
					dataType: 'json'
				}).complete(function(data){
					var entries = data.responseJSON;
					for(var i=0; i<entries['links'].length;i++){
						holder['links'].push(entries.links[i]);
						holder['images'].push(entries.images[i]);
						holder['titles'].push(entries.titles[i]);
						holder['blurbs'].push(entries.blurbs[i]);
					}	
					$.ajax({
						url: 'scrape',
						type: 'GET',
					 	contentType: 'application/json',
					 	dataType: 'json'
						}).complete(function(data){
							var entries = data.responseJSON
							for(var j=0; j<entries['links'].length; j++){
								holder['links'].push(entries.links[j]);
								holder['images'].push(entries.images[j]);
								holder['titles'].push(entries.titles[j]);
								holder['blurbs'].push(entries.blurbs[j]);
							}
							for(var k=2;k<entries.genres.length;k+=3){
									holder['genres'].push(entries.genres[k])	
							}
							for(var i=0; i < holder.blurbs.length; i++){
								if(holder.blurbs[i]){
									var link = holder.blurbs[i];
									var substrings = [genre];
									var length = substrings.length;
									 while(length--){
										if(link.indexOf(substrings[length])!=-1){
											$('.linkTable').append(`<tr><td><img src='${holder.images[i]}' width=175 height=175></img></td><td><a href='${holder.links[i]}'>${holder.titles[i]}</a></td></tr>`)							 	
									 	}
									}
								}			
							}
							for(var l=0; l<holder.genres.length; l++){
								if(holder.genres[l]){
									var link = holder.genres[l];
									var substrings = [genre];
									var length = substrings.length;
									 while(length--){
										if(link.indexOf(substrings[length])!=-1){
											$('.linkTable').append(`<tr><td><img src='${holder.images[l]}' width=175 height=175></img></td><td><a href='${holder.links[l]}'>${holder.titles[l]}</a></td></tr>`)							 	
									 	}
									}
								}			
							}
							console.log("filter finished")
					})
				})

			})


	});

 



