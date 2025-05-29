import { DataTypes } from "sequelize";

export default bookCopyModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_copies", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
    });

    return model;
}   

