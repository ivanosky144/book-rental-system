import { DataTypes } from "sequelize";

export default bookGenreModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_genres", {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return model;
}   

