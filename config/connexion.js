const mysql = require("mysql");

const db = mysql.createConnection({
  host: "b99n3bpodbzuzb2y1dwp-mysql.services.clever-cloud.com",
  user: "ukafny7tmbob0kpv",
  password: "UDMydmpbyyvWbDWRRHIg",
  database: "b99n3bpodbzuzb2y1dwp",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

module.exports = db;
