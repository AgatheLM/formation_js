var webSocket = new WebSocket("ws://localhost:8091/chat-web/main");
var msgField = $("#messageField");
var divMsg = $("#messageBoxId");


//Registers Listeners 
$('#btnSendMsg').click(function() {
	sendMsg();
	return false;
});

$('#btnQuitter').click(function() {
	chatLogout();
	return false;
});


webSocket.onmessage = function(message) {
	console.log("Entree dans la fonction onmessage...");
	if (message.data){
		var serverMsg = JSON.parse(message.data);
		//TODO 1 : Traiter le Message JSON transmis par le serveur de Chat
	}
};

webSocket.onopen = function() {
	console.log("Connection opened ...");
};

webSocket.onclose = function() {
	console.log("Connection closed");
};

webSocket.onerror = function wserror(message) {
	console.log("error: " + message);
};

function sendMsg() {
	var loginName = getUrlParameter("loginParam");
	//TODO 2 : Compléter également cette méthode afin de transmettre le paquet au Serveur
}

function chatLogout(){
	console.log("good Bye Chat Esic Messenger");
	//TODO : Rajoutez l'instruction pour quitter le chat
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}