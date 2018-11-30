function getCookie(name) {
  return document.cookie.split(';').filter(function(item) {
    return item.indexOf(name) !== -1;
  })[0];
};

$(document).ready(function() {
  var paramArr = (window.location.search.split('?')[1] || '').split('&');
  var myId = '';
  var userId = '';
  var accessToken = (getCookie('token') || '').split('=')[1];

  paramArr.forEach(function (param) {
    if (param.indexOf('myid') !== -1) {
      myId = param.split('=')[1];
    }

    if (param.indexOf('userid') !== -1) {
      userId = param.split('=')[1];
    }
  });

  if (userId) {

    $('.userId')
      .append(userId);

    $.ajax({
      method: 'GET',
      url: 'http://localhost:5000/timeline/'+userId
    })
    .done(function(msg) {
      var timeline = msg.timeline;

      if (timeline) {
        timeline.forEach(function (item) {
          $('.timeline-container')
            .append('<div class="card">' +
              '<div class="card-body">' +
              '<h5 class="card-title">'+item.user_id+'</h5>' +
              '<p class="card-text">'+item.tweet+'</p></div>' +
              '</div>')
        })
      }
    });
  }

  $('#tweetForm').submit(function(e) {
    e.preventDefault();

    // if (!myId) {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      window.location.href = './login.html';
      return;
    }

    var tweet = $('#tweet').val();

    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/tweet',
      headers: {
        'Authorization': accessToken
      },
      data: JSON.stringify({
        "id"    : userId,
        "tweet" : tweet
      }),
      contentType: 'application/json'
    })
    .done(function(msg) {
      console.log(msg)
    });
  });

  $('#follow').on('click', function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/follow',
      data: {
        id: myId,
        follow: userId
      }
    })
      .done(function(msg) {
        console.log(msg)
      });
  });

  $('#unfollow').on('click', function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/unfollow',
      data: {
        id: myId,
        unfollow: userId
      }
    })
      .done(function(msg) {
        console.log(msg)
      });
  });
});
