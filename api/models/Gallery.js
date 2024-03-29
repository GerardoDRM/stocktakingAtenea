/**
 * Gallery.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idgallery: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: 'string',
      required: true
    },
    // Foreign keys
    product_idproduct: {
      model: 'product'
    }

  }
};
