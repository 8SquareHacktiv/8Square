let baseURL = 'http://localhost:3000'
let startLocation
let venueId
$(window).on('load', function() {
  console.log('location')
  let ip = localStorage.getItem('ipAddress')
  if (!startLocation) {
    $.ajax(`${baseURL}/geo`, {
      type: 'POST',
      data: {
        ipAddress: ip
      },
      success: function({ data }) {
        startLocation = `${data.latitude},${data.longitude}`
      },
      error: function(err) {
        errorHandle(err)
      }
    })
  }
  let token = localStorage.getItem('token')
  if (!token) {
    switchIt('out')
  } else {
    switchIt('masuk')
  }
})
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function() {
  $('.veen .rgstr-btn button').click(function() {
    $('.veen .wrapper').addClass('move')
    $('.body').css('background', '#e0b722')
    $('.veen .login-btn button').removeClass('active')
    $(this).addClass('active')
  })
  $('.veen .login-btn button').click(function() {
    $('.veen .wrapper').removeClass('move')
    $('.body').css('background', '#ff4931')
    $('.veen .rgstr-btn button').removeClass('active')
    $(this).addClass('active')
  })

  $('#registerNow').click(function(e) {
    e.preventDefault()
    let username = $('#usernameReg').val()
    let email = $('#emailReg').val()
    let password = $('#passwordReg').val()
    register(username, email, password)
  })
  $('#loginNow').click(function(e) {
    e.preventDefault()
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()
    login(email, password)
  })
  $('#logoutNow').click(function() {
    logoutNow()
  })
})
let arrLocation = []
let venues = []

function fetchVenues() {
  $.ajax({
    method: 'get',
    url: `${baseURL}/foursquare/recomended/${startLocation}`
  })
    .done(data => {
      venues = data.venues
      googleMaps(data.locations)
      //   .then(result => {

      //     console.log(JSON.stringify(result, null, 2))
      //       //setData(venues, result)
      //   })
    })
    .fail(err => {
      errorHandle(err)
    })
  // .always(() => {
  //   setData(venues, arrLocation)
  // })
}

function googleMaps(location) {
  let requests = []
  swal.showLoading()
  location.forEach(end => {
    requests.push(
      $.ajax({
        method: 'POST',
        url: `${baseURL}/googleMaps`,
        data: {
          start: startLocation,
          end: end
        }
      })
    )
  })

  Promise.all(requests)
    .then(results => {
      swal.close()
      console.log(results, 'ini resut')
      setData(venues, results)
    })
    .catch(err => {
      console.log(err)
    })
}

function setData(arr, location) {
  console.log(location)
  arr.forEach((el, i) => {
    $('#venues').append(`
            <div class="card col-md-3 venue" style="width: 16rem;" data-id=${
              el.id
            } data-toggle="tooltip" data-placement="right" title="Review me">
                <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${el.address}</p>
                    <a href="#" class="card-link">${(
                      location[i].data.rows[0].elements[0].distance.value / 1000
                    ).toFixed(1)} km from you</a>
                    <a href="#" class="card-link">${
                      location[i].data.rows[0].elements[0].duration.text
                    } from you</a>
                </div>
            </div>
            `)
  })
}
