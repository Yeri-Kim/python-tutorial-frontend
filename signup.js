$(document).ready(function() {
  $("#signupForm").submit(function(e) {
    e.preventDefault();

    var email    = $("#email").val();
    var name     = $("#name").val();
    var password = $("#password").val();
    var profile  = $("#profile").val();

    $.ajax({
      method: "POST",
      url: "http://localhost:5000/sign-up",
      data: JSON.stringify({
        "email"    : email,
        "name"     : name,
        "password" : password,
        "profile"  : profile
      }),
      contentType: 'application/json'
    })
    .done(function(msg) {
       console.log(msg)
       if (msg.email === email) {
         window.location.href = './login.html';
       }
    });
  });
});
