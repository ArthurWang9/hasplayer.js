
define(['require'],
    function(require) {
        
        var USERS = {
                PROD:{
                    email:"maps.poss@orange.fr",
                    pass:"webtv12"
                },

                QUALIF:{
                    email:"vodpcclienta@orange.fr",
                    pass:"Passwd1"
                }

            },

            PLATFORM = {
                PROD: "https://id.orange.fr",
                QUALIF:"http://id-rec.orange.fr"
            };



    return {
        
        connectUser:function(command, plateform){
            var p = new Promise((function(resolve, reject){
                command.get(require.toUrl(PLATFORM[plateform])).then(this.onWassupLoaded.bind(this,command, plateform, resolve, reject), this.onError.bind(this, reject));
            }).bind(this));

            return p;
        },

        onWassupLoaded: function(command,plateform, resolve, reject){
            command
            .findById('default_f_credential')
            .clearValue()
            .click().type(USERS[plateform].email).end()
            .findById('default_f_password')
            .clearValue()
            .click().type(USERS[plateform].pass).end()
            .findByCssSelector('.sc_default_button_2 input')
            .click()
            .sleep(2000).then(resolve, reject);
        },

        onError: function(reject){
            reject();
        }

    };
});

