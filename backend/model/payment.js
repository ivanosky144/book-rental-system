import { DataTypes } from "sequelize";

export default paymentModel = (sequelize, Sequelize) => {
    const model = sequelize.define("payments", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rental_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        method: {
            type: DataTypes.ENUM("cash", "credit_card", "debit_card", "e_wallet"),
            allowNull: false,
        },
    });

    return model;
}   

