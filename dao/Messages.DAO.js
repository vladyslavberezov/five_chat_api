const { db } = require('../lib/db')

async function getMessages(chatId, userId) {
  const userChat = await db.UserChats.findOne({
    where: {
      chatId,
      userId,
    },
    include: db.Messages,
  });
  return userChat.Messages;
}

function saveMessage(data) {
  const { userChatId, message, authorId, uuid } = data
  return db.Messages.create({
    text: message,
    userChatId,
    authorId,
    uuid,
  })
}

function deleteMessage(id) {
  return db.Messages.destroy({ where: { id } })
}

function deleteUserMessages(userChatId) {
  return db.Messages.destroy({ where: { userChatId } })
}

async function changeMessage(data) {
  let where = {}
  if (data.id) {
    where.id = data.id
  }
  if (data.userChatId) {
    where.userChatId = data.userChatId
  }
  if (data.uuid) {
    where.uuid = data.uuid
  }


  const message = await db.Messages.findOne({ where })
  if (!message) {
    throw Error(`Message not found.`)
  }

  Object.assign(message, data)
  await message.save()
  return message
}


module.exports = {
  saveMessage,
  deleteMessage,
  getMessages,
  changeMessage,
  deleteUserMessages,
}
