export default {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Primary Key - Auto Incremental - Not Null - Unique.',
      },
      name: {
        type: 'string',
        maxLength: 32,
        description: 'Not Null.',
      },
      email: {
        type: 'string',
        maxLength: 255,
        description: 'Not Null - Unique.',
      },
      password: {
        type: 'string',
        maxLength: 64,
        description: 'Not Null.',
      },
      role: {
        type: 'integer',
        description: 'Not Null - 0 = client, 1 = admin.',
      },
    },
  },
};
