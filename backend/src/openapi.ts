const orderStatusEnum = ["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "CANCELLED"];

const schemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      name: { type: "string" },
      role: { type: "string", enum: ["CUSTOMER", "RIDER", "ADMIN"] },
    },
  },
  AuthTokens: {
    type: "object",
    properties: {
      accessToken: { type: "string" },
      refreshToken: { type: "string" },
    },
  },
  Order: {
    type: "object",
    properties: {
      id: { type: "string" },
      senderId: { type: "string", nullable: true },
      recipientName: { type: "string" },
      recipientPhone: { type: "string" },
      pickupAddress: { type: "string" },
      pickupLat: { type: "number", nullable: true },
      pickupLng: { type: "number", nullable: true },
      dropoffAddress: { type: "string" },
      dropoffLat: { type: "number", nullable: true },
      dropoffLng: { type: "number", nullable: true },
      status: { type: "string", enum: orderStatusEnum },
      codAmount: { type: "string", nullable: true, description: "Decimal serialized as a string" },
      price: { type: "string", description: "Decimal serialized as a string" },
      hasInsurance: { type: "boolean" },
      insuranceFee: { type: "string", nullable: true },
      riderId: { type: "string", nullable: true },
      manifestId: { type: "string", nullable: true },
      podPhotoUrl: { type: "string", nullable: true },
      podSignatureUrl: { type: "string", nullable: true },
      podCapturedAt: { type: "string", format: "date-time", nullable: true },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  TrackedOrder: {
    type: "object",
    properties: {
      id: { type: "string" },
      status: { type: "string", enum: orderStatusEnum },
      recipientName: { type: "string" },
      dropoffAddress: { type: "string" },
      dropoffLat: { type: "number", nullable: true },
      dropoffLng: { type: "number", nullable: true },
      hasInsurance: { type: "boolean" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      statusEvents: {
        type: "array",
        items: {
          type: "object",
          properties: {
            status: { type: "string", enum: orderStatusEnum },
            note: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  SavedAddress: {
    type: "object",
    properties: {
      id: { type: "string" },
      label: { type: "string" },
      address: { type: "string" },
      lat: { type: "number", nullable: true },
      lng: { type: "number", nullable: true },
      createdAt: { type: "string", format: "date-time" },
    },
  },
  Payment: {
    type: "object",
    properties: {
      id: { type: "string" },
      orderId: { type: "string" },
      amount: { type: "string" },
      method: { type: "string", enum: ["CASH", "MTN_MOMO", "AIRTEL_MONEY"] },
      remittedAt: { type: "string", format: "date-time", nullable: true },
      remittanceStatus: { type: "string", enum: ["SENT", "STUB", "FAILED"] },
      remittanceReference: { type: "string" },
      remittanceError: { type: "string" },
    },
  },
  Rider: {
    type: "object",
    properties: {
      id: { type: "string" },
      userId: { type: "string" },
      vehicleType: { type: "string", nullable: true },
      isAvailable: { type: "boolean" },
    },
  },
  Manifest: {
    type: "object",
    properties: {
      id: { type: "string" },
      organizationId: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
    },
  },
  Error: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Packton API",
    version: "1.0.0",
    description:
      "Delivery & logistics platform API for Packton (Rwanda). Covers account/portal auth (JWT), order lifecycle, COD remittance, and the B2B manifest integration (API-key auth).",
  },
  servers: [{ url: "/" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      apiKeyAuth: { type: "apiKey", in: "header", name: "X-API-Key" },
    },
    schemas,
  },
  paths: {
    "/health": {
      get: { summary: "API liveness check", responses: { "200": { description: "OK" } } },
    },
    "/health/db": {
      get: {
        summary: "Database connectivity check",
        responses: { "200": { description: "Database reachable" }, "503": { description: "Database unreachable" } },
      },
    },
    "/auth/register": {
      post: {
        summary: "Create a customer account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "name"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 8 },
                  name: { type: "string" },
                  phone: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Account created",
            content: {
              "application/json": {
                schema: { allOf: [{ $ref: "#/components/schemas/AuthTokens" }, { type: "object", properties: { user: { $ref: "#/components/schemas/User" } } }] },
              },
            },
          },
          "409": { description: "Email already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Log in",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: { email: { type: "string" }, password: { type: "string" } },
              },
            },
          },
        },
        responses: { "200": { description: "Signed in" }, "401": { description: "Invalid credentials" } },
      },
    },
    "/auth/refresh": {
      post: {
        summary: "Rotate an access/refresh token pair",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["refreshToken"], properties: { refreshToken: { type: "string" } } } } },
        },
        responses: { "200": { description: "New token pair" }, "401": { description: "Invalid or expired refresh token" } },
      },
    },
    "/auth/logout": {
      post: {
        summary: "Revoke a refresh token",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["refreshToken"], properties: { refreshToken: { type: "string" } } } } },
        },
        responses: { "204": { description: "Logged out" } },
      },
    },
    "/auth/me": {
      get: {
        summary: "Current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } } },
      },
    },
    "/auth/forgot-password": {
      post: {
        summary: "Request a password reset email",
        description:
          "Always returns 200 with a generic message regardless of whether the email is registered, to avoid leaking account existence. If it is, a one-hour reset link is emailed.",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["email"], properties: { email: { type: "string", format: "email" } } } } },
        },
        responses: { "200": { description: "Request accepted" } },
      },
    },
    "/auth/reset-password": {
      post: {
        summary: "Complete a password reset",
        description: "Consumes the token from the emailed reset link, sets a new password, and revokes all of the user's existing refresh tokens.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token", "password"],
                properties: { token: { type: "string" }, password: { type: "string", minLength: 8 } },
              },
            },
          },
        },
        responses: { "200": { description: "Password updated" }, "400": { description: "Invalid or expired token" } },
      },
    },
    "/orders": {
      post: {
        summary: "Create a delivery order",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["recipientName", "recipientPhone", "pickupAddress", "dropoffAddress", "price"],
                properties: {
                  recipientName: { type: "string" },
                  recipientPhone: { type: "string" },
                  pickupAddress: { type: "string" },
                  pickupLat: { type: "number" },
                  pickupLng: { type: "number" },
                  dropoffAddress: { type: "string" },
                  dropoffLat: { type: "number" },
                  dropoffLng: { type: "number" },
                  codAmount: { type: "number" },
                  price: { type: "number" },
                  hasInsurance: { type: "boolean" },
                  insuranceFee: { type: "number" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Order created", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } } },
      },
      get: {
        summary: "List the authenticated user's orders",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } } },
      },
    },
    "/orders/{id}": {
      get: {
        summary: "Get an order (owner or staff only)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, "404": { description: "Not found" } },
      },
    },
    "/orders/{id}/track": {
      get: {
        summary: "Public shipment tracking — no auth required",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/TrackedOrder" } } } }, "404": { description: "Not found" } },
      },
    },
    "/orders/{id}/status": {
      patch: {
        summary: "Advance an order's status (admin or rider)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["status"], properties: { status: { type: "string", enum: orderStatusEnum }, note: { type: "string" } } },
            },
          },
        },
        responses: { "200": { description: "Updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } } },
      },
    },
    "/orders/{id}/payments": {
      post: {
        summary: "Record a COD payment and attempt merchant remittance (admin or rider)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["method"], properties: { method: { type: "string", enum: ["CASH", "MTN_MOMO", "AIRTEL_MONEY"] } } },
            },
          },
        },
        responses: { "201": { description: "Payment recorded", content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } } },
      },
    },
    "/contact": {
      post: {
        summary: "Submit the public contact/lead form",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string" },
                  company: { type: "string" },
                  email: { type: "string", format: "email" },
                  message: { type: "string" },
                  estimatedVolume: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Submitted" } },
      },
    },
    "/addresses": {
      get: {
        summary: "List the authenticated user's saved addresses",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/SavedAddress" } } } } } },
      },
      post: {
        summary: "Save an address",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["label", "address"],
                properties: { label: { type: "string" }, address: { type: "string" }, lat: { type: "number" }, lng: { type: "number" } },
              },
            },
          },
        },
        responses: { "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/SavedAddress" } } } } },
      },
    },
    "/addresses/{id}": {
      delete: {
        summary: "Delete a saved address",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "204": { description: "Deleted" } },
      },
    },
    "/manifests": {
      get: {
        summary: "List this organization's manifests (B2B integration)",
        security: [{ apiKeyAuth: [] }],
        responses: { "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Manifest" } } } } } },
      },
    },
    "/manifests/upload": {
      post: {
        summary: "Bulk-create orders from a CSV manifest (B2B integration)",
        description:
          "Body is raw CSV text (Content-Type: text/csv), columns: recipientName, recipientPhone, pickupAddress, dropoffAddress, codAmount (optional), price.",
        security: [{ apiKeyAuth: [] }],
        requestBody: { required: true, content: { "text/csv": { schema: { type: "string" } } } },
        responses: {
          "201": {
            description: "Rows processed (partial success supported — see rowErrors)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    manifestId: { type: "string" },
                    ordersCreated: { type: "integer" },
                    rowErrors: { type: "array", items: { type: "object", properties: { row: { type: "integer" }, error: { type: "string" } } } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/orders": {
      get: {
        summary: "List all orders (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "status", in: "query", required: false, schema: { type: "string", enum: orderStatusEnum } }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/admin/orders/{id}/assign": {
      patch: {
        summary: "Assign a rider to an order — the manual dispatch step (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["riderId"], properties: { riderId: { type: "string" } } } } },
        },
        responses: { "200": { description: "Assigned" } },
      },
    },
    "/admin/riders": {
      get: { summary: "List all riders (admin)", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK" } } },
      post: {
        summary: "Promote an existing user to rider (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["userId"], properties: { userId: { type: "string" }, vehicleType: { type: "string" } } },
            },
          },
        },
        responses: { "201": { description: "Rider created", content: { "application/json": { schema: { $ref: "#/components/schemas/Rider" } } } } },
      },
    },
    "/admin/users": {
      post: {
        summary: "Create a new user account with a role (admin) — never ADMIN",
        description:
          "The admin never sets the password — one is generated and emailed to the new user, or returned in the response if email isn't configured yet.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "role"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  phone: { type: "string" },
                  role: { type: "string", enum: ["CUSTOMER", "RIDER"] },
                  vehicleType: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    credentialsEmailed: { type: "boolean" },
                    temporaryPassword: { type: "string", description: "Only present when credentialsEmailed is false" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/payments": {
      get: { summary: "COD reconciliation ledger (admin)", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK" } } },
    },
    "/admin/manifests": {
      get: { summary: "All B2B manifests across organizations (admin)", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK" } } },
    },
    "/admin/analytics": {
      get: {
        summary: "Delivery success rate, avg. delivery time, COD totals, rider performance (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/rider/me": {
      get: { summary: "The signed-in rider's profile", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/Rider" } } } } } },
    },
    "/rider/orders": {
      get: { summary: "Orders assigned to the signed-in rider", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK" } } },
    },
    "/rider/availability": {
      patch: {
        summary: "Toggle the signed-in rider's availability",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["isAvailable"], properties: { isAvailable: { type: "boolean" } } } } },
        },
        responses: { "200": { description: "Updated" } },
      },
    },
    "/rider/earnings": {
      get: { summary: "The signed-in rider's today/this-week earnings", security: [{ bearerAuth: [] }], responses: { "200": { description: "OK" } } },
    },
    "/rider/orders/{id}/proof-of-delivery": {
      post: {
        summary: "Upload proof-of-delivery photo and/or signature",
        description: "multipart/form-data: `photo` (file, optional) and `signature` (base64 PNG data URL, optional) — at least one is required.",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { type: "object", properties: { photo: { type: "string", format: "binary" }, signature: { type: "string" } } },
            },
          },
        },
        responses: {
          "200": { description: "Updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
          "501": { description: "File storage not configured yet" },
        },
      },
    },
  },
};
