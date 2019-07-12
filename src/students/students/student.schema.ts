export const studentSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Student',
  description: 'Schema for student entity',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  required: ['name', 'email'],
};
