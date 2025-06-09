import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
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
} from './controller/auth_controller.js';
import authMiddleware from './middleware/auth_middleware.js';



const router = express.Router();

router.post('/api/admins/login', adminLogin);
router.post('/api/admins/register', adminRegister);

router.get('/test', (req, res) => res.json({ message: 'Router is working' }));

router.get('/api/books', getAllBooks); // PUBLIC: anyone can view books
router.get('/api/books/:id', getBookById); // PUBLIC: anyone can view a book by id

router.use(authMiddleware); // Protect all routes below this line

router.post('/api/users', createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users/:id', getUserById);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

router.post('/api/authors', createAuthor);
router.get('/api/authors', getAllAuthors);
router.get('/api/authors/:id', getAuthorById);
router.put('/api/authors/:id', updateAuthor);
router.delete('/api/authors/:id', deleteAuthor);

router.post('/api/books', createBook);
router.put('/api/books/:id', updateBook);
router.delete('/api/books/:id', deleteBook);

router.post('/api/reservations', createReservation);
router.get('/api/reservations', getAllReservations);
router.get('/api/reservations/:id', getReservationById);
router.put('/api/reservations/:id', updateReservation);
router.delete('/api/reservations/:id', deleteReservation);

router.post('/api/rentals', createRental);
router.get('/api/rentals', getAllRentals);
router.get('/api/rentals/:id', getRentalById);
router.put('/api/rentals/:id', updateRental);
router.delete('/api/rentals/:id', deleteRental);

router.post('/api/book-copies', createBookCopy);
router.get('/api/book-copies', getAllBookCopies);
router.get('/api/book-copies/:id', getBookCopyById);
router.put('/api/book-copies/:id', updateBookCopy);
router.delete('/api/book-copies/:id', deleteBookCopy);

router.post('/api/genres', createGenre);
router.get('/api/genres', getAllGenres);
router.get('/api/genres/:id', getGenreById);
router.put('/api/genres/:id', updateGenre);
router.delete('/api/genres/:id', deleteGenre);

router.post('/api/publishers', createPublisher);
router.get('/api/publishers', getAllPublishers);
router.get('/api/publishers/:id', getPublisherById);
router.put('/api/publishers/:id', updatePublisher);
router.delete('/api/publishers/:id', deletePublisher);


export default router;
