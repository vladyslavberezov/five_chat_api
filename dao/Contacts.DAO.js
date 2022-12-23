const { ConflictError } = require('../lib/errors')
const { db } = require('../lib/db')


function getUserContacts(userId) {
  return db.Contacts.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: db.User,
      attributes: [
        'firstName',
        'lastName',
        'lastOnline',
        'nickname',
      ],
    },
  })
}

function getUserContact(userId, contactUserId) {
  return db.Contacts.findOne({
    where: {
      userId,
      contactUserId,
    },
  });
}


async function addContact(userId, contactUserId) {
  const contactFound = await getUserContact(userId, contactUserId);
  if (contactFound) {
    throw new ConflictError('Contact already exist')
  }

  return db.Contacts.create({
    userId,
    contactUserId,
  }, {
    raw: true,
  })
}

function deleteContact(id) {
  return db.Contacts.destroy({ where: { id } })
}


module.exports = {
  addContact,
  deleteContact,
  getUserContacts,
}
