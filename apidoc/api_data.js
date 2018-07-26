define({
  api: [
    {
      type: 'post',
      url: '/seller/activate/:hash',
      title: 'Activate seller account',
      name: 'ActivateSeller',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'hash',
              description: '<p>random hash to activate seller account</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: 'HTTP/1.1 200 OK\n{\n  "status": "success"\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content: 'HTTP/1.1 404 Not Found\n{\n  "status": "fail"\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/activate.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_activate_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_activate_js',
    },
    {
      type: 'post',
      url: '/seller/login',
      title: 'login seller account',
      name: 'LoginSeller',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>seller email</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'password',
              description: '<p>seller password</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'token',
              description: '<p>jwt token</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              'HTTP/1.1 200 OK\n{\n  "status": "success",\n  "token": jwt token\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/login.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_login_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_login_js',
    },
    {
      type: 'get',
      url: '/seller',
      title: 'get seller account information',
      name: 'ReadSeller',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'token',
              description: '<p>seller login got token</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Success 200',
              type: 'Object',
              optional: false,
              field: 'seller',
              description: '<p>seller information</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content:
              'HTTP/1.1 200 OK\n{\n  "status": "success",\n  "seller": seller information\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/read_by_email.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_read_by_email_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_read_by_email_js',
    },
    {
      type: 'post',
      url: '/seller',
      title: 'login seller account',
      name: 'RegisterSeller',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'name',
              description: '<p>seller name</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>seller email</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'password',
              description: '<p>seller password</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: 'HTTP/1.1 200 OK\n{\n  "status": "success"\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/register.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_register_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_register_js',
    },
    {
      type: 'post',
      url: '/resetpass',
      title: 'login seller account',
      name: 'ResetSellerPasswordSendEmail',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>seller email</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: 'HTTP/1.1 200 OK\n{\n  "status": "success"\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/reset_pass_email.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_reset_pass_email_js',
      groupTitle:
        '_Users_nkfly_git_mechef_api_routes_seller_reset_pass_email_js',
    },
    {
      type: 'post',
      url: '/resetpass/:hash',
      title: 'login seller account',
      name: 'ResetSellerPassword',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'hash',
              description: '<p>seller reset password hash</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'password',
              description: '<p>seller reset password</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: 'HTTP/1.1 200 OK\n{\n  "status": "success"\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/reset_pass.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_reset_pass_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_reset_pass_js',
    },
    {
      type: 'put',
      url: '/seller',
      title: 'update seller account information',
      name: 'UpdateSeller',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'name',
              description: '<p>(optional) seller name</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>(optional) seller email</p>',
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'password',
              description: '<p>(optional) seller password</p>',
            },
          ],
        },
      },
      success: {
        fields: {
          'Success 200': [
            {
              group: 'Success 200',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Success-Response:',
            content: 'HTTP/1.1 200 OK\n{\n  "status": "success"\n}',
            type: 'json',
          },
        ],
      },
      error: {
        fields: {
          'Error 4xx': [
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'status',
              description: '<p>status</p>',
            },
            {
              group: 'Error 4xx',
              type: 'String',
              optional: false,
              field: 'reason',
              description: '<p>failure reason</p>',
            },
          ],
        },
        examples: [
          {
            title: 'Error-Response:',
            content:
              'HTTP/1.1 404 Not Found\n{\n  "status": "fail",\n  "reason": reason\n}',
            type: 'json',
          },
        ],
      },
      version: '0.0.0',
      filename: 'api/routes/seller/update.js',
      group: '_Users_nkfly_git_mechef_api_routes_seller_update_js',
      groupTitle: '_Users_nkfly_git_mechef_api_routes_seller_update_js',
    },
  ],
});
