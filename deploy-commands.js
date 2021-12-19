const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
console.log(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(process.env(CLIENT_ID)),{ body: commands },);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {console.error(error);}
})();

//HOW GET GUILD ID?
//client.guilds.cache.get(guildID)
/*rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);*/