# **This Project is under Heavy Construction**


# Vendor's Map

A react application that enables users to visualize the map of an event and reserve and manage the location of their booths. Administrators have access to the datastore through a friendly graphical interface and are able to import a CSV file and connect it to a Google Docs Sheet.


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

### *TODOS:*

  * [] Complete Authorization SplashPage *enable_user_session*
  * [] Complete Admin Functionality *need_to_define_specs*
    * [] Import CSV
    * [] Connect to Google Docs
  * [] Be able to reserve designated amount spots
  * [] Be able to concel reservation and choose another available one
  * [] Render VendorMap correctly based on db_data
  * [] Create progressive component hierarchy
  * [] Style the Website *reuse_css_&&_bootsrap*
    * **Need to add navbar with signout button**

