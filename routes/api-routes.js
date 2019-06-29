var db = require("../models");

module.exports = function(app) {
    // this route should find all contacts in the table and display them as JSON
    app.get("/api/contacts", function(req, res) {
        db.Contact.findAll({
        //    Order by last name, then first name
        }).then(function(contacts){
            res.json(contacts);
        })
    });

    // this route should add a new contact to the table
	app.post("/api/contacts", function(req, res) {
        var {firstName, lastName, contactType, phoneNumber, emailAddress} = req.body;
        
        // Pulls info from var above
        var newContact = {
            firstName,
            lastName,
            contactType,
            phoneNumber: phoneNumber || null,
            emailAddress: emailAddress || null
        }

        console.log("original", newContact);

        db.Contact.create(newContact).then(function(contact){
            console.log(`contact added ${contact.firstName} ${contact.lastName}`);
            // { id: whateverid }
            res.json( { id: contact.id })
        });
    });

    // this route should delete a contact from the table, if the id matches the ':id' url param
	app.delete("/api/contacts/:id", function(req, res) {
       db.Contact.destroy({
           where: {
               id: req.params.id
           }
       }).then(function(contact){
        //    deleted contact with id [id]
        console.log(`deleted contact with id: ${ contact.id }`);

        res.end();
       })
    });
}