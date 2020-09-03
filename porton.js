$(document).ready(function(){
	$("#prende").click(prende);
	$("#apaga").click(apaga); 

	recibirAlerta();
	
});

function prende(){
	enviarMensaje(1);
}

function apaga(){
	enviarMensaje(0);
}



function enviarMensaje(valor){
	var url ="ws://";
  	var client = Stomp.client(url);
  	client.connect('', '', function(){
  		client.send("/topic/porton", {priority: 9}, valor);
  		//alert("mensaje Enviado");
  	});
  	client.disconnect();
}



function recibirAlerta(){
	var url ="ws://";
  	var client = Stomp.client(url);
  	client.connect('', '', function(){
  		client.subscribe("/topic/porton_Answer", recepcionarAlerta);
  		//alert("mensaje Enviado");
  	    });
}

function recepcionarAlerta(mensaje){
	//alert(mensaje.body);
	//actualiza la conversacion
	//var actual = $("#conversacion").html();
	var nuevo = "<br>" + mensaje.body;
	$("#mensajeDim").html(nuevo);
}