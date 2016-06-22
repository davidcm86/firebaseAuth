$(document).ready(function() {
	$("#login-facebook").click(function(){
		loginRedesSociales('facebook');
	});
	$("#login-twitter").click(function(){
		loginRedesSociales('twitter');
	});
	$("#login-google").click(function(){
		loginRedesSociales('google');
	});
	$("#mostrar-registro").click(function(){
		$("#registro").toggle("slow");
	});
});
// hacemos login con las distintas redes sociales
function loginRedesSociales(redSocial) {
	switch (redSocial) {
		case 'facebook':
			var provider = new firebase.auth.FacebookAuthProvider();
			break;
		case 'twitter':
			var provider = new firebase.auth.TwitterAuthProvider();
			break;
		case 'google':
			var provider = new firebase.auth.GoogleAuthProvider();
			break;
	}
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
		// You can use these server side with your app's credentials to access the Twitter API.
		var token = result.credential.accessToken;
		var secret = result.credential.secret;
		// The signed-in user info.
		var user = result.user;
		if (user) {
			if (!user.birthday) {
				user.birthday = "-";
			}
			var foto = user.photoURL;
			if (!user.photoURL) {
				foto = 'img/no-foto.jpg';
			}
			$(".table").css("display", "block");
			// cerrar el modal y mostrar datos del login
			$('#myModalLogin').modal('toggle');
			var loginResult = "<tr>";
			loginResult += "<td><img src='img/" + redSocial + "-login.png' style='width:20%;' class='img-responsive img-circle'></td>";
			loginResult += "<td><img src=" + foto +" class='img-circle' style='width:30%;'></td>";
			loginResult += "<td>" + user.email + "</td>";
			loginResult += "<td>" + user.displayName + "</td>";
			loginResult += "<td>" + user.birthday + "</td>";
			loginResult += "<td>" + Date() + "</td>";
			loginResult += "</tr>";
			$("#body-tabla-login").prepend(loginResult);
		}
		console.log(user);
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		console.log(credential);
	});
}
// hacemos login mediante email y password
function loginEmailPassword() {
	var email = $("#email").val();
	var password = $("#password").val();
	console.log($("#email").val());
	console.log($("#password").val());
	$("#error-success-login").removeClass("alert alert-success alert-dismissible fade in");
	$("#error-success-login").removeClass("alert alert-danger alert-dismissible fade in");
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
		$("#error-success-login").addClass("alert alert-success alert-dismissible fade in");
		$("#error-success-login").show();
		$("#text-error-login-email").text("Se ha logado correctamente :)");
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
	  	$("#error-success-login").show();
	  	$("#error-success-login").addClass("alert alert-danger alert-dismissible fade in");
	  	$("#text-error-login-email").text(errorMessage);
	});
}
// registramos mediante mail y password
function registroEmailPassword() {
	var email = $("#email-registro").val();
	var password = $("#password-registro").val();
	console.log($("#email-registro").val());
	console.log($("#password-registro").val());
	$("#error-success-registro").removeClass("alert alert-success alert-dismissible fade in");
	$("#error-success-registro").removeClass("alert alert-danger alert-dismissible fade in");
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
		$("#error-success-registro").addClass("alert alert-success alert-dismissible fade in");
		$("#error-registro").show();
		$("#text-error-registro").text("Enhorabuena, su usuario se ha creado correctamente :)");
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		$("#error-success-registro").show();
		$("#error-success-registro").addClass("alert alert-danger alert-dismissible fade in");
		$("#text-error-registro").text(errorMessage);
	});
}