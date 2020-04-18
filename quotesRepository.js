'use strict';


const yaml = require('js-yaml');
const fs = require('fs');


try {
    var datas = yaml.safeLoad(fs.readFileSync('datas.yaml', 'utf8'));

    module.exports = {
        getRandom: function getRandom(numberOfQuotes) {

            if (numberOfQuotes > 1)
            {
                var quotesNb = datas.quotes.length;
                var limit = numberOfQuotes > quotesNb ? quotesNb : numberOfQuotes;

                var out = new Array(limit);
                var quotesUsed = new Array(limit);
                var quoteAlreadyUsed;

                for (var i = 0; i < limit; i++)
                {
                    var randomQuote = randomize(datas.quotes);
                    quoteAlreadyUsed = quotesUsed.indexOf(randomQuote) > -1;

                    while (quoteAlreadyUsed) {
                        randomQuote = randomize(datas.quotes);
                        quoteAlreadyUsed = quotesUsed.indexOf(randomQuote) > -1;
                    }

                    quotesUsed[i] = randomQuote;
                    out[i] = formatQuote(randomQuote);
                }
            }
            else
            {
                var randomQuote = randomize(datas.quotes);

                var out = formatQuote(randomQuote);
            }

            return out;
        },

        getByAuthor: function getByAuthor(name, numberOfQuotes) {

            var out = null;


            if (typeof datas.characters[name] === 'undefined')
                return out;


            var quotesList = new Array();

            for (var i in datas.quotes) {
                if (datas.quotes[i].character == name) {
                    quotesList.push(datas.quotes[i]);
                }
            }


            if (quotesList.length > 0) {

                if (numberOfQuotes > 1)
                {
                    var quotesNb = quotesList.length;
                    var limit = numberOfQuotes > quotesNb ? quotesNb : numberOfQuotes;

                    var out = new Array(limit);
                    var quotesUsed = new Array(limit);
                    var quoteAlreadyUsed;

                    for (var i = 0; i < limit; i++)
                    {
                        var randomQuote = randomize(quotesList);
                        quoteAlreadyUsed = quotesUsed.indexOf(randomQuote) > -1;

                        while (quoteAlreadyUsed) {
                            randomQuote = randomize(quotesList);
                            quoteAlreadyUsed = quotesUsed.indexOf(randomQuote) > -1;
                        }

                        quotesUsed[i] = randomQuote;
                        out[i] = formatQuote(randomQuote);
                    }
                }
                else
                {
                    var randomQuote = randomize(quotesList);

                    var out = formatQuote(randomQuote);
                }

            }

            return out;

        },

        getHouses: function getHouses(name) {

            var out = new Array();

            var housesList = datas.houses;

            if (name !== null) {
                if (typeof datas.houses[name] === 'undefined')
                    return out;

                var housesList = new Array();
                housesList[name] = datas.houses[name];
            }

            var characters = datas.characters;
            var charactersList = new Array();

            for (var character in characters) {
                if (characters[character].house != null) {
                    if (!(characters[character].house in charactersList))
                        charactersList[characters[character].house] = new Array();
                    
                    charactersList[characters[character].house].push(character);
                }
            }

            for (var i in housesList) {
                var house = {};

                house.slug = i;
                house.name = housesList[i].name;

                var members = new Array();

                charactersList[i].forEach(function(member){
                    var member_datas = {
                        name: characters[member].name
                    };

                    members.push(member_datas);
                });
                house.members = members;

                out.push(house);
            }
            
            return out;
        },
        

        getCharacters: function getCharacters(name) {

            var out = new Array();

            var charactersList = datas.characters;
            if (name !== null) {
                if (typeof datas.characters[name] === 'undefined')
                    return out;

                var charactersList = new Array();
                charactersList[name] = datas.characters[name];
            }

            var housesList = datas.houses;

            var quotesList = new Array();
            for (var q in datas.quotes) {
                if (!(datas.quotes[q].character in quotesList))
                    quotesList[datas.quotes[q].character] = new Array();

                quotesList[datas.quotes[q].character].push(datas.quotes[q].sentence);
            }

            for (var i in charactersList) {
                // House
                var character_house = null;
                if (charactersList[i].house != null) {
                    character_house = {
                        slug: charactersList[i].house,
                        name: housesList[charactersList[i].house]['name']
                    };
                }

                // Quotes
                var character_quotes = null;
                if (i in quotesList && quotesList[i].length > 0) {
                    character_quotes = quotesList[i];
                }

                var character = {
                    name: charactersList[i].name,
                    house: character_house,
                    quotes: character_quotes
                };

                out.push(character);
            }
            
            return out;
        }
        
    };

} catch (e) {
    console.log(e);
}

// Randomize quote
function randomize(quotes)
{
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Format quote result
function formatQuote(randomQuote)
{
    var quote = {};

    quote.sentence = randomQuote.sentence;
    quote.character = {
        name: datas.characters[randomQuote.character].name,
        house: {
            name: datas.houses[datas.characters[randomQuote.character].house].name,
            slug: datas.characters[randomQuote.character].house
        }
    };

    return quote;
}
