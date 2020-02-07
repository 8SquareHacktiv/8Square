$(document).ready(function() {
  $(document).on('click', '.venue', function(e) {
    const id = $(this).data('id')
    venueId = id
    $.ajax({
      methods: 'get',
      url: `${baseURL}/review/${id}`
    })
  })

  function postReview(id, form) {
    $.ajax({
      methods: 'post',
      url: `${baseURL}/review/${id}`,
      data: form
    })
      .done(result => {
        console.log(result)
      })
      .fail(err => {
        errorHandle(err)
      })
  }

  $(document).on('click', '#title-nav', function(e) {
    e.preventDefault()
    if (localStorage.getItem('token')) {
      $('#home').show()
      $('#review').hide()
    } else {
      $('#loginPage').show()
      $('#home').hide()
      $('#review').hide()
    }
  })

  $(document).on('click', '#submit-review', function(e) {
    e.preventDefault()
    const form = {
      review: $('textarea#review').val(),
      rating: $('#rating').val()
    }
    postReview(venueId, form)
  })

  $(document).on('click', '.venue', function(e) {
    console.log('masuk')
    e.preventDefault()
    venueId = $(this).data('id')
    $('#home').hide()
    $('#review').show()
    // getReview(venueId)
  })

  function getReview(id) {
    $.ajax({
      methods: 'GET',
      url: `${baseURL}/review/${id}`,
      headers: {
        token: localStorage.token
      }
    })
      .done(result => {
        setReview(result)
      })
      .fail(err => {
        errorHandle(err)
      })
  }

  function setReview(data) {
    data[1].forEach(el => {
      $('#reviewAppen').append(
          `<div class="reviewUser">
          <h5>User : ${el.UserId}<span style="float: right;">${el.rating}</span></h5>
          <hr>
          <p>${el.review}</p>
      </div>`)
    })
  }
})
