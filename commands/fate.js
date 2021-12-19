const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
//const sqlite3 = require( 'sqlite3' ).verbose();
const Database = require('better-sqlite3');
const { MessageAttachment } = require('discord.js'); //for the image attachment in the footer

let db = new Database('db/fate.db');

//const fate = db.prepare('SELECT inShe FROM fate ORDER BY RANDOM() LIMIT 1;').get();
//let fate = {inShe:'placeholder'};
let fate;
const logo = new MessageAttachment('res/botLogo.png');

const fateEmbed = new MessageEmbed()
	.setColor('#0099ff')
	//.setURL('https://discord.js.org/')
	.setAuthor('tu su fate')
	//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('pandunia robote', 'attachment://botLogo.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fate')
		.setDescription('fate na pandunia'),
	async execute(interaction) {
		fate = db.prepare('SELECT nam FROM fate ORDER BY RANDOM() LIMIT 1;').get()
		fateEmbed.setDescription( `${fate.nam}` )
		await interaction.reply({ embeds: [fateEmbed], files: [logo]});
		//'Random Pandunia Lesson');
	},
};