const x = require('x-ray')()

module.exports = {
  name: 'allrecipes',
  urlPos: 1,
  method: getRecipe
}

const newLines = /(\r\n|\n|\r)/gm
const spaces = /\s+/g

function getRecipe(url){
  const recipe = x(url, '.ar_recipe_index', [{
    title: '.recipe-summary__h1',
    subheading: '.submitter__description@html',
    ingredients: ['.checkList__line .recipe-ingred_txt@html'],
    method: ['.recipe-directions__list .recipe-directions__list--item@html'],
    // servings: '.servings-count@html',
    cooktime: '.ready-in-time',
    // preptime: ,
    // difficulty: ,
    // tags: ''
  }]).then(function (res) {
    rec = res[0]
    rec.subheading = rec.subheading.replace(newLines, '')
    rec.subheading = rec.subheading.replace(spaces, ' ')
    rec.subheading = rec.subheading.trim()
    rec.method = tidyArray(rec.method);
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
