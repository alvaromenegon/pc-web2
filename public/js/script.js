function deleteConfirm(id){
    document.getElementById(id).style.visibility='visible';
}

function recuperarSenha(){
    window.location.href = "recuperarSenha/" + document.getElementById("login").value 
}