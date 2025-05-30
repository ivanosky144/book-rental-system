import { DataTypes } from "sequelize";

const reservationModel = (sequelize, Sequelize) => {
    const model = sequelize.define("reservations", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
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

export default reservationModel;