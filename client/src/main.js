let basicURL = 'http://localhost:3000'
let latitudeSaya
let longitudeSaya
$(window).on("load", function () {
    let ip = localStorage.getItem("ipAddress")
    if (!latitudeSaya || !longitudeSaya) {
        $.ajax(`${basicURL}/geo`, {
            type: "POST",
            data: {
                ipAddress: ip
            },
            success: function ({ data }) {
                latitudeSaya = data.latitude
                longitudeSaya = data.longitude
            },
            error: function (err) {
                // console.log(err, "<< INI ERROR")
                errorHandle(err)
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Something went wrong!'
                // })
            }
        })
    }
    let token = localStorage.getItem("token")
    if (!token) {
        switchIt("out")
    } else {
        switchIt("masuk")
    }
})

$(document).ready(function () {
    $(".veen .rgstr-btn button").click(function () {
        $('.veen .wrapper').addClass('move');
        $('.body').css('background', '#e0b722');
        $(".veen .login-btn button").removeClass('active');
        $(this).addClass('active');

    });
    $(".veen .login-btn button").click(function () {
        $('.veen .wrapper').removeClass('move');
        $('.body').css('background', '#ff4931');
        $(".veen .rgstr-btn button").removeClass('active');
        $(this).addClass('active');
    });

    $("#registerNow").click(function (e) {
        e.preventDefault()
        let username = $("#usernameReg").val()
        let email = $("#emailReg").val()
        let password = $("#passwordReg").val()
        register(username, email, password)
    })
    $("#loginNow").click(function (e) {
        e.preventDefault()
        let email = $("#emailLogin").val()
        let password = $("#passwordLogin").val()
        login(email, password)
    })
    $("#logoutNow").click(function () {
        logoutNow()
    })

});