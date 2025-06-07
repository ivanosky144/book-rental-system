import db from '../models/index.js';

const Genre = db.Genre;
const sequelize = db.sequelize;

export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json({ message: "Genre created successfully", data: genre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create genre", error });
  }
};

export const getAllGenres = async (req, res) => {
  try {
    const [genres] = await sequelize.query(`
      SELECT 
        g.id,
        g.name,
        g.created_at AS "createdAt",
        g.updated_at AS "updatedAt",
        CAST(COUNT(bg.book_id) AS INTEGER) AS book_count
      FROM genres g
      LEFT JOIN book_genres bg ON g.id = bg.genre_id
      GROUP BY g.id
      ORDER BY g.name;
    `);
    res.status(200).json({ message: "Genres retrieved successfully", data: genres });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to retrieve genres", error });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      return res.status(200).json({ message: "Genre retrieved successfully", data: genre });
    }
    res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve genre", error });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const [updated] = await Genre.update(
      { name },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedGenre = await Genre.findByPk(req.params.id);
      return res.status(200).json({ message: "Genre updated successfully", data: updatedGenre });
    }
    res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update genre", error });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const deleted = await Genre.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Genre deleted successfully" });
    }
    res.status(404).json({ message: "Genre not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete genre", error });
  }
};
