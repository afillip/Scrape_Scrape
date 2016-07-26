import fetch from 'isomorphic-fetch'

export function getMusic(){
	var obj = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Data-Type': 'json'
		}
	}
	return fetch('/scrape3', obj)
		.then(function(data){
			return data.json()
		})
}

