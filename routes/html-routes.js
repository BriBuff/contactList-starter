var db = require("../models");

module.exports = function(app) {
    // this route should render the Handlebars 'form' template
    app.get("/contacts/new", function(req, res) {
        // calls handlebars form- doesn't need the .handlebars
        res.render("form");
    });

    // this route should find all contacts in the table and render them using the Handlebars 
    // 'contacts' template, sorted ascending by lastName, then by firstName
    app.get("/", function(req, res) {
        db.Contact.findAll({
            order: [["lastName", "ASC"], ["firstName", "ASC"]]
        }).then(function(contacts){
            console.log(contacts.dataValues);
            res.render("contacts", { contacts, name: "Me"})
        });

    });

    // this route should find all contacts of a particular type (Personal or Business) and render them 
    // using the Handlebars 'contacts' template, sorted ascending by lastName, then by firstName
    app.get("/:type", function(req, res) {
        var type = req.params.type[0].toUpperCase() + req.params.type.substring(1);

        db.Contact.findAll({
            where: {
                contactType: req.params.type
            },
            order: [["lastName", "ASC"], ["firstName", "ASC"]]
        }).then(function(contacts){
            console.log(contacts.dataValues);
            res.render("contacts", { contacts, type, name: "Me"})
        });
        // BONUS: pass the contact type through to the handlebars template... be sure
        // to make the contact type title-cased!

    });
}