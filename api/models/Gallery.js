/**
 * Gallery.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    autoPK: true,
    autoCreatedAt: false,
    autoUpdatedAt: false,

    idgallery: {
      type: 'integer',
      primaryKey: true,
      required: true
    },
    url: {
      type: 'string',
      required: true
    },
    // Foreign keys
    idproduct: {
      model: 'product'
    }

  }
};
