/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  attributes: {
    idemployee: {
      type: 'integer',
      primaryKey: true,
      required: true
    },
    full_name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email'
    },
    password: {
      type: 'string',
      required: true
    },
    rol: {
      type: 'string',
      required: true
    },
    // Foreign key 1-m
    workingAt: {
      model: 'branch'
    }
  }
};
