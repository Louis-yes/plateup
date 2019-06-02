const app = require('express')()
const sources = require('./sources/sources').list

app.get('/recipe/:url', (req, res) => {
	const url = decodeURI(req.params.url)
	res.type('json')
	const method = getMethod(url)
	if(method){
		method(url).then((rec) => {res.send(rec)})
	} else {
		res.send('Not a listed website')
	}
})

function getMethod(url){
	const urlarray = url.split('.')
	let method = false;
	sources.forEach((ss) => {
		const name = urlarray[ss.urlPos]
		if(name === ss.name){
			method = ss.method
		}
	})
	return method
}

app.listen(8080, () => (console.log('listening on 8080...')))
