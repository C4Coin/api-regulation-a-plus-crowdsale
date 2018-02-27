const model = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"]
        }
      ]
    }
  )

  Role.associate = ({ User }) => {
    Role.belongsToMany(User, { through: "RoleUser" })
  }

  return Role
}

module.exports = model
