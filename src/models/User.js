const { encrypt, authenticate } = require('../utils/authentication')

const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notEmpty: true // TODO: other password rules?
        }
      },
      passwordHash: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [3, 255]
        }
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      address: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['username']
        },
        {
          unique: true,
          fields: ['email']
        }
      ]
    }
  )

  const preprocess = async (user, options) => {
    user.set('email', user.email.toLowerCase())
    const hashed = await encrypt(user.password)
    user.set('passwordHash', hashed)
  }

  User.prototype.authenticate = function(password) {
    return authenticate(password, this.passwordHash)
  }

  User.associate = ({ Role }) => {
    User.belongsToMany(Role, { through: 'RoleUser' })
  }

  User.beforeCreate(preprocess)
  User.beforeUpdate(preprocess)

  return User
}

module.exports = model
