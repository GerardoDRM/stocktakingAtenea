/**
 * Ticket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idticket: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: 'date',
      required: true
    },
    evidence: {
      type: 'string'
    },
    model: {
      type: 'string'
    }
  }
};
