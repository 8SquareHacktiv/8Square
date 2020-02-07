function register(username, email, password) {
  // console.log("halo dari register", username, email, password)
  $.ajax({
    type: 'POST',
    url: `${baseURL}/users/register`,
    data: {
      username,
      email,
      password
    },
    success: function(hasilnya) {
      localStorage.setItem('token', hasilnya.token)
      switchIt('masuk')
      fetchVenues()
    },
    error: function(err) {
      console.log(err)
      errorHandle(err)
    }
  })
}

function login(email, password) {
  $.ajax(`${baseURL}/users/login`, {
    type: 'POST',
    data: {
      email,
      password
    },
    success: function(hasilLogin) {
      localStorage.setItem('token', hasilLogin.token)
      switchIt('masuk')
      fetchVenues()
    },
    error: function(err) {
      errorHandle(err)
    }
  })
}

function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax(`${baseURL}/users/google`, {
    type: 'POST',
    data: {
      id_token
    },
    success: function(hasilLoginGoogle) {
      localStorage.setItem('token', hasilLoginGoogle.token)
      switchIt('masuk')
      fetchVenues()
    },
    error: function(err) {
      console.log(err)
      errorHandle(err)
    }
  })
}
function onFailure(error) {
  console.log(error)
  errorHandle(err)
}

function logoutNow() {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function() {
    console.log('User signed out.')
  })
  switchIt('out')
}
