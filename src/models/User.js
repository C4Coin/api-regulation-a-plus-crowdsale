const bcrypt = require("bcrypt")

const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
          fields: ["username"]
        },
        {
          unique: true,
          fields: ["email"]
        }
      ],
      instanceMethods: {
        // TODO: make this async
        authenticate(plainTextPassword) {
          if (
            bcrypt.compareSync(plainTextPassword, this.passwordDigest) &&
            this.emailConfirmedAt !== null
          )
            return this
          return false
        }
      }
    }
  )

  const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt, null)
  }

  const preprocess = (user, options) => {
    // eslint-disable-next-line no-param-reassign
    user.email = user.email.toLowerCase()
    encryptPassword(user.password)
      .then(hashed => {
        user.set("passwordHash", hashed)
      })
      .catch(err => {
        console.error("error hashing password", err)
      })
  }

  User.associate = ({ Role }) => {
    User.belongsToMany(Role, { through: "RoleUser" })
  }

  User.beforeCreate(preprocess)
  User.beforeUpdate(preprocess)

  return User
}

module.exports = model
