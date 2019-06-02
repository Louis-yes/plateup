const x = require('x-ray')()

module.exports = {
  name: 'jamieoliver',
  urlPos: 1,
  method: getRecipe
}

function getRecipe(url){
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
  return recipe
}
