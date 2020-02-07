function switchIt(status) {
    if (status == "masuk") {
        $("#loginPage").hide()
        $("#alert").hide()
        $("#home").show()
        $("#nav").show();
        $("#review").hide();
    } else {
        // console.log("masuk logout")
        $("#loginPage").show()
        $("#home").hide()
        $("#alert").hide()
        $("#nav").hide();
        $("#review").hide();
    }
}