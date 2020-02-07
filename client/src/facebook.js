
function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the app 	know 		the current login status of the person.
    if (response.status === 'connected') {

        console.log('Welcome!  Fetching your information.... ');

        FB.api('/me', function (response) {
            // console.log(response, "<<<<<<<")
            let splitName = response.name.split(" ")
            let email = splitName[0].toLowerCase() + "facebook@mail.com"
            let username = response.name
            $.ajax(`${baseURL}/users/facebook`, {
                type: "POST",
                data: {
                    email,
                    username
                },
                success: function (hasilnya) {
                    localStorage.setItem("token", hasilnya.token)
                    switchIt("masuk")
                },
                error: function (err) {
                    // console.log(err, "error facebook")
                    errorHandle(err)
                    // swal("Oops", "Something went wrong", "error")
                }
            })
            console.log('Successful login for: ' + response.name);

        });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        // document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        // document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }

}
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {

    FB.init({
        appId: '181870176493798',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v6.0' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus(). 
    // This function gets the state of the person visiting this page.
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));