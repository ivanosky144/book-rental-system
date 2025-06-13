import { DataTypes } from "sequelize";

const rentalModel = (sequelize, Sequelize) => {
    const model = sequelize.define("rentals", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_copy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rental_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: true, // allow null for return_date
        },
        status: {
            type: DataTypes.ENUM("active", "completed", "overdue"),
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


export default rentalModel;