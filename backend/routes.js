import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './controller/user_controller.js';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from './controller/author_controller.js';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from './controller/book_controller.js';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} from './controller/reservation_controller.js';
import {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental
} from './controller/rental_controller.js';
import {
  createBookCopy,
  getAllBookCopies,
  getBookCopyById,
  updateBookCopy,
  deleteBookCopy
} from './controller/book_copy_controller.js';
import {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre
} from './controller/genre_controller.js';
import {
  createPublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
  deletePublisher
} from './controller/publisher_controller.js';
import {
  adminLogin,
  adminRegister
} from './controller/admin_auth_controller.js';
import {
  loginUser,
  registerUser
} from './controller/user_auth_controller.js';
import authUserMiddleware from './middleware/auth_user_middleware.js';
import authAdminMiddleware from './middleware/auth_admin_middleware.js';

const router = express.Router();


// PUBLIC ROUTES
router.get('/api/books', getAllBooks); // PUBLIC: anyone can view books
router.get('/api/books/:id', getBookById); // PUBLIC: anyone can view a book by id
router.get('/api/genres', getAllGenres); // PUBLIC
router.get('/api/genres/:id', getGenreById); // PUBLIC
router.get('/api/authors', getAllAuthors); // PUBLIC
router.get('/api/authors/:id', getAuthorById); // PUBLIC
router.get('/api/publishers', getAllPublishers); // PUBLIC
router.get('/api/publishers/:id', getPublisherById); // PUBLIC
// PUBLIC: Member authentication
router.post('/api/users/login', loginUser);
router.post('/api/users/register', registerUser);
// PUBLIC: Admin authentication
router.post('/api/admins/login', adminLogin);
router.post('/api/admins/register', adminRegister);
router.get('/api/book-copies/:id', getBookCopyById);

router.get('/test', (req, res) => res.json({ message: 'Router is working' }));

// PUBLIC: Get available book copy for a book
router.get('/api/book-copies/available', async (req, res) => {
  try {
    const db = req.app.get('models') || (await import('./models/index.js')).default;
    const BookCopy = db.BookCopy;
    const { book_id } = req.query;
    if (!book_id) return res.status(400).json({ message: 'book_id is required' });
    const copy = await BookCopy.findOne({ where: { book_id, status: 'available' } });
    if (!copy) return res.status(404).json({ message: 'No available copy found' });
    res.json({ data: copy });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch available book copy', error: err.message });
  }
});

// ADMIN ONLY ROUTES
router.use(authAdminMiddleware);
router.post('/api/users', createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users/:id', getUserById);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

router.post('/api/books', createBook);
router.put('/api/books/:id', updateBook);
router.delete('/api/books/:id', deleteBook);

router.post('/api/authors', createAuthor);
router.put('/api/authors/:id', updateAuthor);
router.delete('/api/authors/:id', deleteAuthor);

router.post('/api/genres', createGenre);
router.put('/api/genres/:id', updateGenre);
router.delete('/api/genres/:id', deleteGenre);

router.post('/api/publishers', createPublisher);
router.put('/api/publishers/:id', updatePublisher);
router.delete('/api/publishers/:id', deletePublisher);

router.post('/api/book-copies', createBookCopy);
router.put('/api/book-copies/:id', updateBookCopy);
router.delete('/api/book-copies/:id', deleteBookCopy);

router.put('/api/reservations/:id', updateReservation);
router.delete('/api/reservations/:id', deleteReservation);

router.put('/api/rentals/:id', updateRental);
router.delete('/api/rentals/:id', deleteRental);


// USER ONLY ROUTES
router.use(authUserMiddleware); 
router.post('/api/rentals', createRental);
router.get('/api/rentals', getAllRentals);
router.get('/api/rentals/:id', getRentalById);
router.put('/api/rentals/:id', updateRental);
router.delete('/api/rentals/:id', deleteRental);

router.get('/api/authors', getAllAuthors);
router.get('/api/authors/:id', getAuthorById);


router.post('/api/reservations', createReservation);
router.get('/api/reservations', getAllReservations);
router.get('/api/reservations/:id', getReservationById);
router.put('/api/reservations/:id', updateReservation);
router.delete('/api/reservations/:id', deleteReservation);

router.get('/api/book-copies', getAllBookCopies);
router.get('/api/book-copies/:id', getBookCopyById);

router.get('/api/genres', getAllGenres);
router.get('/api/genres/:id', getGenreById);

router.get('/api/publishers', getAllPublishers);
router.get('/api/publishers/:id', getPublisherById);


export default router;
