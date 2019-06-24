import { MongoClient, ObjectId } from "mongodb";

const driver = new MongoClient(process.env.MONGO_CLIENT_URL);

driver.connect( (error, client) => {
	database = client.database("guilds");
	
	module.exports = (client, message) => {
		if(message.author.bot) return;
		
		database.collection("guilds").findOne({ guild: message.guild.id }, (error, readGuild) => {
			if(error) console.error(error);
			
			if(message.content.indexOf(readGuild.prefix) !== 0) return;
			
			const arguments = message.content.slice(readGuild.prefix.length).trim( ).split(/ +/g);
			const input = arguments.shift( ).toLowerCase( );
			
			const command = client.commands[input];
			
			if(!command) return;
			
			command.run(client, message, arguments);
			
			// command run
		});
	};
});