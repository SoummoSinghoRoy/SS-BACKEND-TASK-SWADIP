const router = require('express').Router();

const { allTvShowsGetController, createTvShowsPostController, singleTvShowsGetController, tvShowEditPutController, tvShowDeleteController } = require('../controller/tvShowController');
const createTvShowValidation = require('../validator/tvShow/createTvShowValidation');
const editTvShowValidation = require('../validator/tvShow/editTvShowValidation');
const checkIsAdmin = require('../middleware/checkIsAdmin');
const fileUpload = require('../middleware/fileUploadValidation');

router.get('/all', allTvShowsGetController);
router.post('/create', checkIsAdmin(), fileUpload, createTvShowValidation, createTvShowsPostController);
router.get('/single/:showId', singleTvShowsGetController);
router.put('/edit/:showId', checkIsAdmin(), editTvShowValidation, tvShowEditPutController);
router.delete('/delete/:showId', checkIsAdmin(), tvShowDeleteController);

module.exports = router;