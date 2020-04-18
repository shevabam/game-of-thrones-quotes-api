


# Game of Thrones quotes API

A simple API to retrieve some quotes of the famous TV Show, Game of Thrones!

## Production host

[https://got-quotes-api.herokuapp.com](https://got-quotes-api.herokuapp.com)

## API

### `GET /v1/random`

Get a random quote:

> [https://got-quotes-api.herokuapp.com/v1/random](https://got-quotes-api.herokuapp.com/v1/random)

	{
		"sentence": "If I fall, don't bring me back.",
		"character": {
			"name": "Jon Snow",
			"house": {
				"name": "House Stark of Winterfell";
				"slug": "stark"
			}
		}
	}


### `GET /v1/random/{number}`

Returns `{number}` quotes.  
`number` parameter is optional. By default, one quote is returned.

> [https://got-quotes-api.herokuapp.com/v1/random/3](https://got-quotes-api.herokuapp.com/v1/random/3)

	[
	  {
		"sentence": "If I fall, don't bring me back.",
		"character": {
			"name": "Jon Snow",
			"house": {
				"name": "House Stark of Winterfell",
				"slug": "stark"
			}
		}
	  },
	  {
		"sentence": "The man who passes the sentence should swing the sword.",
		"character": {
			"name": "Ned Stark",
			"house": {
				"name": "House Stark of Winterfell",
				"slug": "stark"
			}
		}
	  },
	  {
		"sentence": "I am your son. I have always been your son.",
		"character": {
			"name": "Tyrion Lannister",
			"house": {
				"name": "House Lannister of Casterly Rock",
				"slug": "lannister"
			}
		}
	  }
	]


### `GET /v1/author/{character}/{number}`

Returns quotes for a character *(how to find this information explained below)*.  
`number` parameter is optional. By default, all quotes from the character are returned.

> [https://got-quotes-api.herokuapp.com/v1/author/tyrion/2](https://got-quotes-api.herokuapp.com/v1/author/tyrion/2)

	[
		{
			"sentence": "It's not easy being drunk all the time. Everyone would do it, if it were easy.",
			"character": {
				"name": "Tyrion Lannister",
				"house": {
					"name": "House Lannister of Casterly Rock",
					"slug": "lannister"
				}
			}
		},
		{
			"sentence": "No matter who you are, no matter how strong you are, sooner or later, you’ll face circumstances beyond your control.",
			"character": {
				"name": "Tyrion Lannister",
				"house": {
					"name": "House Lannister of Casterly Rock",
					"slug": "lannister"
				}
			}
		}
	]


### `GET /v1/houses`

Returns the list of houses with their members.

> [https://got-quotes-api.herokuapp.com/v1/houses](https://got-quotes-api.herokuapp.com/v1/houses)

	[
		{
			"slug": "stark",
			"name": "House Stark of Winterfell",
			"members": [
				{"name": "Jon Snow"},
				{"name": "Sansa Stark"},
				{"name": "Ned Stark"},
				{"name": "Arya Stark"},
				{"name": "Bran Stark"}
			]
		},
		{
			"slug": "lannister",
			"name": "House Lannister of Casterly Rock",
			"members": [
				{"name": "Jaime Lannister"},
				{"name": "Tyrion Lannister"},
				{"name": "Cersei Lannister"},
				{"name": "Tywin Lannister"}
			]
		}
	]

### `GET /v1/house/{name}`

Returns the house's details.  
`name` parameter is the house's diminutive *(how to find this information explained below)*.

> [https://got-quotes-api.herokuapp.com/v1/house/stark](https://got-quotes-api.herokuapp.com/v1/house/stark)

	[
		{
			"slug": "stark",
			"name": "House Stark of Winterfell",
			"members": [
				{"name": "Jon Snow"},
				{"name": "Sansa Stark"},
				{"name": "Ned Stark"},
				{"name": "Arya Stark"},
				{"name": "Bran Stark"}
			]
		}
	]


### `GET /v1/characters`

Returns the list of characters with their quotes.

> [https://got-quotes-api.herokuapp.com/v1/characters](https://got-quotes-api.herokuapp.com/v1/characters)

	[
		{
			"name": "Jon Snow",
			"house": {
				"slug": "stark",
				"name": "House Stark of Winterfell"
			},
			"quotes": [
				"If I fall, don't bring me back.",
				"There is only one war that matters. The Great War. And it is here.",
				"Love is the death of duty.",
				"The war is not over. And I promise you, friend, the true enemy won’t wait out the storm. He brings the storm."
			]
		},
		{
			"name": "Ned Stark",
			"house": {
				"slug": "stark",
				"name": "House Stark of Winterfell"
			},
			"quotes": [
				"The man who passes the sentence should swing the sword.",
				"I grew up with soldiers. I learned how to die a long time ago."
			]
		}
	]

### `GET /v1/character/{name}`

Returns the character's details.  
`name` parameter is the character's diminutive *(how to find this information explained below)*.

> [https://got-quotes-api.herokuapp.com/v1/character/jon](https://got-quotes-api.herokuapp.com/v1/character/jon)

	[
		{
			"name": "Jon Snow",
			"house": {
				"slug": "stark",
				"name": "House Stark of Winterfell"
			},
			"quotes": [
				"If I fall, don't bring me back.",
				"There is only one war that matters. The Great War. And it is here.",
				"Love is the death of duty.",
				"The war is not over. And I promise you, friend, the true enemy won’t wait out the storm. He brings the storm."
			]
		}
	]



### How to find the diminutives of the houses and characters?

To find the diminutives of the houses and characters to be used in certain URLs, open the file `datas.yaml`.

For houses:

	houses:
		stark:
			name: House Stark of Winterfell
		lannister:
			name: House Lannister of Casterly Rock
		baratheon:
			name: House Baratheon of Dragonstone

The diminutives are: stark, lannister, baratheon, etc...

For characters:

	characters:
		jon:
			name: Jon Snow
			house: stark
		sansa:
			name: Sansa Stark
			house: stark
		ned:
			name: Ned Stark
			house: stark

The diminutives are: jon, sansa, ned, etc...


## Docker

You can find the Dockerfile [here](https://github.com/shevabam/dockerfiles/tree/master/game-of-thrones-quotes) and on [Docker Hub](https://hub.docker.com/r/shevabam/game-of-thrones-quotes/).


## Contributing

If you want to add some quotes, please follow these steps. Make sure you have Git installed on your local computer.

* Fork the projet by clicking on the "Fork" button on the top right corner of this page
* Git clone your fork
* Open the file `datas.yaml`
* Make sure the quote doesn't already exist!
* Edit the sections. Make sure the character and house exist.
* Commit and push your changes
* Submit a pull request

Thanks!