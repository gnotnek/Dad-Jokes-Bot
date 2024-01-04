const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const getTodayJoke = async () => {
    const url = 'https://jokesbapak2.reinaldyrafli.com/api/today';

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    });

    fs.writeFileSync('./imgs/today-joke.jpg', response.data, (err) => {
        if(err) throw err;
    });
    
    return './imgs/today-joke.jpg';
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('today-joke')
        .setDescription('Get daily joke!'),
    async execute(interaction) {
        const joke = await getTodayJoke();
        const file = new AttachmentBuilder(joke);
        interaction.reply({files: [file]});
    },
};
