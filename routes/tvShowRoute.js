const router = require('express').Router();

const { allTvShowsGetController, createTvShowsPostController, singleTvShowsGetController, tvShowEditPutController, tvShowDeleteController } = require('../controller/tvShowController');
const createTvShowValidation = require('../validator/tvShow/createTvShowValidation');
const editTvShowValidation = require('../validator/tvShow/editTvShowValidation');
const fileUpload = require('../middleware/fileUploadValidation');
const isAuthenticated = require('../middleware/isAuthenticated');
const checkIsAdmin = require('../middleware/checkIsAdmin');

router.get('/all', isAuthenticated, allTvShowsGetController);
router.post('/create', isAuthenticated, checkIsAdmin, fileUpload, createTvShowValidation, createTvShowsPostController);
router.get('/single/:showId', isAuthenticated, singleTvShowsGetController);
router.put('/edit/:showId', isAuthenticated, checkIsAdmin, editTvShowValidation, tvShowEditPutController);
router.delete('/delete/:showId', isAuthenticated, checkIsAdmin, tvShowDeleteController);

module.exports = router;