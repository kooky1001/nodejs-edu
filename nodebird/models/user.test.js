const Sequelize = require('sequelize');
const User = require('./user');
const path = require('path');
const sequelize = new Sequelize({
  dialect: 'sqlite', 
  storage: path.join(__dirname, '..', '..', 'database.db')
});

describe('User 모델', () => {
  test('static init 메서드 호출', () => {
    expect(User.initiate(sequelize)).toBe(undefined);
  });
  test('static associate 메서드 호출', () => {
    const db = {
      User: {
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
      },
      Post: {},
    };
    User.associate(db);
    expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
    expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
  });
});
