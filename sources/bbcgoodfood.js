
const x = require('x-ray')()

module.exports = {
  name: 'bbcgoodfood',
  urlPos: 1,
  method: getRecipe
}

const newLines = /(\r\n|\n|\r)/gm
const spaces = /\s+/g

function getRecipe(url){
  const recipe = x(url, '#main-content', [{
    title: '.recipe-header__title',
    subheading: '.recipe-header__description',
    ingredients: ['.ingredients-list__item'],
    ingredient_tooltips: ['.gf-tooltip'],
    method: ['.method__item'],
    servings: '.recipe-details__item--servings .recipe-details__text',
    cooktime: 'recipe-details__cooking-time-cook .mins',
    preptime: '.recipe-details__cooking-time-prep .mins',
    difficulty: '.recipe-details__item--skill-level .recipe-details__text',
    // tags: ''
  }]).then(function (res) {
    rec = res[0]
    rec.subheading = rec.subheading.replace(newLines, '')
    rec.subheading = rec.subheading.replace(spaces, ' ')
    rec.subheading = rec.subheading.trim()
    rec.method = tidyArray(rec.method);
    let newIngredients = [];
    rec.ingredients.forEach((ing, index) => {
      let nIng = [];
      rec.ingredient_tooltips.forEach((tt) => {
        if(ing.includes(tt)){
          const splitIng = ing.split(tt);
          nIng = splitIng.splice(2,1);
          rec.ingredients[index] = nIng;
        }
      });
    })
    return rec
  }).catch((err) => {
    console.log(err)
  })
  return recipe
}

function tidyArray(arr){
  let newArr = []
  arr.forEach((o) => {
    // remove new lines
    o = o.replace(newLines, "")
    // remove extra spaces
    o = o.replace(spaces, " ")
    o = o.trim()
    newArr.push(o)
  })
  return newArr
}
