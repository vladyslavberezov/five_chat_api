const { ConflictError, InternalServerError } = require('../lib/errors')
const { sequelize, db } = require('../lib/db')
const { Op } = require('sequelize')


function getChat(chatId) {
  return db.Chats.findByPk(chatId, {
    include: [{
      model: db.UserChats,
    }],
  })
}

function getAllChats(userId) {
  return db.Chats.findAll({
    include: [
      {
        model: db.UserChats,
        where: { userId },
      },
    ],
  })
}

async function updateChat(data) {
  const exist = await db.Chats.findOne({
    where: {
      id: data.chatId,
    },
  })
  if (!exist) {
    throw Error(`Chat not updated. id: ${data.chatId}`)
  }
  exist.title = data.title
  await exist.save()
}

async function createChat(data, user) {
  if (data.users.length === 1) {
    const exist = await db.Chats.findAll({
      where: {
        isGroup: false,
      },
      include: [{
        model: db.UserChats,
        where: {
          [Op.or]: [
            {
              userId: user.id,
            },
            {
              userId: data.users[0],
            },
          ],
        },
      }],
    })

    if (exist?.length) {
      throw new ConflictError('Chat already exist')
    }
  }

  const chat = await db.Chats.create({
    title: data.title,
    isGroup: data.users.length > 1,
  }, { raw: true })

  const userChats = await db.UserChats.bulkCreate(
    data.users
      .concat([user.id])
      .map((userId) => ({
        chatId: chat.id,
        userId: userId,
      })),
  )

  return {
    ...(chat.get({ plain: true })),
    participants: userChats,
  }
}

async function deleteChat(id) {
  const transaction = await sequelize.transaction()
  try {
    await db.UserChats.destroy({
      where: {
        chatId: id,
      },
      transaction,
    })

    const deleteCount = await db.Chats.destroy({
      where: { id },
      transaction,
    })

    if (!deleteCount) {
      throw new InternalServerError('Unable to delete chat')
    }

    await transaction.commit()

    return id
  } catch (error) {
    await transaction.rollback()
    throw error
  }

}

async function updateUserChat(id, data) {
  const userChat = await db.UserChats.findOne({
    where: { id },
  })
  if (!userChat) {
    throw Error(`Chat not updated. id: ${data.chatId}`)
  }
  Object.assign(userChat, data)
  await userChat.save()
}


module.exports = {
  getChat,
  getAllChats,
  updateChat,
  createChat,
  deleteChat,
  updateUserChat,
}
