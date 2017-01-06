/**
 * Ticket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    autoPK: true,
    date: {
      type: 'date',
      required: true
    },
    evidence: {
      type: 'string',
      required: true
    },
    model: {
      type: 'string',
      required: true
    },
    // Foreing keys
    products: {
      collection: 'product',
      via: 'ticket',
      through: 'sales'
    }
  }
};
