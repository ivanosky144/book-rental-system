import { DataTypes } from "sequelize";

export default rentalModel = (sequelize, Sequelize) => {
    const model = sequelize.define("rentals", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "completed", "overdue"),
            allowNull: false,
        },
    });

    return model;
}   

