function switchIt(status) {
    if (status == "masuk") {
        $("#loginPage").hide()
        $("#home").show()
        $("#alert").hide()
    } else {
        // console.log("masuk logout")
        $("#loginPage").show()
        $("#home").hide()
        $("#alert").hide()
    }
}