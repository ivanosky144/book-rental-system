import { DataTypes } from "sequelize";

const bookModel = (sequelize, Sequelize) => {
    const model = sequelize.define("books", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publisher_id: {
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


export default bookModel;