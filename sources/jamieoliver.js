const x = require('x-ray')()

module.exports = {
  name: 'jamieoliver',
  urlPos: 1,
  method: getRecipe
}

const newLines = /(\r\n|\n|\r)/gm
const spaces = /\s+/g

function getRecipe(url){
  const recipe = x(url, '#recipe-single', [{
    title: '.single-recipe-details-mobile-top h3',
    subheading: '.single-recipe-details-mobile-top .subheading',
    ingredients: ['.ingred-list li'],
    method: ['.recipeSteps li'],
    servings: '.recipe-detail.serves',
    cooktime: '.recipe-detail.time',
    difficulty: '.recipe-detail.difficulty',
    tags: ['.tags-list a@html']
  }]).then(function (res) {
    rec = res[0];
    let newIngredients = []
    rec.ingredients.forEach((ing) => {
      // remove new lines
      ing = ing.replace(newLines, "")
      // remove extra spaces
      ing = ing.replace(spaces, " ")
      ing = ing.trim()
      newIngredients.push(ing);
    })
    rec.ingredients = newIngredients

    rec.servings = rec.servings.replace(/Serves/, "")
    rec.servings = rec.servings.replace(newLines, "")
    rec.servings = rec.servings.replace(spaces, " ")
    rec.servings = rec.servings.trim()

    rec.difficulty = rec.difficulty.replace(/Difficulty/, "")
    rec.difficulty = rec.difficulty.replace(newLines, "")
    rec.difficulty = rec.difficulty.replace(spaces, " ")
    rec.difficulty = rec.difficulty.trim()

    rec.cooktime = rec.cooktime.replace(/Cooks In/, "")
    rec.cooktime = rec.cooktime.replace(newLines, "")
    rec.cooktime = rec.cooktime.replace(spaces, " ")
    rec.cooktime = rec.cooktime.trim()

    return rec
  })
  return recipe
}
