export default {
  '/auth/sign_in': {
    post: {
      tags: ['Authentication'],
      responses: {
        '200': {
          description: '',
          requestBody: {
            description: 'Optional description in *Markdown*',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: '',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'The user name',
                      },
                      email: {
                        type: 'string',
                      },
                      password: {
                        type: 'string',
                      },
                      role: {
                        type: 'integer',
                      },
                    },
                  },
                },
              },
            },
          },
        },

        '400': {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Bad Request. Email or password are wrong.',
                  },
                },
              },
            },
          },
        },

        '404': {
          description: 'Not found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Not found. User is not at the database.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  '/auth/create_user': {
    post: {
      tags: ['Authentication'],
      responses: {
        '200': {
          description: 'OK',
          requestBody: {
            description: 'Optional description in *Markdown*',
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: '',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'The user name',
                      },
                      email: {
                        type: 'string',
                      },
                      password: {
                        type: 'string',
                      },
                      role: {
                        type: 'integer',
                      },
                    },
                  },
                },
              },
            },
          },
        },

        '400': {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Bad Request. Email or password are wrong.',
                  },
                },
              },
            },
          },
        },

        '404': {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Not found. User is not at the database.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
