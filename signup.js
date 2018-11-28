$(document).ready(function() {
  $("#signupForm").submit(function(e) {
    e.preventDefault();

    var email = $("#email").val();
    var name = $("#name").val();
    var password = $("#password").val();
    var profile = $("#profile").val();

    $.ajax({
      method: "POST",
      url: "http://54.180.88.177:5000/sign-up",
      data: {
        email: email,
        name: name,
        password: password,
        profile: profile
      }
    })
    .done(function(msg) {

      // 현재 Internal Server Error
      // if (msg.ok === true) {
      //   window.location.href = './login.html';
      // }
    });
  });
});