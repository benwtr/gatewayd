##06/24/2014

##Version:
3.20.1

###Fixed bugs:
- On incoming payments record to_address_id not from_address_id
- Fix generate_wallet cli command
- Update fund_hot_wallet CLI command notes

##06/17/2014

##Version:
3.21.0

###Fixed bugs:
- Use 'state' column in list failed payments api call
- Default webapp paths under USER_AUTH

###Added features:
- HTTP / JSON Api Documenation
- List Trust Lines endpoint from account to cold wallet

##06/10/2014

###Version:
3.20.0

###Fixed bugs:
- Validate ripple address in registerUser api call
- correct migration task with gruntfile
- correct installation / setup instructions
- remove redundant list_users http endpoint

###Added features:
- CRUD http routes for external accounts
- HTTP route to create a user
- Add validator with isRippleAddress validation method
- Validate setup wizard parameters with tests

##06/03/2014

###Version: 
3.19.0

###Fixed bugs:
- Fix method name for startGateway http api endpoint
- Handle error for setKey http api endpoint
- Handle error for setRippleRestUrl http api endpoint
- Fix CLI function for setLastPaymentHash

###Added features:
- Add basic jsdoc to core api funtions
- Add setRippleRestUrl core api function
- Test http interface status codes
- Configure Travis.CI for continuous integration testing
- Merge gateway-data-sequelize into project

