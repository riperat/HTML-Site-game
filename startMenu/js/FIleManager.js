

//Sign up Button
$("#getS").click(function () {
    var fn = $('#name').val();
    var ln = $('#last').val();
    var email = $('#email').val();
    var pw = $('#password').val();

    localStorage.setItem("fn", fn);
    localStorage.setItem("ln", ln);
    localStorage.setItem("email", email);
    localStorage.setItem("pw", pw);



    // Retrieve
    //alert(localStorage.getItem("Info"));
}
);

$("#getLog").click(function () {

    var mail = $('#emailVer').val();
    var pass = $('#passVer').val();
    var currentMail = localStorage.getItem("email");
    var currPass = localStorage.getItem("pw");

    alert(currPass);
    if (mail == currentMail && pass == currPass) {
        location.replace("../ChooseMenu/chooseAdventure.html")
    } else {
        alert("False");
    }

    // Retrieve
    //alert(localStorage.getItem("Info"));
}
);