module.exports = (client, message) => {
	console.log(client.db)
	const database = client.db.database("guilds");
	if (message.author.bot) return
	database.collection("guilds").findOne({ guild: message.guild.id }, (error, readGuild) => {
		if (error) console.error(error);

		if (message.content.indexOf(readGuild.prefix) !== 0) return;

		const arguments = message.content.slice(readGuild.prefix.length).trim().split(/ +/g);
		const input = arguments.shift().toLowerCase();

		const command = client.commands[input];

		if (!command) return;

		command.run(client, message, arguments);
		console.log(message)
		//Command Run
	});
};