const Router = require('koa-router');
const booksController = require('../controllers/booksController');
const router = new Router();

router.get('/api/books/add', booksController.addBook);
router.get('/api/books/all', booksController.getAll);
router.get('/api/books/update/:id', booksController.updateBook);
router.get('/api/books/search', booksController.search);

module.exports = router;
