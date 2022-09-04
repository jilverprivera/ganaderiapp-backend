export default {
  '/api/users': {
    get: {
      tags: ['User'],
      summary: 'Return an array with all users hosted on Database (Clients and Admins).',
      parameters: [
        {
          in: 'header',
          name: 'token',
          schema: {
            type: 'string',
            format: 'byte',
          },
          required: true,
        },
      ],
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
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },

        '404': {
          description: 'Not Found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Not Found. User table does not have any clients yet.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/clients': {
    get: {
      tags: ['User'],
      summary: 'Return an array with a list of user clients.',
      parameters: [
        {
          in: 'header',
          name: 'token',
          schema: {
            type: 'string',
            format: 'byte',
          },
          required: true,
        },
      ],
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
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/user/{id}': {
    get: {
      tags: ['User'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          required: true,
        },
        {
          in: 'header',
          name: 'token',
          schema: {
            type: 'string',
            format: 'byte',
          },
          required: true,
        },
      ],
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
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['User'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          required: true,
        },
        {
          in: 'header',
          name: 'token',
          schema: {
            type: 'string',
            format: 'byte',
          },
          required: true,
        },
      ],
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
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['User'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          required: true,
        },
        {
          in: 'header',
          name: 'token',
          schema: {
            type: 'string',
            format: 'byte',
          },
          required: true,
        },
      ],
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
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
};
