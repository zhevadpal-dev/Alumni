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
      name: 'API Users (ApiUserController)',
      description: 'RESTful API user endpoints returning standard JSON payloads (/api/users)'
    },
    {
      name: 'Web Users (UserController)',
      description: 'Web MVC user endpoints supporting HTML views and web requests (/users)'
    },
    {
      name: 'API Announcements (ApiAnnouncementController)',
      description: 'RESTful API announcement endpoints returning standard JSON payloads (/api/announcements)'
    },
    {
      name: 'Web Announcements (AnnouncementController)',
      description: 'Web management interface and HTML UI endpoints for announcements (/announcements)'
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
        tags: ['API Users (ApiUserController)'],
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
        tags: ['API Users (ApiUserController)'],
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
        tags: ['API Users (ApiUserController)'],
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
        tags: ['API Users (ApiUserController)'],
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
        tags: ['API Users (ApiUserController)'],
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
        tags: ['API Users (ApiUserController)'],
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
    '/users': {
      get: {
        tags: ['Web Users (UserController)'],
        summary: 'Web user directory listing (HTML or JSON)',
        description: 'Returns server-rendered HTML page of users for browsers (Accept: text/html) or JSON list for API requests.',
        parameters: [
          {
            name: 'role',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['alumni', 'student', 'faculty', 'admin'] }
          },
          {
            name: 'department',
            in: 'query',
            required: false,
            schema: { type: 'string', example: 'Computer Science' }
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: { type: 'string', example: 'Alumni' }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML directory page or JSON user list',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...</html>' }
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 2 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Web Users (UserController)'],
        summary: 'Create user via web form or JSON',
        description: 'Creates a new user record via form data or JSON body.',
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
          '201': {
            description: 'User created successfully (HTML confirmation or JSON)',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...User Registered Successfully!...</html>' }
              },
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
            description: 'Validation error (missing name or email)',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Registration Error...</html>' }
              },
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          },
          '409': {
            description: 'Email already registered',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...A user with this email already exists...</html>' }
              },
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['Web Users (UserController)'],
        summary: 'Web user profile page (HTML or JSON)',
        description: 'Returns server-rendered HTML profile page for browsers or JSON for API clients.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML profile page or JSON user record',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...</html>' }
              },
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
          '404': {
            description: 'User not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      },
      put: {
        tags: ['Web Users (UserController)'],
        summary: 'Full update of user record via web endpoint (PUT)',
        description: 'Replaces all fields of user record.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
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
          '400': { description: 'Missing required fields or invalid ID' },
          '404': { description: 'User not found' },
          '409': { description: 'Email already used by another record' }
        }
      },
      patch: {
        tags: ['Web Users (UserController)'],
        summary: 'Partial update of user record via web endpoint (PATCH)',
        description: 'Modifies only specific fields of user record.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
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
          '404': { description: 'User not found' },
          '409': { description: 'Email already in use' }
        }
      },
      delete: {
        tags: ['Web Users (UserController)'],
        summary: 'Delete user record via web endpoint',
        description: 'Removes user record by ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'User successfully deleted (HTML confirmation or JSON)',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...User Deleted Successfully...</html>' }
              },
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
          '404': { description: 'User not found' }
        }
      }
    },
    '/users/{id}/edit': {
      get: {
        tags: ['Web Users (UserController)'],
        summary: 'Web user edit form view',
        description: 'Returns server-rendered HTML form populated with existing user record for browser editing.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML edit form page',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...<form action="/users/1/edit" method="POST">...</html>' }
              }
            }
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/announcements': {
      get: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'List all announcements',
        description: 'Retrieves all announcements stored in memory with optional filtering by category, author, search keyword, and pagination.',
        parameters: [
          {
            name: 'category',
            in: 'query',
            required: false,
            description: 'Filter by category (General, Event, Career, Academic, News, Urgent)',
            schema: { type: 'string', enum: ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'] }
          },
          {
            name: 'author',
            in: 'query',
            required: false,
            description: 'Filter by publishing author or office substring',
            schema: { type: 'string', example: 'Alumni' }
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'Search keyword across title, content, or author',
            schema: { type: 'string', example: 'Homecoming' }
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Limit returned results count',
            schema: { type: 'integer', example: 10 }
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'Page offset',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of announcements returned successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 3 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Announcement' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'Create a new announcement',
        description: 'Publishes and persists a new announcement record in memory.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AnnouncementInput' }
            },
            'application/x-www-form-urlencoded': {
              schema: { $ref: '#/components/schemas/AnnouncementInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Announcement created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement created successfully' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation error (missing title or content)',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } }
            }
          }
        }
      }
    },
    '/api/announcements/{id}': {
      get: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'Get single announcement by ID',
        description: 'Retrieves announcement details by numeric ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Announcement found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '400': { description: 'Invalid numeric ID provided' },
          '404': { description: 'Announcement not found' }
        }
      },
      put: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'Update announcement (PUT)',
        description: 'Updates announcement attributes.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/AnnouncementInput' } }
          }
        },
        responses: {
          '200': {
            description: 'Announcement updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement updated successfully' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '400': { description: 'Validation error' },
          '404': { description: 'Announcement not found' }
        }
      },
      patch: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'Partial update of announcement (PATCH)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                  author: { type: 'string' },
                  category: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Announcement updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement updated successfully' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '400': { description: 'Validation error' },
          '404': { description: 'Announcement not found' }
        }
      },
      delete: {
        tags: ['API Announcements (ApiAnnouncementController)'],
        summary: 'Delete announcement',
        description: 'Permanently removes an announcement record from memory.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Announcement successfully deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement with ID #1 has been successfully deleted.' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '204': { description: 'No content (if requested via status=204)' },
          '400': { description: 'Invalid numeric ID provided' },
          '404': { description: 'Announcement not found' }
        }
      }
    },
    '/announcements': {
      get: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Web announcement management interface (HTML or JSON)',
        description: 'Returns server-rendered HTML management interface with overview stats, announcement table, and embedded creation form.',
        parameters: [
          {
            name: 'category',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'] }
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: { type: 'string', example: 'Mentorship' }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML management UI or JSON list',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Announcement Management...</html>' }
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 3 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Announcement' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Create announcement via web form or request',
        description: 'Processes announcement creation and returns rendered HTML confirmation or JSON.',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: { $ref: '#/components/schemas/AnnouncementInput' }
            },
            'application/json': {
              schema: { $ref: '#/components/schemas/AnnouncementInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Announcement created successfully (HTML confirmation or JSON)',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Announcement Published Successfully!...</html>' }
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement created successfully' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '400': { description: 'Validation error (missing title or content)' }
        }
      }
    },
    '/announcements/new': {
      get: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Web announcement creation form page',
        description: 'Returns standalone HTML form page for creating a new announcement.',
        responses: {
          '200': {
            description: 'Rendered HTML form page',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...New Announcement...</html>' }
              }
            }
          }
        }
      }
    },
    '/announcements/{id}': {
      get: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Web announcement detail reading view',
        description: 'Returns server-rendered HTML reading page for a specific announcement.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML reading view or JSON announcement',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Announcement Detail...</html>' }
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/Announcement' }
                  }
                }
              }
            }
          },
          '404': { description: 'Announcement not found' }
        }
      }
    },
    '/announcements/{id}/edit': {
      get: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Web announcement edit form view',
        description: 'Returns server-rendered HTML form pre-populated with announcement data.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML edit form page',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Edit Announcement...</html>' }
              }
            }
          },
          '404': { description: 'Announcement not found' }
        }
      },
      post: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Process announcement edit form submission',
        description: 'Updates announcement record via form submission and renders updated view.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/AnnouncementInput' } },
            'application/json': { schema: { $ref: '#/components/schemas/AnnouncementInput' } }
          }
        },
        responses: {
          '200': { description: 'Announcement updated successfully (HTML confirmation or JSON)' },
          '400': { description: 'Validation error' },
          '404': { description: 'Announcement not found' }
        }
      }
    },
    '/announcements/{id}/delete': {
      post: {
        tags: ['Web Announcements (AnnouncementController)'],
        summary: 'Delete announcement via web form action',
        description: 'Processes deletion request from HTML management table or detail view.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Announcement successfully deleted (HTML confirmation or JSON)',
            content: {
              'text/html': {
                schema: { type: 'string', example: '<!DOCTYPE html><html>...Announcement Deleted...</html>' }
              },
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Announcement with ID #1 deleted successfully.' }
                  }
                }
              }
            }
          },
          '404': { description: 'Announcement not found' }
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
      Announcement: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Annual Alumni Homecoming 2026' },
          content: { type: 'string', example: 'We are thrilled to welcome all alumni back to campus for the Annual Homecoming Weekend...' },
          author: { type: 'string', example: 'Alumni Relations Office' },
          category: { type: 'string', enum: ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'], example: 'Event' },
          createdAt: { type: 'string', format: 'date-time', example: '2026-10-01T10:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-10-01T10:00:00.000Z' }
        }
      },
      AnnouncementInput: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string', example: 'Spring 2026 Mentorship Program Applications Open' },
          content: { type: 'string', example: 'Connect with current undergraduate students to provide career mentorship...' },
          author: { type: 'string', example: 'Career Development Center' },
          category: { type: 'string', enum: ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'], example: 'Career' }
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
