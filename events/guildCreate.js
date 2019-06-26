module.exports = (client, guild) => {
	const database = client.db.database("guilds");
	database.collection("guilds").findOne({ guild: guild.id }, (error, readGuild) => {
		if (error) console.error(error);

		if (!readGuild) {
			database.collection("guilds").insertOne({ guild: guild.id, prefix: client.config.standard.prefix }, (error, document) => {
				if (error) console.error(error);
				//Guild Created
			});
		}
	});
};