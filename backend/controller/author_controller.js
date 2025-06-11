import db from '../models/index.js';
  
const Author = db.Author;
const sequelize = db.sequelize;

export const createAuthor = async (req, res) => {
  try {
    const { name, bio, nationality } = req.body;
    const author = await Author.create({ name, bio, nationality });
    res.status(201).json({message: "Author has been created successfully", data: author});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to create author", error });
  }
};

export const getAllAuthors = async (req, res) => {
  try {
    const [authors] = await sequelize.query(`
      SELECT 
        a.id,
        a.name,
        a.bio,
        a.nationality,
        a.created_at AS "createdAt",
        a.updated_at AS "updatedAt",
        CAST(COUNT(ba.book_id) AS INTEGER) AS book_count
      FROM authors a
      LEFT JOIN book_authors ba ON a.id = ba.author_id
      GROUP BY a.id
      ORDER BY a.name;
    `);
      res.status(201).json({message: "Authors has been retrieved successfully", data: authors});
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve authors", error });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) return res.status(201).json({message: "Author has been retrieved successfully", data: author});
    res.status(404).json({ message: "Author not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve author", error });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, bio, nationality } = req.body;
    const [updated] = await Author.update(
      { name, bio, nationality },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      return res.status(201).json({message: "Author has been updated successfully", data: updatedAuthor});
    }
    res.status(404).json({ message: "Author not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update author", error });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.destroy({ where: { id: req.params.id } });
    if (deleted) return res.status(201).json({message: "Author has been deleted successfully"});
    res.status(404).json({ message: "Author not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author", error });
  }
};
