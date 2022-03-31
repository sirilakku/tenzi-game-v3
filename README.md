# tenzi-game-1

This program is Tenzi Game for two players. The backend is written in JavaScript and uses express to handle web requests.
When the game starts it takes two inputs (player names).

The Game :  Players give their names and the game is directed in the hyperlinks to follow the steps to continue. Alocates Player1 and Player2. It runs the logic and displays number of times the dice were rolled and by clicking on Scores the  the scores will be displyed. 

Here are the end points that can be reached in this program:
'/' - Welcome message with hyperlink to curl/web for player1 and player2 names.
'/inputnames' - Address players and assigns the player numbers. And give the next link to continue.
'/instructions' - Asks players to further continue to start the game.
'/playgame' - Will run the game and displays winner along with each of the player's count (number of times rolled).
'/scores' - Displayes the player name with their scores.
'/restart' - Restarts the game.
