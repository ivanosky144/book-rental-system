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
import authMiddleware from './middleware/auth_middleware.js';



const router = express.Router();

router.post('/api/admins/login', adminLogin);
router.post('/api/admins/register', adminRegister);

router.get('/test', (req, res) => res.json({ message: 'Router is working' }));

router.get('/api/books', getAllBooks); // PUBLIC: anyone can view books
router.get('/api/books/:id', getBookById); // PUBLIC: anyone can view a book by id

router.get('/api/genres', getAllGenres); // PUBLIC
router.get('/api/genres/:id', getGenreById); // PUBLIC
router.get('/api/authors', getAllAuthors); // PUBLIC
router.get('/api/authors/:id', getAuthorById); // PUBLIC
router.get('/api/publishers', getAllPublishers); // PUBLIC
router.get('/api/publishers/:id', getPublisherById); // PUBLIC

// Make rentals PUBLIC (no auth required)
router.post('/api/rentals', createRental);
router.get('/api/rentals', getAllRentals);
router.get('/api/rentals/:id', getRentalById);
router.put('/api/rentals/:id', updateRental);
router.delete('/api/rentals/:id', deleteRental);

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

// PUBLIC: Member login
router.post('/api/users/login', loginUser);
router.post('/api/users/register', registerUser);
// PUBLIC: Get book copy by id
router.get('/api/book-copies/:id', getBookCopyById);

router.use(authMiddleware); // Protect all routes below this line

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
