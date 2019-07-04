function refresh_cart_count(){
    $.ajax({
        type: 'GET',
        url: cart_count,
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data,status) {
            document.getElementById("cart_count").innerHTML = data.count;
        },
        error: function(data,status) {
        }
    });
}
