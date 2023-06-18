const express = require('express');
const multer = require('multer');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/product.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
router
  .route('/')
  // .get(controller.listPanigate)
  .post(
    [authorize([ROLE.ADMIN]), multerUpload.single('image')],
    controller.create
  );

router
  .route('/:id')
  .delete(authorize([ROLE.ADMIN]), controller.delete)
  .put(
    [authorize([ROLE.ADMIN]), multerUpload.single('image')],
    controller.update
  );
router
  .route('/updateStatus/:id')
  .put(authorize([ROLE.ADMIN]), controller.updateStatus);
router.route('/search').get(controller.listPaginate);
router.route('/all').get(controller.getAllProduct);
router.route('/detail-product/:id').get(controller.getDetailProduct);
module.exports = router;
