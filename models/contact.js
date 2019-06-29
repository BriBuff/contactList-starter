module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        // firstName (VARCHAR, NOT NULL, between 1-30 characters)
        firstName:  {
            // VARCHAR sequelize language
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },

        // lastName (VARCHAR, NOT NULL, between 1-30 characters)
        lastName: {
            type: DataTypes.STRING,
            // Flag- exists in SQL, but sequelize language
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },

        // contactType (VARCHAR, Default value "Personal") 
        contactType: {
            type: DataTypes.STRING,
            // Flag- exists in SQL, but sequelize language
            defaultValue: "Personal"
        },      

        // phoneNumber (VARCHAR, NULL, length 10 characters, numbers only). Either will have an input meeting the validate or nothing at all.
        phoneNumber: {
            type: DataTypes.STRING,
            // Already built in-not needed, will default to true
            // allowNull: true
            validate: {
                len: [10, 10],
                isNumeric: true
            }

        },

        // emailAddress (VARCHAR, NULL, must be valid email format). Either will have an input meeting the validate or nothing at all.
        emailAddress: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true
            }
        }

    });
    // be sure to return the model!
    return Contact;
};
