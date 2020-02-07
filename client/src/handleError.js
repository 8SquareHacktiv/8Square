function handleErrorMessage(isi) {
    // console.log(isi)
    let erMSG = "<div class='flex-column'>"
    for (let i of isi) {
        erMSG += `<div class="col mt-2">${i}</div>`
    }
    erMSG += "</div>"
    // console.log(erMSG)
    return erMSG
}

function errorHandle(err) {
    if (typeof err.responseJSON == "string") {
        errMSG = err.responseJSON
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.responseJSON
        })
    } else {
        let txt = handleErrorMessage(err.responseJSON)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: txt
        })
    }
}