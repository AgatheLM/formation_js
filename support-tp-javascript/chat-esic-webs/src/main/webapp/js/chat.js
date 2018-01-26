var webSocket = new WebSocket("ws://localhost:8090/chat-web/main");
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
	console.log(message);
	if (message.data){
		var serverMsg = JSON.parse(message.data);
		var expediteur = serverMsg.expediteur == getUrlParameter("loginParam")?"[Moi]":serverMsg.expediteur;
		var labelColor = serverMsg.expediteur == getUrlParameter("loginParam")?"#ff0000":"blue";
		var labelServerComponent = document.createElement("label"); // Create a <label> element
		labelServerComponent.style.color=labelColor;
		var labelServerValue = document.createTextNode(expediteur + ">"+ serverMsg.content); // Create a text node
		labelServerComponent.appendChild(labelServerValue); // Append the text to <label>
		divMsg.append(labelServerComponent);
		//Passage à la ligne
		var newLine = document.createElement("br");
		divMsg.append(newLine);
		console.log("Toc toc :"+serverMsg.expediteur + ">"	+ serverMsg.content)
	}
};

webSocket.onopen = function() {
	console.log("Connection opened");
};

webSocket.onclose = function() {
	console.log("Connection closed");
};

webSocket.onerror = function wserror(message) {
	console.log("error: " + message);
};

function sendMsg() {
	var loginName = getUrlParameter("loginParam");
	var msgToSend = JSON.stringify({expediteur: loginName, content: msgField.val()})
	webSocket.send(msgToSend);
	msgField.value = "";
}

function chatLogout(){
	console.log("good Bye Chat Esic Messenger");
	webSocket.close();
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}