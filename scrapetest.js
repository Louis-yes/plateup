const x = require('x-ray')()

const url = 'https://www.allrecipes.com/recipe/236165/fluffy-and-delicious-pancakes/'

const recipe = x(url, '.ar_recipe_index', [{
  title: '.recipe-summary__h1',
  subheading: '.submitter__description',
  ingredients: ['.checkList__line .recipe-ingred_txt@html'],
  method: ['.recipe-directions__list .recipe-directions__list--item@html'],
  servings: '.servings-count',
  cooktime: '.ready-in-time',
  // preptime: ,
  // difficulty: ,
  // tags: ''
}]).then(function (res) {
  rec = res[0]
  rec.subheading
})
