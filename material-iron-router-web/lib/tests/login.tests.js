/* eslint-env mocha */
import { chai } from 'meteor/practicalmeteor:chai';


if (Meteor.isServer) {

  //Routes = new Meteor.Collection('routes');
  describe('Users', function () {

      it('There is more one user in db', function () {
        Test = new Meteor.Collection('test');
        Test.insert({test:"test"});
          chai.assert.isAbove(Test.find().fetch().length, 1);
      })
  });

  /*  describe('Services', function () {
        it('Services is an object', function () {
            chai.assert.isDefined(Meteor.users.find(services));
            chai.assert.isObject(Meteor.users.find(services));
            chai.assert.isObject(Meteor.users.find(services.password), 'password is an object');
        })
    })


    describe('Emails', function () {
        it('Emails is an array', function () {
            chai.assert.isDefined(Meteor.us
            ers.find(emails));
            chai.assert.isArray(Meteor.users.find(emails));
        })
    })

    describe('Roles', function () {
        it('Roles is an array', function () {
            chai.assert.isDefined(Meteor.users.find(roles));
            chai.assert.isArray(Meteor.users.find(roles));
        })
    })*/

}
