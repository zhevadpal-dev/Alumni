/**
 * OpenAPI 3.0.0 Specification for Alumni Tracking System API
 */
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Alumni Tracking System API',
    version: '1.0.0',
    description: 'Comprehensive interactive documentation and API testing playground for the Alumni Tracking System backend platform.',
    contact: {
      name: 'Alumni Dev Team',
      email: 'zhevadpal@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local Docker / Development Server'
    }
  ],
  tags: [
    {
      name: 'System Health',
      description: 'System telemetry, runtime status, and healthcheck operations'
    },
    {
      name: 'Users',
      description: 'In-memory user management operations (CRUD)'
    },
    {
      name: 'Core Lab Routes',
      description: 'Basic laboratory and greeting endpoints'
    }
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['System Health'],
        summary: 'System health check',
        description: 'Returns real-time server health status, uptime, node version, memory metrics, and platform details in JSON.',
        responses: {
          '200': {
            description: 'System is healthy and operational',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'List all users',
        description: 'Retrieves all registered user records stored in memory with optional filtering, search, and pagination.',
        parameters: [
          {
            name: 'role',
            in: 'query',
            required: false,
            description: 'Filter users by role (alumni, student, faculty, admin)',
            schema: { type: 'string', enum: ['alumni', 'student', 'faculty', 'admin'] }
          },
          {
            name: 'department',
            in: 'query',
            required: false,
            description: 'Filter users by academic department',
            schema: { type: 'string', example: 'Computer Science' }
          },
          {
            name: 'graduationYear',
            in: 'query',
            required: false,
            description: 'Filter users by graduation year',
            schema: { type: 'integer', example: 2023 }
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'Search substring across name, email, department, or company',
            schema: { type: 'string', example: 'Alumni' }
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Maximum number of users to return (for pagination)',
            schema: { type: 'integer', example: 10 }
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'Page number (for pagination)',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of users returned successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 2 },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Registers a new user record. Accepts form data (urlencoded/multipart) or JSON payloads.',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/UserInput'
              }
            },
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'User created successfully' },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Missing required fields (name and email are mandatory)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '409': {
            description: 'Email address already registered',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get single user by ID',
        description: 'Returns profile details for a specific user ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric user ID',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'User details found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid numeric ID provided',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '404': {
            description: 'User not found with given ID',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Full update of user record (PUT)',
        description: 'Completely replaces an existing user record. Name and email are required.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric user ID to update',
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: { $ref: '#/components/schemas/UserInput' }
            },
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' }
            }
          }
        },
        responses: {
          '200': {
            description: 'User record completely updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'User completely updated successfully (PUT)' },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Missing required fields or invalid ID',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '409': {
            description: 'Email already used by another record',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      patch: {
        tags: ['Users'],
        summary: 'Partial update of user record (PATCH)',
        description: 'Modifies only specific fields of an existing user record (e.g. only department or role).',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric user ID to partially update',
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  role: { type: 'string' },
                  department: { type: 'string' },
                  graduationYear: { type: 'integer' }
                }
              }
            },
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  role: { type: 'string' },
                  department: { type: 'string' },
                  graduationYear: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'User record partially updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'User partially updated successfully (PATCH)' },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '409': {
            description: 'Email already in use',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user record',
        description: 'Removes an existing user record from in-memory storage by ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric user ID to delete',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'User successfully deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'User with ID 1 has been successfully deleted.' },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/': {
      get: {
        tags: ['Core Lab Routes'],
        summary: 'Root / Home endpoint',
        description: 'Returns "ok" for API/curl requests or temporary home page placeholder for browser requests.',
        responses: {
          '200': {
            description: 'Success response',
            content: {
              'text/plain': {
                schema: { type: 'string', example: 'ok' }
              }
            }
          }
        }
      }
    },
    '/hello': {
      get: {
        tags: ['Core Lab Routes'],
        summary: 'Hello World greeting',
        description: 'Returns standard "Hello, World!" text.',
        responses: {
          '200': {
            description: 'Greeting returned',
            content: {
              'text/plain': {
                schema: { type: 'string', example: 'Hello, World!' }
              }
            }
          }
        }
      }
    },
    '/hello/{name}': {
      get: {
        tags: ['Core Lab Routes'],
        summary: 'Personalized greeting',
        description: 'Returns personalized greeting with capitalized name (e.g. "Hello, Emre!").',
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'emre' }
          }
        ],
        responses: {
          '200': {
            description: 'Greeting returned',
            content: {
              'text/plain': {
                schema: { type: 'string', example: 'Hello, Emre!' }
              }
            }
          }
        }
      }
    },
    '/sum/{number1}/{number2}': {
      get: {
        tags: ['Core Lab Routes'],
        summary: 'Summation of two numbers',
        description: 'Adds number1 and number2 and returns the calculated sum.',
        parameters: [
          {
            name: 'number1',
            in: 'path',
            required: true,
            schema: { type: 'number', example: 15 }
          },
          {
            name: 'number2',
            in: 'path',
            required: true,
            schema: { type: 'number', example: 25 }
          }
        ],
        responses: {
          '200': {
            description: 'Sum returned as text',
            content: {
              'text/plain': {
                schema: { type: 'string', example: '40' }
              }
            }
          },
          '400': {
            description: 'Invalid non-numeric input'
          }
        }
      }
    },
    '/about': {
      get: {
        tags: ['Core Lab Routes'],
        summary: 'About page placeholder',
        description: 'Returns "temp. about page" placeholder.',
        responses: {
          '200': {
            description: 'Placeholder returned',
            content: {
              'text/plain': {
                schema: { type: 'string', example: 'temp. about page' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Zeynep Naz' },
          email: { type: 'string', format: 'email', example: 'zeynep@example.com' },
          role: { type: 'string', example: 'alumni' },
          department: { type: 'string', example: 'Computer Engineering' },
          graduationYear: { type: 'integer', example: 2024 },
          createdAt: { type: 'string', format: 'date-time', example: '2026-09-30T07:30:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-09-30T07:44:00.000Z' }
        }
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'Zeynep Naz' },
          email: { type: 'string', format: 'email', example: 'zeynep@example.com' },
          role: { type: 'string', example: 'alumni' },
          department: { type: 'string', example: 'Computer Engineering' },
          graduationYear: { type: 'integer', example: 2024 }
        }
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'OK' },
          healthy: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Alumni Tracking System API is running healthy' },
          timestamp: { type: 'string', format: 'date-time' },
          uptime: { type: 'number', example: 142.5 },
          uptimeFormatted: { type: 'string', example: '2m 22s' },
          environment: { type: 'string', example: 'development' },
          service: { type: 'string', example: 'Alumni Tracking System Backend' },
          version: { type: 'string', example: '1.0.0' },
          system: {
            type: 'object',
            properties: {
              platform: { type: 'string', example: 'linux' },
              arch: { type: 'string', example: 'arm64' },
              nodeVersion: { type: 'string', example: 'v20.20.2' },
              pid: { type: 'integer', example: 18 }
            }
          },
          memory: {
            type: 'object',
            properties: {
              rss: { type: 'string', example: '45.12 MB' },
              heapTotal: { type: 'string', example: '16.45 MB' },
              heapUsed: { type: 'string', example: '11.80 MB' },
              external: { type: 'string', example: '1.85 MB' }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'error' },
          message: { type: 'string', example: 'Descriptive error message' }
        }
      }
    }
  }
};

module.exports = swaggerSpec;
