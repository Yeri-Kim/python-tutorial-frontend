function createCookie(value) {
  var now = new Date();
  var expirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 0, 0, 0);

  document.cookie = 'token='+value+'; expires='+expirationDate+'; path=/';
};

$(document).ready(function() {
  $("#loginForm").submit(function(e) {
    e.preventDefault();

    var id = $("#id").val();
    var password = $("#password").val();

    $.ajax({
      method: "POST",
      url: "http://localhost:5000/login",
      data: JSON.stringify({
        "email"    : id,
        "password" : password
      }),
      contentType: 'application/json'
    })
    .done(function(msg) {
      if (msg.access_token) {
        createCookie(msg.access_token);
        window.location.href = './tweets.html?userid='+msg.user_id;
      }
    });
  });
});
