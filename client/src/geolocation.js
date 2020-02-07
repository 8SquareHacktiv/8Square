window.onload = function () {
    if (!localStorage.getItem("ipAddress")) {
        getIp()
    }
    async function getIp() {
        let ipnya = await $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
            localStorage.setItem("ipAddress", data.geoplugin_request)
            return ipnya
        });
    }
};
