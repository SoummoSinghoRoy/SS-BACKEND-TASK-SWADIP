const router = require('express').Router();

const { allMovieGetController, createMoviePostController, singleMovieGetController, movieEditPutController, movieDeleteController } = require('../controller/movieController');
const createMovieValidation = require('../validator/movie/createMovieValidation');
const editMovieValidation = require('../validator/movie/editMovieValidation');
const checkIsAdmin = require('../middleware/checkIsAdmin');
const fileUpload = require('../middleware/fileUploadValidation');

router.get('/all', allMovieGetController);
router.post('/create', checkIsAdmin(), fileUpload, createMovieValidation, createMoviePostController);
router.get('/single/:movieId', singleMovieGetController);
router.put('/edit/:movieId', checkIsAdmin(), editMovieValidation, movieEditPutController);
router.delete('/delete/:movieId', checkIsAdmin(), movieDeleteController);

module.exports = router;