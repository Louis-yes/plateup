const app = require('express')()
const sources = require('./sources/sources').list

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Home-Cooked-Meal", "Delicious");
	next();
});

app.get('/recipe/:url', (req, res, next) => {
	const url = decodeURI(req.params.url).replace(/\?.+/, '')
	res.type('json')

	const method = getMethod(url)
	if(method){
		method(url).then((rec) => {
			console.log(typeof rec)
			recString = JSON.stringify(rec)
			res.send(recString)
		})
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

app.listen(3000, () => (console.log('listening on 3000...')))
