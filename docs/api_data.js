define({ "api": [
  {
    "type": "get",
    "url": "/customer",
    "title": "Get a customer details by username",
    "group": "Customer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n      username: 'username',\n      active: true,\n      customerId: '123456789',\n      phoneNumber: '+234123456789',\n      firstName: 'firstName',\n      lastName: 'lastName',\n      fullName: 'firstName lastName'\n  },\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/customer.ctrl.ts",
    "groupTitle": "Customer",
    "name": "GetCustomer"
  },
  {
    "type": "get",
    "url": "/transfer/:accountNumber",
    "title": "Get a customer details by username",
    "group": "Customer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": [\n      {\n          amount: number // this is in kobo\n       direction: 1,\n       accountNumber: string\n       accountOwner: string\n       currency: string\n       balanceBefore: number // in kobo\n       balanceAfter: number // in kobo\n       narration: string\n       reference: string\n      },\n         {\n         amount: number // this is in kobo\n       direction: -1,\n       accountNumber: string\n       accountOwner: string\n       currency: string\n       balanceBefore: number // in kobo\n       balanceAfter: number // in kobo\n       narration: string\n       reference: string\n       }\n   \n  ],\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/transfer.ctrl.ts",
    "groupTitle": "Customer",
    "name": "GetTransferAccountnumber"
  },
  {
    "type": "post",
    "url": "/customer",
    "title": "Create a new customer",
    "group": "Customer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n    access_token: access_token,\n    customer: {\n      username: 'username',\n      active: true,\n      customerId: '123456789',\n      phoneNumber: '+234123456789',\n      firstName: 'firstName',\n      lastName: 'lastName',\n      fullName: 'firstName lastName'\n    }\n  },\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/customer.ctrl.ts",
    "groupTitle": "Customer",
    "name": "PostCustomer"
  },
  {
    "type": "post",
    "url": "/customer/login",
    "title": "Login a customer",
    "group": "Customer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n    access_token: access_token,\n    customer: {\n      username: 'username',\n      active: true,\n      customerId: '123456789',\n      phoneNumber: '+234123456789',\n      firstName: 'firstName',\n      lastName: 'lastName',\n      fullName: 'firstName lastName'\n    }\n  },\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/customer.ctrl.ts",
    "groupTitle": "Customer",
    "name": "PostCustomerLogin"
  },
  {
    "type": "post",
    "url": "/transfer",
    "title": "Make a transfer",
    "group": "Transfers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n    credit: {\n      amount: number // this is in kobo\n       direction: 1,\n       accountNumber: string\n       accountOwner: string\n       currency: string\n       balanceBefore: number // in kobo\n       balanceAfter: number // in kobo\n       narration: string\n       reference: string\n    },\n     debit: {\n       credit: {\n      amount: number // this is in kobo\n       direction: -1,\n       accountNumber: string\n       accountOwner: string\n       currency: string\n       balanceBefore: number // in kobo\n       balanceAfter: number // in kobo\n       narration: string\n       reference: string\n    }\n     }\n  },\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/transfer.ctrl.ts",
    "groupTitle": "Transfers",
    "name": "PostTransfer"
  },
  {
    "type": "get",
    "url": "/account",
    "title": "Get all a customer's accounts",
    "group": "account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": [\n      {\n     accountNumber: string\n     accountOwner: string\n     currentBalance: number // this is in kobo\n     active: boolean\n     currency: string\n     updatedAt: any\n     phoneNumber: string\n  },\n    {\n     accountNumber: string\n     accountOwner: string\n     currentBalance: number // this is in kobo\n     active: boolean\n     currency: string\n     updatedAt: any\n     phoneNumber: string\n  } \n  ],\n  \"message\": \"successful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/accounts.ctrl.ts",
    "groupTitle": "account",
    "name": "GetAccount"
  },
  {
    "type": "get",
    "url": "/account/details/:accountNumber",
    "title": "Get Account Details",
    "group": "account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n     accountNumber: string\n     accountOwner: string\n     currentBalance: number // this is in kobo\n     active: boolean\n     currency: string\n     updatedAt: any\n     phoneNumber: string\n  },\n  \"message\": \"successful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/accounts.ctrl.ts",
    "groupTitle": "account",
    "name": "GetAccountDetailsAccountnumber"
  },
  {
    "type": "post",
    "url": "/account",
    "title": "Create a new account",
    "group": "account",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message.message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"data\": {\n     accountNumber: string\n     accountOwner: string\n     currentBalance: number // this is in kobo\n     active: boolean\n     currency: string\n     updatedAt: any\n     phoneNumber: string\n  },\n  \"message\": \"sucessful\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/accounts.ctrl.ts",
    "groupTitle": "account",
    "name": "PostAccount"
  }
] });
