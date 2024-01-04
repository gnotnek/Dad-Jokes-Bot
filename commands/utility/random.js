const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const getRandomJoke = async () => {
    const url = 'https://jokesbapak2.reinaldyrafli.com/api/';

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    });

    fs.writeFileSync('./imgs/random-joke.jpg', response.data, (err) => {
        if(err) throw err;
    });
    
    return './imgs/random-joke.jpg';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-joke')
        .setDescription('Get a random joke!'),
    async execute(interaction) {
        const joke = await getRandomJoke();
        const file = new AttachmentBuilder(joke);
        interaction.reply({files: [file]});
    },
};