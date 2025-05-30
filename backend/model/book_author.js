import { DataTypes } from "sequelize";

export default bookAuthorModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_authors", {
        author_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

