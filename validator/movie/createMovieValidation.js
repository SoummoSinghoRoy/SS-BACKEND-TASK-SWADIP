const { body } = require('express-validator');

const Movie = require('../../model/Movie');

module.exports = [
  body('title')
      .not().isEmpty().withMessage(`Movie name can't be empty`)
      .custom(async title => {
        const movie = await Movie.findOne({ title })
        if(movie) {
          return Promise.reject("Movie name already exist")
        }
      })
  ,
  body('actor')
      .not().isEmpty().withMessage(`Actor name can't be empty`)
  ,
  body('actress')
      .not().isEmpty().withMessage(`Actress name can't be empty`)
  ,
  body('director')
      .not().isEmpty().withMessage(`Director name can't be empty`)
  ,
  body('producer')
      .not().isEmpty().withMessage(`Producer name can't be empty`)
  ,
  body('releaseDate')
      .not().isEmpty().withMessage(`Release date can't be empty`)
  ,
  body('duration')
      .not().isEmpty().withMessage(`Duration can't be empty`)
  ,
  body('detail')
      .not().isEmpty().withMessage(`Movie detail can't be empty`)
  ,
]