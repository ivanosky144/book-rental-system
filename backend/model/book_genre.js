import { DataTypes } from "sequelize";

const bookGenreModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_genres", {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            defaultValue: Sequelize.NOW,
        },
    });

    return model;
}   

export default bookGenreModel;