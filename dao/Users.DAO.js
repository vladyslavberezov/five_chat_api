const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { db } = require('../lib/db')

function getUserById(id) {
  return db.User.findByPk(id)
}

async function getAllUsers() {
  return db.User.findAll()
}

async function saveUser(data) {
  let user
  if (data.id) {
    user = await db.User.findByPk(data.id)
  } else {
    user = new db.User()
    data.password = await bcrypt.hash(data.password, 8)
  }

  Object.assign(user, data)

  await user.save()
  return user
}

async function deleteUser(id) {
  return db.User.destroy({ where: { id: id } })
}

async function findUnique(data) {
  return await db.User.findOne({
    where: {
      [Op.or]: [
        {
          nickname: data.nickname,
        }, {
          email: data.email,
        },
      ],
    },
  })

}


module.exports = {
  getUserById,
  getAllUsers,
  saveUser,
  deleteUser,
  findUnique,
}
