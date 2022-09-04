export default {
  Category: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Primary Key - Not Null - Auto Incremental - Unique.',
      },
      name: {
        type: 'string',
        description: 'Not Null - Unique.',
      },
    },
  },
};
