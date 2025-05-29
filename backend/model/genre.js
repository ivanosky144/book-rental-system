import { DataTypes } from "sequelize";

export default genreModel = (sequelize, Sequelize) => {
    const model = sequelize.define("genres", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return model;
}   

