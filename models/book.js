'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    total_pages: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING
  }, {});

  return Book;
};