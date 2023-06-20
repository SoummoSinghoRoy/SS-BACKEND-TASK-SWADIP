const router = require('express').Router();

const { allTvShowGetController, createTvShowPostController, singleTvShowGetController, TvShowEditPutController, TvShowDeleteController } = require('../controller/tvShowController');
const createTvShowValidation = require('../validator/tvShow/createTvShowValidation');
const editTvShowValidation = require('../validator/tvShow/editTvShowValidation');
const checkIsAdmin = require('../middleware/checkIsAdmin');
const fileUpload = require('../middleware/fileUploadValidation');

router.get('/all', allTvShowGetController);
router.post('/create', checkIsAdmin(), fileUpload, createTvShowValidation, createTvShowPostController);
router.get('/single/:showId', singleTvShowGetController);
router.put('/edit/:showId', checkIsAdmin(), editTvShowValidation, TvShowEditPutController);
router.delete('/delete/:showId', checkIsAdmin(), TvShowDeleteController);

module.exports = router;