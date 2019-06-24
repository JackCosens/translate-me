import { MongoClient, ObjectId } from "mongodb";

const driver = new MongoClient(process.env.MONGO_CLIENT_URL);

driver.connect( (error, client) => {
	database = client.database("guilds");
	
	module.exports = (client, guild) => {
		database.collection("guilds").findOne({ guild: guild.id }, (error, readGuild) => {
			if(error) console.error(error);
			
			if(!readGuild) {
				database.collection("guilds").insertOne({ guild: guild.id, prefix: client.configuration.standard.prefix }, (error, document) => {
					if(error) console.error(error);
					
					// guild created
				});
			}
		});
	};
});