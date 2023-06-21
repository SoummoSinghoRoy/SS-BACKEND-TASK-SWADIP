const router = require('express').Router();

const { allMovieGetController, createMoviePostController, singleMovieGetController, movieEditPutController, movieDeleteController } = require('../controller/movieController');
const createMovieValidation = require('../validator/movie/createMovieValidation');
const editMovieValidation = require('../validator/movie/editMovieValidation');
const fileUpload = require('../middleware/fileUploadValidation');
const isAuthenticated = require('../middleware/isAuthenticated');
const checkIsAdmin = require('../middleware/checkIsAdmin');

router.get('/all', isAuthenticated, allMovieGetController);
router.post('/create', isAuthenticated, checkIsAdmin, fileUpload, createMovieValidation, createMoviePostController);
router.get('/single/:movieId', isAuthenticated, singleMovieGetController);
router.put('/edit/:movieId', isAuthenticated, checkIsAdmin, editMovieValidation, movieEditPutController);
router.delete('/delete/:movieId', isAuthenticated, checkIsAdmin, movieDeleteController);

module.exports = router;