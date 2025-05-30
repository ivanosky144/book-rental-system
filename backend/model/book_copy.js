import { DataTypes } from "sequelize";

const bookCopyModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_copies", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("available", "checked_out", "reserved"),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
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

export default bookCopyModel;