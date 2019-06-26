const Discord = require("discord.js");
const translate = require("google-translate-api");
const fs = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config()

//Initialise Discord Client
const client = new Discord.Client();
//Initialise Database
MongoClient(process.env.MONGO_CLIENT_URL, (err, dbClient) => {
	client.db = dbClient
	console.log(dbClient)
})
const config = require("./config.json");
client.config = config;

client.commands = {};

fs.readdir("./events/", (error, files) => {
	if (error) return console.error(error);

	files.forEach(file => {
		const event = require("./events/" + file);
		const name = file.split(".")[0];
		client.on(name, event.bind(null, client));
		delete require.cache[require.resolve("./events/" + file)];
	});
});

fs.readdir("./commands/", (error, files) => {
	if (error) return console.error(error);

	files.forEach(file => {
		const command = require("./commands/" + file);
		const name = file.split(".")[0];

		client.commands[name] = command;
	});
});

//Bind Events before Logon
client.login(process.env.TOKEN).catch(err => {
	console.error(err)
})