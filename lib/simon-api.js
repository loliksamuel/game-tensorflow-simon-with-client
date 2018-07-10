function Game(/* String */ id) {
	/* String */ var id;
    /* boolean */ var isActive;
    /* String */ var seq;

	this.id = id;
}

function Play(/* String */ id) {
	/* String */ var id;
	/* Game */ var game;
    /* String */ var userName;
    /* int */ var score;

	this.id = id;
}

function Player(/* String */ id) {
	/* String */ var id;

	this.id = id;
}

function Player(User user) {
	this(user.id);
}

Player.prototype.create = function() {
}

function User(/* String */ id) {
	/* String */ var id;
	/* String */ var username;
	/* String */ var password;

	this.id = id;
}

User.prototype.create = function() {
}

User.prototype.update = function() {
}

User.prototype.createPlayer = function() {
	var player = new Player(this.id);
	return player.create();
}

User.prototype.login = function() {
}

User.prototype.logout = function() {
}

function GamesService() {
    var basePath = "/games";
}

/** @return List<Game> */
GamesService.prototype.games = function() {
    var url = basePath;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    return JSON.parse(request.responseText);
}

/** @return Game */
GamesService.prototype.game = function(/* String */ id) {
    var url = basePath + "/game/" + id;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    var response = JSON.parse(request.responseText);
    var game = Game(response.id);
    game.isActive = response.isActive;
    game.seq = response.seq;
    return game;
}

/** @return Game */
GamesService.prototype.createGame = function(/* int */ size) {
    var url = basePath + "/" + size;
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    var id = request.responseText;
    return Game(id);
}

GamesService.prototype.finishGame = function(/* Game */ game) {
    var url = basePath + "/" + game.id;
    var request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    //TODO request.body = game
    request.send();
    return request.responseText;
}

GamesService.prototype.play = function(/* Game */ game) {
    var url = basePath + "/" + game.id + "/plays";
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    var response = request.responseText;
    var play = new Play(response.id);
    play.game = response.game;
    play.userName = response.userName;
    play.score = response.score;
    return play;
}

var gamesService = GamesService();

Game.prototype.finish = function() {
    return gamesService.finishGame(this.id);
}

function PlaysService() {
    var basePath = "/plays";
}

/** @return List<Play> */
PlaysService.prototype.plays = function() {
    var url = basePath;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    return JSON.parse(request.responseText);
}

/** @return Play */
PlaysService.prototype.play = function(/* String */ id) {
    var url = basePath + "/" + id;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    var response = JSON.parse(request.responseText);
    var play = Play(response.id);
    play.game = response.game;
    play.userName = response.userName;
    play.score = response.score;
    return game;
}

PlaysService.prototype.createPlay = function() {
    var url = basePath;
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    var response = request.responseText;
    var play = new Play(response.id);
    play.game = response.game;
    play.userName = response.userName;
    play.score = response.score;
    return play;
}

var playsService = PlaysService();

// Initialize a constructor function for a new Simon Says.
function SimonSays() {
}

SimonSays.prototype.play = function() {
}
