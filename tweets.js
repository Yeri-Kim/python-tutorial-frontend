$(document).ready(function() {
  var paramArr = (window.location.search.split('?')[1] || '').split('&');
  var myId = '';
  var userId = '';

  paramArr.forEach(function (param) {
    if (param.indexOf('myid') !== -1) {
      myId = param.split('=')[1];
    }

    if (param.indexOf('userid') !== -1) {
      userId = param.split('=')[1];
    }
  });

  if (myId) {

  }

  if (userId) {
    $.ajax({
      method: "GET",
      url: "http://54.180.88.177:5000/timeline/"+userId,
    })
    .done(function(msg) {
      var timeline = msg.timeline;

      if (timeline) {
        timeline.forEach(function (item) {
          $('.timeline-container')
          .append('<li><strong>' + item.user_id +
            '님</strong><p>' + item.tweet +
            '</p></li>');
        })
      }
    });
  }

  $("#tweetForm").submit(function(e) {
    e.preventDefault();

    if (!myId) {
      alert('로그인이 필요합니다.');
      window.location.href = './login.html';
      return;
    }

    var tweet = $("#tweet").val();

    $.ajax({
      method: "POST",
      url: "http://54.180.88.177:5000/tweet",
      data: {
        id: userId,
        tweet: tweet
      }
    })
    .done(function(msg) {
      console.log(msg)
    });
  });
});