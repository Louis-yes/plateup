const app = require('express')()
const x = require('x-ray')()

const james = 'https://www.jamieoliver.com/recipes/chicken-recipes/chicken-veg-stir-fry/'

app.get('/recipe/:url', (req, res) => {
	const url = decodeURI(req.params.url)
	res.type('json')
	const method = getMethod(url)
	if(method){
		method(url).then((rec) => {res.send(rec)})
	} else {
		res.send('Not a jamieoliver recipe')
	}
})

function getMethod(url){
	const urlarray = url.split('.')
	const methods =[
		{
			name: 'jamieoliver',
			method: getJaimieOliverRecipe
		}
	]
	console.log(urlarray[1])
	console.log(methods[0])

	if(urlarray[1] === methods[0].name){
			return methods[0].method
	} else {
		return false
	}

}

function getJaimieOliverRecipe(url){
	const recipe = x(url, '#recipe-single', [{
	  title: '.single-recipe-details-mobile-top h3',
	  subheading: '.single-recipe-details-mobile-top .subheading',
	  ingredients: ['.ingred-list li@html'],
	  method: ['.recipeSteps li@html']
	}]).then(function (res) {
    rec = res[0];
		let newIngredients = []
		rec.ingredients.forEach((ing) => {
			// remove new lines
			ing = ing.replace(/(\r\n|\n|\r)/gm, "")
			// remove extra spaces
			ing = ing.replace(/\s+/g, " ")
			ing = ing.trim()
			newIngredients.push(ing);
		})
		rec.ingredients = newIngredients
		return rec
  })
	return recipe;
}

app.listen(8080, () => (console.log('listening!')))
