import Discord from "discord.js";
import translate from "google-translate-api";
import fs from "fs";

const client = new Discord.Client( );
client.login(process.env.TOKEN);

const configuration = require("./configuration.json");
client.configuration = configuration;

client.commands = { };

fs.readdir("./events/", (error, files) => {
	if(error) return console.error(error);
  
	files.forEach(file => {
		const event = require("./events/" + file);
		const name = file.split(".")[0];
		
		client.on( name, event.bind(null, client) );
		delete require.cache[require.resolve("./events/" + file)];
	});
});

fs.readdir("./commands/", (error, files) => {
	if(error) return console.error(error);
	
	files.forEach(file => {
		const command = require("./commands/" + file);		
		const name = file.split(".")[0];
		
		client.commands[name] = command;
	});
});
