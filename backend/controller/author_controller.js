import db from '../models/index.js';
  
const Author = db.Author;

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
    const authors = await Author.findAll();
    res.status(201).json({message: "Authors has been retrieved successfully", data: authors});
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve authors", error });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) return res.json({message: "Author has been retrieved successfully", data: user});
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
