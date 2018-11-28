$(document).ready(function() {
  $("#loginForm").submit(function(e) {
    e.preventDefault();

    var id = $("#id").val();
    var password = $("#password").val();

    $.ajax({
      method: "POST",
      url: "http://54.180.88.177:5000/log-in",
      data: {
        id: id,
        password: password
      }
    })
    .done(function(msg) {
      if (msg.access_token) {
        window.location.href = './tweets.html?myid='+id+'&userid='+id;
      }
    });
  });
});