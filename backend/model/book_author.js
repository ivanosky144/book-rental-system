import { DataTypes } from "sequelize";

export default bookAuthorModel = (sequelize, Sequelize) => {
    const model = sequelize.define("book_authors", {
        author_id: {
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

