import db from '../models/index.js';

const Genre = db.Genre;

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
    const genres = await Genre.findAll();
    res.status(200).json({ message: "Genres retrieved successfully", data: genres });
  } catch (error) {
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
