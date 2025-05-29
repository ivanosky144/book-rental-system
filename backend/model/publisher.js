import { DataTypes } from "sequelize";

export default publisherModel = (sequelize, Sequelize) => {
    const model = sequelize.define("publishers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return model;
}   

