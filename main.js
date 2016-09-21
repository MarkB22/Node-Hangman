var prompt = require('prompt');
var Word = require('./word.js');

prompt.start();

game = {
	wordBank : ["bacon is love", "drive", "flying higher", "hump day", "black friday", "destiny flies", "bad grampa"],
	wordsWon : 0,
	guessesRemaining : 10, 
	currentWrd : null, 
	startGame : function (wrd){
		
		this.resetGuesses();

		
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

		this.currentWrd.getLets(); 

		this.keepPrompting();

	}, 
	resetGuesses : function(){
		this.guessRemaining = 10;
	},
	keepPrompting : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		    
		    
		    console.log('  The letter or space you guessed is: ' + result.guessLetter);

		  
		    var UserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		       if (UserGuess == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('You guessed right!');

	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won!!!');
			    	return; //end game
			    }
		    }
		    
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ');

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPrompting();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game over bro it was ', self.currentWrd.word);
		    	console.log('Get with the program man');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

game.startGame();