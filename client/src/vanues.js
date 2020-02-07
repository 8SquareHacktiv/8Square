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
      url: `${baseURL}/review`,
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
    console.log(form)
    postReview(venueId, form)
  })

  $(document).on('click', '.venue', function(e) {
    console.log('masuk')
    e.preventDefault()
    venueId = $(this).data('id')
    $('#home').hide()
    $('#review').show()
  })
})
