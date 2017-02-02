const immutable = require('immutable');

const ContactRecord = immutable.Record({
  id: null,
  firstName: null,
  lastName: null,
  type: null,
  profiles: [],
  avatarUrl: null,
  timezone: null,
  locale: 0,
  deleted: null,
  me: false,
});

class Contact extends ContactRecord {
  constructor(wrikeContact) {
    super(wrikeContact);
  }

}

module.exports = Contact;
