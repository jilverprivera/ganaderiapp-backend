export default {
  Animal: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Primary Key - Not Null - Auto Incremental - Unique.',
      },
      name: {
        type: 'string',
        maxLength: 32,
        description: 'Can be Null.',
      },
      serial: {
        type: 'integer',
        description: 'Can be Null.',
      },
      created_by: {
        type: 'integer',
        description: 'Foreign Key - Not Null - The user ID.',
      },
      category_id: {
        type: 'integer',
        description: 'Foreign Key - Not Null - The category ID.',
      },
      image_public_id: {
        type: 'string',
        maxLength: 255,
        description: 'Can be Null.',
      },
      image_url: {
        type: 'string',
        maxLength: 255,
        description: 'Can be Null.',
      },
      created_at: {
        type: 'timestamp',
        description: 'Not Null.',
      },
      born: {
        type: 'integer',
        description: 'Not Null - 0 = False, 1 = True.',
      },
      purchased: {
        type: 'integer',
        description: 'Not Null - 0 = False, 1 = True.',
      },
      purchased_price: {
        type: 'integer',
        description: 'Can be Null.',
      },
      purchased_weight: {
        type: 'integer',
        description: 'Can be Null.',
      },
      sold: {
        type: 'integer',
        description: 'Not Null - 0 = False, 1 = True.',
      },
      sold_price: {
        type: 'integer',
        description: 'Can be Null.',
      },
      sold_weight: {
        type: 'integer',
        description: 'Can be Null.',
      },
    },
  },
};
