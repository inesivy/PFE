/* eslint-env mocha */
import { chai } from 'meteor/practicalmeteor:chai';

if (Meteor.isServer) {
    describe('Users', function () {
        it('Tests there is more one user in db', function () {
            //console.log(chai.assert)
            chai.assert.isAbove(Meteor.users.find().fetch().length, 2);
        })
    })
}
