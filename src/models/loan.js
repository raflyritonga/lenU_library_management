module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {});

  Loan.associate = (models) => {
    Loan.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student',
    });
    Loan.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'book',
    });
  };

  return Loan;
};