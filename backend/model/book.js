import { DataTypes } from "sequelize";

export default bookModel = (sequelize, Sequelize) => {
    const model = sequelize.define("books", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        publication_year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cover_image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return model;
}   

