const x = require('x-ray')()

const url = 'https://www.bbcgoodfood.com/recipes/1869/chicken-noodle-soup'

  const recipe = x(url, '#main-content', [{
    title: '.recipe-header__title',
    subheading: '.recipe-header__description@html',
    ingredients: ['.ingredients-list__item@html'],
    method: ['.method__item@html'],
    servings: '.recipe-details__item--servings .recipe-details__text',
    cooktime: 'recipe-details__cooking-time-cook .mins',
    preptime: '.recipe-details__cooking-time-prep .mins',
    difficulty: '.recipe-details__item--skill-level .recipe-details__text',
    // tags: ''
  }]).then(function (res) {
    console.log(res)
  })
