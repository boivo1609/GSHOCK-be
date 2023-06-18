const express = require('express');
const multer = require('multer');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/banner.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
router
  .route('/')
  .post(
    [authorize([ROLE.ADMIN]), multerUpload.single('image')],
    controller.uploadBanner
  );

router.route('/:id').delete(authorize([ROLE.ADMIN]), controller.deleteBanner);
router.route('/all').get(controller.getAllBanner);
router.route('/search').get(controller.listPaginate);
module.exports = router;
