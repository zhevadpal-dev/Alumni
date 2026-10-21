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
    },
    {
      name: 'API Job Postings (ApiJobController)',
      description: 'RESTful API job posting endpoints returning standard JSON payloads (/api/jobs)'
    },
    {
      name: 'API Applications (ApiApplicationController)',
      description: 'RESTful API job application endpoints managing Many-to-Many candidate submissions and statuses (/api/applications)'
    },
    {
      name: 'Domain Relations & Sub-Resources',
      description: 'Relational query endpoints navigating associations between Users, Announcements, Job Postings, and Applications'
    },
    {
      name: 'Web Job Postings (JobController)',
      description: 'Web MVC job board and opportunity management interface endpoints (/jobs)'
    },
    {
      name: 'Web Applications (ApplicationController)',
      description: 'Web MVC candidate tracking dashboard and review workflow endpoints (/applications)'
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
            description: 'Filter users by role (alumni, student, faculty, teacher, admin)',
            schema: { type: 'string', enum: ['alumni', 'student', 'faculty', 'teacher', 'admin'] }
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
            schema: { type: 'string', enum: ['alumni', 'student', 'faculty', 'teacher', 'admin'] }
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
    },
    '/api/jobs': {
      get: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'List all job postings',
        description: 'Retrieves all job postings with optional filtering by status, job type, company, location, poster user, substring search, and pagination.',
        parameters: [
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'Filter by job lifecycle status',
            schema: { type: 'string', enum: ['Active', 'Closed', 'Draft', 'Expired'] }
          },
          {
            name: 'jobType',
            in: 'query',
            required: false,
            description: 'Filter by employment type',
            schema: { type: 'string', enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'] }
          },
          {
            name: 'company',
            in: 'query',
            required: false,
            description: 'Filter by company name substring',
            schema: { type: 'string', example: 'TechCorp' }
          },
          {
            name: 'location',
            in: 'query',
            required: false,
            description: 'Filter by location substring',
            schema: { type: 'string', example: 'Remote' }
          },
          {
            name: 'posterId',
            in: 'query',
            required: false,
            description: 'Filter by author poster user ID',
            schema: { type: 'integer', example: 1 }
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'Substring search across title, company, description, and requirements',
            schema: { type: 'string', example: 'Backend' }
          },
          {
            name: 'withPoster',
            in: 'query',
            required: false,
            description: 'Whether to eager-load and join poster User profile details',
            schema: { type: 'boolean', example: true }
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Maximum number of items to return',
            schema: { type: 'integer', example: 10 }
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'Page number for pagination',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of job postings matching filter criteria',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 3 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/JobPosting' }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      post: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'Create a new job posting',
        description: 'Creates and persists a new job posting record in PostgreSQL.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/JobPostingInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Job posting created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Job posting created successfully.' },
                    data: { $ref: '#/components/schemas/JobPosting' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation failure or invalid payload',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      }
    },
    '/api/jobs/{id}': {
      get: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'Get single job posting by ID',
        description: 'Retrieves a single job posting by ID joined with its poster User details.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Job posting found and returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/JobPosting' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Job posting not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
          }
        }
      },
      put: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'Update job posting completely (PUT)',
        description: 'Replaces all attributes of the specified job posting record.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/JobPostingInput' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Job posting updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Job posting updated successfully.' },
                    data: { $ref: '#/components/schemas/JobPosting' }
                  }
                }
              }
            }
          },
          '400': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Job posting not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      },
      patch: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'Update job posting partially (PATCH)',
        description: 'Updates only provided attributes of the specified job posting.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { status: { type: 'string', enum: ['Active', 'Closed', 'Draft', 'Expired'] } } }
            }
          }
        },
        responses: {
          '200': { description: 'Job posting partially updated successfully' },
          '404': { description: 'Job posting not found' }
        }
      },
      delete: {
        tags: ['API Job Postings (ApiJobController)'],
        summary: 'Delete job posting by ID',
        description: 'Permanently deletes a job posting from the PostgreSQL database.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting to delete',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Job posting deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Job posting with ID 1 was deleted successfully.' }
                  }
                }
              }
            }
          },
          '404': { description: 'Job posting not found' }
        }
      }
    },
    '/api/jobs/{id}/poster': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get poster user for a job posting',
        description: 'Direct relational sub-route returning the User entity who posted the job.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Poster user record returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    jobId: { type: 'integer', example: 1 },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '404': { description: 'Job posting or poster user not found' }
        }
      }
    },
    '/api/users/{id}/announcements': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get announcements authored by user',
        description: 'Direct relational sub-route returning all announcements created by the specified user (1-to-Many).',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the user',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of announcements authored by the user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    userId: { type: 'integer', example: 1 },
                    count: { type: 'integer', example: 2 },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Announcement' } }
                  }
                }
              }
            }
          },
          '404': { description: 'User not found' }
        }
      }
    },
    '/api/users/{id}/jobs': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get job postings created by user',
        description: 'Direct relational sub-route returning all job postings posted by the specified user (1-to-Many).',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the user',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of job postings created by the user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    userId: { type: 'integer', example: 1 },
                    count: { type: 'integer', example: 2 },
                    data: { type: 'array', items: { $ref: '#/components/schemas/JobPosting' } }
                  }
                }
              }
            }
          },
          '404': { description: 'User not found' }
        }
      }
    },
    '/api/users/{id}/relations': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get user profile with full relations',
        description: 'Direct relational sub-route returning user record eager-loaded with both announcements and jobPostings collections.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the user',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'User record with eager-loaded relations returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/UserWithRelations' }
                  }
                }
              }
            }
          },
          '404': { description: 'User not found' }
        }
      }
    },
    '/api/announcements/{id}/author': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get author user for an announcement',
        description: 'Direct relational sub-route returning the User entity who authored the announcement.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the announcement',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Author user entity returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    announcementId: { type: 'integer', example: 1 },
                    data: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '404': { description: 'Announcement or author user not found' }
        }
      }
    },
    '/api/applications': {
      get: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'List all job applications',
        description: 'Retrieves all job applications with optional filtering by user, job, review status, and pagination.',
        parameters: [
          {
            name: 'userId',
            in: 'query',
            required: false,
            description: 'Filter applications by applicant user ID',
            schema: { type: 'integer', example: 2 }
          },
          {
            name: 'jobId',
            in: 'query',
            required: false,
            description: 'Filter applications by target job posting ID',
            schema: { type: 'integer', example: 1 }
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'Filter by application status',
            schema: {
              type: 'string',
              enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'],
              example: 'Submitted'
            }
          },
          {
            name: 'withDetails',
            in: 'query',
            required: false,
            description: 'Eagerly include nested applicant User and target JobPosting entity objects',
            schema: { type: 'boolean', example: false }
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: 'Limit maximum returned records',
            schema: { type: 'integer', example: 10 }
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'Pagination page index (default: 1)',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of matching applications returned successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    count: { type: 'integer', example: 2 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Application' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'Submit a new job application',
        description: 'Creates a new application row in PostgreSQL. Enforces composite uniqueness (user cannot apply twice to the same job).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApplicationInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Application submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Application submitted successfully.' },
                    data: { $ref: '#/components/schemas/Application' }
                  }
                }
              }
            }
          },
          '400': { description: 'Missing required fields or invalid payload' },
          '409': { description: 'Conflict: user has already applied for this job posting' }
        }
      }
    },
    '/api/applications/{id}': {
      get: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'Get application by ID with nested details',
        description: 'Retrieves an application record by its primary key with joined candidate User and target JobPosting objects.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the application',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Application found and returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/ApplicationWithDetails' }
                  }
                }
              }
            }
          },
          '404': { description: 'Application not found' }
        }
      },
      put: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'Update application record',
        description: 'Full update of an existing application record.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the application',
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
                  status: {
                    type: 'string',
                    enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'],
                    example: 'Under Review'
                  },
                  coverLetter: { type: 'string', example: 'Updated cover letter details...' },
                  resumeUrl: { type: 'string', format: 'uri', example: 'https://storage.example.com/resumes/v2.pdf' },
                  notes: { type: 'string', example: 'Recruiter phone screening passed.' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Application updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Application updated successfully.' },
                    data: { $ref: '#/components/schemas/Application' }
                  }
                }
              }
            }
          },
          '400': { description: 'Invalid payload' },
          '404': { description: 'Application not found' }
        }
      },
      patch: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'Partially modify an application',
        description: 'Update subset of fields (e.g. status transition from Submitted to Under Review or Accepted).',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the application',
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
                  status: {
                    type: 'string',
                    enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'],
                    example: 'Accepted'
                  },
                  notes: { type: 'string', example: 'Candidate accepted verbal offer.' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Application updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Application modified successfully.' },
                    data: { $ref: '#/components/schemas/Application' }
                  }
                }
              }
            }
          },
          '404': { description: 'Application not found' }
        }
      },
      delete: {
        tags: ['API Applications (ApiApplicationController)'],
        summary: 'Delete or withdraw an application',
        description: 'Permanently deletes an application record from PostgreSQL.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the application',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'Application deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Application #1 deleted successfully.' },
                    data: { $ref: '#/components/schemas/Application' }
                  }
                }
              }
            }
          },
          '404': { description: 'Application not found' }
        }
      }
    },
    '/api/jobs/{id}/applications': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get all applications for a job posting',
        description: 'Relational 1-to-Many endpoint returning applications submitted for the specified job posting, including applicant user summary.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'Filter applications by status',
            schema: { type: 'string', example: 'Submitted' }
          }
        ],
        responses: {
          '200': {
            description: 'List of applications for the job posting',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    jobId: { type: 'integer', example: 1 },
                    count: { type: 'integer', example: 2 },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', example: 1 },
                          userId: { type: 'integer', example: 2 },
                          jobId: { type: 'integer', example: 1 },
                          status: { type: 'string', example: 'Under Review' },
                          applicantName: { type: 'string', example: 'Zeynep Naz' },
                          applicantEmail: { type: 'string', example: 'zeynep@example.com' },
                          appliedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'Job posting not found' }
        }
      }
    },
    '/api/jobs/{id}/applicants': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get applicant users for a job posting (Many-to-Many)',
        description: 'Direct Many-to-Many resolution returning candidate User profiles who applied to this job posting.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting',
            schema: { type: 'integer', example: 1 }
          }
        ],
        responses: {
          '200': {
            description: 'List of applicant users returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    jobId: { type: 'integer', example: 1 },
                    count: { type: 'integer', example: 2 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'Job posting not found' }
        }
      }
    },
    '/api/jobs/{id}/apply': {
      post: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Candidate applies to a job posting',
        description: 'Direct endpoint for a user to submit an application to the specified job posting.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the job posting to apply to',
            schema: { type: 'integer', example: 1 }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApplicationApplyInput' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Application successfully created for this job posting',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    message: { type: 'string', example: 'Application submitted successfully for this job posting.' },
                    data: { $ref: '#/components/schemas/Application' }
                  }
                }
              }
            }
          },
          '400': { description: 'Invalid request or missing userId' },
          '404': { description: 'Job posting not found' },
          '409': { description: 'Conflict: user has already applied for this job' }
        }
      }
    },
    '/api/users/{id}/applications': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get all applications submitted by a user',
        description: 'Relational 1-to-Many query returning all applications submitted by the specified candidate User, including target job details.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the candidate user',
            schema: { type: 'integer', example: 2 }
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'Filter applications by status',
            schema: { type: 'string', example: 'Under Review' }
          }
        ],
        responses: {
          '200': {
            description: 'List of submitted applications returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    userId: { type: 'integer', example: 2 },
                    count: { type: 'integer', example: 1 },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', example: 1 },
                          userId: { type: 'integer', example: 2 },
                          jobId: { type: 'integer', example: 1 },
                          status: { type: 'string', example: 'Under Review' },
                          jobTitle: { type: 'string', example: 'Senior Backend Engineer' },
                          jobCompany: { type: 'string', example: 'TechCorp Solutions' },
                          appliedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'User not found' }
        }
      }
    },
    '/api/users/{id}/applied-jobs': {
      get: {
        tags: ['Domain Relations & Sub-Resources'],
        summary: 'Get job postings applied to by a user (Many-to-Many)',
        description: 'Direct Many-to-Many resolution returning all JobPosting records that the candidate User has applied to.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the candidate user',
            schema: { type: 'integer', example: 2 }
          }
        ],
        responses: {
          '200': {
            description: 'List of applied job postings returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    userId: { type: 'integer', example: 2 },
                    count: { type: 'integer', example: 1 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/JobPosting' }
                    }
                  }
                }
              }
            }
          },
          '404': { description: 'User not found' }
        }
      }
    },
    '/jobs': {
      get: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Web job opportunities board (HTML or JSON)',
        description: 'Returns server-rendered responsive job opportunities board with metrics cards, search filters, and embedded quick-post form.',
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search keywords in title, company, or description' },
          { name: 'jobType', in: 'query', schema: { type: 'string', enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'] }, description: 'Filter by job type' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['Active', 'Closed'] }, description: 'Filter by status' }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML job board or JSON array of jobs',
            content: { 'text/html': {}, 'application/json': {} }
          }
        }
      },
      post: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Create new job posting via web form',
        description: 'Submits new job posting from web UI, persists to PostgreSQL, and redirects to job board.',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                required: ['title', 'company', 'description'],
                properties: {
                  title: { type: 'string', example: 'Senior DevOps Architect' },
                  company: { type: 'string', example: 'CloudWave Systems' },
                  location: { type: 'string', example: 'Istanbul / Remote' },
                  jobType: { type: 'string', enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'], example: 'Full-Time' },
                  description: { type: 'string', example: 'Managing cloud infrastructure and CI/CD pipelines.' },
                  requirements: { type: 'string', example: '5+ years Kubernetes, Terraform, AWS experience.' },
                  salaryRange: { type: 'string', example: '$90,000 - $120,000' },
                  applicationUrl: { type: 'string', example: 'https://careers.cloudwave.com/apply' },
                  contactEmail: { type: 'string', example: 'recruiting@cloudwave.com' },
                  posterId: { type: 'integer', example: 1 },
                  status: { type: 'string', enum: ['Active', 'Draft', 'Closed'], example: 'Active' },
                  deadline: { type: 'string', format: 'date', example: '2026-12-31' }
                }
              }
            }
          }
        },
        responses: {
          '302': { description: 'Redirect to /jobs?status=created' },
          '201': { description: 'Job posting created (JSON clients)' },
          '400': { description: 'Validation error' }
        }
      }
    },
    '/jobs/new': {
      get: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Standalone job posting creation form view',
        description: 'Renders standalone HTML creation form for publishing a new career opportunity.',
        responses: {
          '200': { description: 'Rendered creation form HTML' }
        }
      }
    },
    '/jobs/{id}': {
      get: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Web job posting detail, apply form, and applicant list',
        description: 'Renders detailed view of a job posting including candidate application submission form and list of applicants.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Job posting ID' }
        ],
        responses: {
          '200': { description: 'Rendered detail view HTML' },
          '404': { description: 'Job posting not found' }
        }
      }
    },
    '/jobs/{id}/edit': {
      get: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Web job posting edit form view',
        description: 'Renders pre-populated HTML form for editing an existing job posting.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Job posting ID' }
        ],
        responses: {
          '200': { description: 'Rendered edit form HTML' },
          '404': { description: 'Job posting not found' }
        }
      },
      post: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Update job posting via web form submission',
        description: 'Updates job posting attributes and redirects back to job detail view.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Job posting ID' }
        ],
        responses: {
          '302': { description: 'Redirect to /jobs/{id}?status=updated' },
          '200': { description: 'Job posting updated' },
          '400': { description: 'Validation error' }
        }
      }
    },
    '/jobs/{id}/delete': {
      post: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Delete job posting via web action',
        description: 'Deletes job posting from PostgreSQL and redirects to job board.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Job posting ID' }
        ],
        responses: {
          '302': { description: 'Redirect to /jobs?status=deleted' },
          '200': { description: 'Job posting deleted' }
        }
      }
    },
    '/jobs/{id}/apply': {
      post: {
        tags: ['Web Job Postings (JobController)'],
        summary: 'Submit candidate job application from job detail view',
        description: 'Registers candidate application linking User profile with this job opening.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Job posting ID' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                required: ['userId'],
                properties: {
                  userId: { type: 'integer', example: 2, description: 'Candidate User ID' },
                  coverLetter: { type: 'string', example: 'Very interested in joining CloudWave Systems!' },
                  resumeUrl: { type: 'string', example: 'https://storage.example.com/resumes/candidate.pdf' },
                  notes: { type: 'string', example: 'Faculty referral' }
                }
              }
            }
          }
        },
        responses: {
          '302': { description: 'Redirect to /jobs/{id}?status=applied#apply-form' },
          '201': { description: 'Application registered successfully' },
          '409': { description: 'Candidate has already applied for this job' }
        }
      }
    },
    '/applications': {
      get: {
        tags: ['Web Applications (ApplicationController)'],
        summary: 'Web candidate applications tracking dashboard (HTML or JSON)',
        description: 'Renders application tracking board with review metrics, status filters, and manual registration form.',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filter by review status' },
          { name: 'jobId', in: 'query', schema: { type: 'integer' }, description: 'Filter by job posting ID' },
          { name: 'userId', in: 'query', schema: { type: 'integer' }, description: 'Filter by candidate user ID' }
        ],
        responses: {
          '200': {
            description: 'Rendered HTML tracking dashboard or JSON array',
            content: { 'text/html': {}, 'application/json': {} }
          }
        }
      },
      post: {
        tags: ['Web Applications (ApplicationController)'],
        summary: 'Register candidate application via web form',
        description: 'Submits new candidate application and persists to PostgreSQL.',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                required: ['userId', 'jobId'],
                properties: {
                  userId: { type: 'integer', example: 3 },
                  jobId: { type: 'integer', example: 1 },
                  status: { type: 'string', enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted'], example: 'Submitted' },
                  coverLetter: { type: 'string', example: 'Applying through tracking dashboard.' },
                  resumeUrl: { type: 'string', example: 'https://storage.example.com/resumes/candidate.pdf' },
                  notes: { type: 'string', example: 'Direct alumni referral' }
                }
              }
            }
          }
        },
        responses: {
          '302': { description: 'Redirect to /applications?status=created' },
          '201': { description: 'Application registered' },
          '409': { description: 'Candidate has already applied for this job' }
        }
      }
    },
    '/applications/{id}': {
      get: {
        tags: ['Web Applications (ApplicationController)'],
        summary: 'Web application dossier view and review workflow panel',
        description: 'Renders complete candidate dossier with profile, cover letter, resume, and review status transition controls.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Application ID' }
        ],
        responses: {
          '200': { description: 'Rendered application dossier HTML' },
          '404': { description: 'Application not found' }
        }
      }
    },
    '/applications/{id}/status': {
      post: {
        tags: ['Web Applications (ApplicationController)'],
        summary: 'Advance application review status via web form',
        description: 'Updates application review status (Under Review, Shortlisted, Interview Scheduled, Accepted, Rejected, Withdrawn) and notes.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Application ID' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'], example: 'Shortlisted' },
                  notes: { type: 'string', example: 'Candidate cleared preliminary screen.' }
                }
              }
            }
          }
        },
        responses: {
          '302': { description: 'Redirect to /applications/{id}?status=updated' },
          '200': { description: 'Status updated' }
        }
      }
    },
    '/applications/{id}/delete': {
      post: {
        tags: ['Web Applications (ApplicationController)'],
        summary: 'Withdraw / delete candidate application',
        description: 'Removes application record from PostgreSQL.',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'Application ID' }
        ],
        responses: {
          '302': { description: 'Redirect to /applications?status=deleted' },
          '200': { description: 'Application removed' }
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
      JobPosting: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Senior Backend Engineer' },
          company: { type: 'string', example: 'TechCorp Solutions' },
          location: { type: 'string', example: 'Remote' },
          jobType: { type: 'string', enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'], example: 'Full-Time' },
          description: { type: 'string', example: 'Architect high-throughput microservices and maintain distributed systems...' },
          requirements: { type: 'string', example: '3+ years Node.js, PostgreSQL, Docker' },
          salaryRange: { type: 'string', example: '$85,000 - $115,000' },
          applicationUrl: { type: 'string', example: 'https://careers.example.com/apply' },
          contactEmail: { type: 'string', format: 'email', example: 'recruiting@example.com' },
          posterId: { type: 'integer', example: 1 },
          status: { type: 'string', enum: ['Active', 'Closed', 'Draft', 'Expired'], example: 'Active' },
          deadline: { type: 'string', format: 'date-time', example: '2026-12-31T23:59:59.000Z' },
          createdAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          poster: {
            type: 'object',
            nullable: true,
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Said Hasan' },
              email: { type: 'string', example: 'said@example.com' },
              role: { type: 'string', example: 'admin' },
              department: { type: 'string', example: 'Computer Science' }
            }
          }
        }
      },
      JobPostingInput: {
        type: 'object',
        required: ['title', 'company', 'description'],
        properties: {
          title: { type: 'string', example: 'Senior Backend Engineer' },
          company: { type: 'string', example: 'TechCorp Solutions' },
          location: { type: 'string', example: 'Remote' },
          jobType: { type: 'string', enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'], example: 'Full-Time' },
          description: { type: 'string', example: 'Architect high-throughput microservices and maintain distributed systems...' },
          requirements: { type: 'string', example: '3+ years Node.js, PostgreSQL, Docker' },
          salaryRange: { type: 'string', example: '$85,000 - $115,000' },
          applicationUrl: { type: 'string', example: 'https://careers.example.com/apply' },
          contactEmail: { type: 'string', format: 'email', example: 'recruiting@example.com' },
          posterId: { type: 'integer', example: 1 },
          status: { type: 'string', enum: ['Active', 'Closed', 'Draft', 'Expired'], example: 'Active' },
          deadline: { type: 'string', format: 'date-time', example: '2026-12-31T23:59:59.000Z' }
        }
      },
      Application: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          userId: { type: 'integer', example: 2 },
          jobId: { type: 'integer', example: 1 },
          status: {
            type: 'string',
            enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'],
            example: 'Submitted'
          },
          coverLetter: { type: 'string', example: 'Excited to apply for this backend engineering role...' },
          resumeUrl: { type: 'string', format: 'uri', example: 'https://storage.alumni-portal.example.com/resumes/zeynep-resume.pdf' },
          notes: { type: 'string', example: 'Candidate screening in progress.' },
          appliedAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          createdAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' }
        }
      },
      ApplicationWithDetails: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          userId: { type: 'integer', example: 2 },
          jobId: { type: 'integer', example: 1 },
          status: { type: 'string', example: 'Under Review' },
          coverLetter: { type: 'string', example: 'Excited to apply for this backend engineering role...' },
          resumeUrl: { type: 'string', format: 'uri', example: 'https://storage.alumni-portal.example.com/resumes/zeynep-resume.pdf' },
          notes: { type: 'string', example: 'First-round screening passed.' },
          appliedAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          createdAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-10-21T10:00:00.000Z' },
          applicant: { $ref: '#/components/schemas/User' },
          job: { $ref: '#/components/schemas/JobPosting' }
        }
      },
      ApplicationInput: {
        type: 'object',
        required: ['userId', 'jobId'],
        properties: {
          userId: { type: 'integer', example: 2 },
          jobId: { type: 'integer', example: 1 },
          status: {
            type: 'string',
            enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn'],
            example: 'Submitted'
          },
          coverLetter: { type: 'string', example: 'Excited to apply for this backend engineering role...' },
          resumeUrl: { type: 'string', format: 'uri', example: 'https://storage.alumni-portal.example.com/resumes/zeynep-resume.pdf' },
          notes: { type: 'string', example: 'Referred via alumni network.' }
        }
      },
      ApplicationApplyInput: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'integer', example: 2 },
          status: { type: 'string', example: 'Submitted' },
          coverLetter: { type: 'string', example: 'Applying directly for this role...' },
          resumeUrl: { type: 'string', format: 'uri', example: 'https://storage.alumni-portal.example.com/resumes/zeynep-resume.pdf' },
          notes: { type: 'string', example: 'Candidate self-submission.' }
        }
      },
      UserWithRelations: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Said Hasan' },
          email: { type: 'string', format: 'email', example: 'said@example.com' },
          role: { type: 'string', example: 'admin' },
          department: { type: 'string', example: 'Computer Science' },
          graduationYear: { type: 'integer', example: 2022 },
          createdAt: { type: 'string', format: 'date-time', example: '2026-09-30T07:30:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-09-30T07:44:00.000Z' },
          announcements: {
            type: 'array',
            items: { $ref: '#/components/schemas/Announcement' }
          },
          jobPostings: {
            type: 'array',
            items: { $ref: '#/components/schemas/JobPosting' }
          }
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
