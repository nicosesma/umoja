# Vendor's Map

A react application that enables users to visualize the map of an event in order to choose the coordinates of their store placement. As well as let admins have access to the datastore with full CRUD capabilities.

## **This Project is under Heavy Construction**

### Development Setup
```bash
  npm run install
  createdb umoja-development
  node_modules/.bin/knex migrate:latest
  node_modules/.bin/knex seed:run
  npm run start
```

### Test Setup *(after `npm run install`)*  **Need To Fix Test Suite**
```bash
  createdb umoja-test
  NODE_ENV=test node_modules/.bin/knex migrate:latest
  npm run test
```

*TODOS:*
  [] Complete Authorization SplashPage *enable_user_session*
  [] Complete Admin Functionality *need_to_define_specs*
  [] Be able to reserve spots
  [] Render VendorMap correctly based on db_data
  [] Create component progressive hierarchy
  [] Style the Website *reuse_css_&&_bootsrap*

**Need to add navbar with signout button**
