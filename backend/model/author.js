import { DataTypes } from "sequelize";

export default authorModel = (sequelize, Sequelize) => {
    const model = sequelize.define("authors", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return model;
}   

