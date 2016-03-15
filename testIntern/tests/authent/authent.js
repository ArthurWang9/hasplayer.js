/**
TEST_AUTHENT:

- Authenticate to platform
**/

define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'testIntern/config/testsConfig',
    'testIntern/config/streams',
    'testIntern/tests/tests_functions',
    'testIntern/tests/authent_functions'
    ], function(registerSuite, assert, require, config, streams, tests, authent) {

        // Suite name
        var NAME = 'TEST_AUTHENT';

        // Test configuration (see config/testConfig.js)
        // var testConfig = intern.testsConfig.tests.authent.authent;
        
        // Test variables
        var command = null;
        
        var test = function() {

            registerSuite({
                name: NAME,

                setup: function() {
                    tests.log(NAME, 'Setup');
                    command = this.remote;
                    return command;
                },

                authentificate: function() {
                    return authent.connectUser(command, config.platform)
                    .then(function(text) {
                        assert.equal(text, "OK", "user is authenticated if value is OK");
                    }, function(){
                        assert.isTrue(false);
                    });
                }
            });
        };

        test();
});
