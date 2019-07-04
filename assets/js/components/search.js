 function addToWishlist(trip) {
     add_to_wishlist_route = add_to_wishlist_route.replace('id', trip);
     $.ajax({
         url: add_to_wishlist_route,
         method: "POST",
         success: function(result) {
             console.log(result);
             toastr.info(result.msg, 'Welcome', { timeOut: delay });

             if (result['success'] == 1)
                 $("#wbtn" + trip).html("Wishlisted");
             else
                 $("#wbtn" + trip).html("Already Wishlisted before or carted");
         },
         error: function(data, status) {
             console.log(data.responseJSON);
             console.log(data);
             if (data.status == 401) {
                 toastr.info('let us just know you first, please login or register', 'Validation', { timeOut: delay });
                 $('#sign-in-modal').modal('toggle');
             } else {
                 toastr.error(data.responseJSON.msg, 'Validation', { timeOut: delay });
             }
         }

     });
     add_to_wishlist_route = add_to_wishlist_route.replace(trip, 'id');

 }

 function addToCart(trip) {
     add_to_cart_route = add_to_cart_route.replace('id', trip);
     trip_route = trip_route.replace('id', trip);
     $.ajax({
         url: add_to_cart_route,
         method: "POST",
         success: function(result) {
             refresh_cart_count();
             toastr.info(result.msg, 'Welcome', { timeOut: delay });
             if (result['success'] == 1) {
                 $("#addToCartBody" + trip).html("<center><i class='fa fa-check-circle' style='font-size:118px;color:green'></center>");
                 $("#cbtn" + trip).attr("disabled", "disabled");
                 $("#cbtnbody" + trip).css("display", "none");
                 $("#wbtn" + trip).attr("disabled", "disabled");
                 window.location.replace(trip_route);
                 window.reload();
             } else {
                 $("#cbtnbody" + trip).css("display", "none");
                 $("#addToCartBody" + trip).html("<center><div style='color:green;text-weight:bold;font-size:25px'>" + result['msg'] + "</div></center>");
             }
         },
         error: function(data) {
             if (data.status == 404) {
                 toastr.info('let us just know you first, please login or register', 'Validation', { timeOut: delay });
                 $('#sign-in-modal').modal('toggle');
             } else {
                 toastr.error(data.responseJSON.msg, 'Validation', { timeOut: delay });
             }
         }

     });
     add_to_cart_route = add_to_cart_route.replace(trip, 'id');
 }

 function loadPickupPoints() {
     if ($("#cities").val() == '0') {
         $("#points").find('option').remove();
         $("#points").append("<option value='0'>Choose Pickup Location</option>");
         return;
     }
     $.ajax({
         url: "api/search/points/" + $("#cities").val(),
         method: "GET",
         success: function(result) {
             $('#points').find('option').remove()
             for (var i = 0; i < result.length; i++) {
                 $('#points').append('<option value=' + result[i].id + '>' + result[i].name + '</optino>');
             }
         }
     })
 }

 function pagnation(records, page = 1, url = "") {
     var pagnationBox = document.getElementById('pagenate');
     pagnationBox.innerHTML = "";
     pages = Math.ceil(records / 10);

     if (pages > 1 && page >= 2) {
         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + 1 + ',' + String("url.valueOf()") + ')">First</a></li>';
         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + (page - 1) + ',' + String("url.valueOf()") + ')"><< Previous</a></li>';

         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + (page - 1) + ',' + String("url.valueOf()") + ')">' + (page - 1) + '</a></li>';
     }
     if (pages > 1)
         pagnationBox.innerHTML += '<li class="page-item active"><a class="page-link" href="javascript:void(0)" onclick="getData(' + page + ',' + String("url.valueOf()") + ')">' + page + '</a></li>';

     if (page < pages) {
         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + (page + 1) + ',' + String("url.valueOf()") + ')">' + (page + 1) + '</a></li>';
         if (page > 2 && (pages - 2 >= page)) {
             pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + (page + 2) + ',' + String("url.valueOf()") + ')">' + (page + 2) + '</a></li>';
         }
         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + (page + 1) + ',' + String("url.valueOf()") + ')">Next >> </a></li>';
         pagnationBox.innerHTML += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="getData(' + pages + ',' + String("url.valueOf()") + ')">Last</a></li>';
     }

 }

 function getData(page = 1, vars = "") {
     $.ajax({
         type: "GET",
         url: "api/trips/search?page=" + page + "&" + vars,
         success: function(result) {
             var finalData = "",
                 attractions = "",
                 part1, part2,
                 attractionsNum;
             if (result.length - 1 > 0) {

                 for (var i = 1; i <= (result.length - 1); i++) {
                     includes = result[i]['Includes'].split(';');
                     excludes = result[i]['excludes'].split(';');
                     attractionsNum = result[i]['attractions'].length;
                     part1 = ` <div class="row page-content pt-3 pb-1 mb-3" style="border: none;">
            <div class="col-md-3">
              <img class="w-100" src="${result[i]['image']}">
            </div>
            <div class="col-md">
              <h3 class="card-title mb-0">
                <a href="#" class="primary-color">${result[i]['name']}</a>
              </h3>
              <span>by <a href="/tourguide/profile/${result[i]['tourguideId']}">${result[i]['tourguideName']}</a></span>
              <div class="row" style="min-height: 120px;">
                <div class="col" style="border-right: 1px solid #eee">
                  
                  <span class="primary-color d-block" style="font-size:0.7493rem !important;">
                    <i class="fa fa-calendar"></i> Starts: <span class="font-weight-bold">${result[i]['leavingTime']}</span>
                  </span>
                  <span class="primary-color d-block" style="font-size:0.7493rem !important;">
                    <i class="fa fa-clock-o"></i> Duration: <span class="font-weight-bold">${result[i]['duration']} Days</span>
                  </span>
                </div>

                <div class="col col-md-3" style="border-right: 1px solid #eee">
                  <h5 class="text-center font-weight-bold">Attractions</h5>
                  <ul class="pl-1 mb-0" style="list-style: none;">`;

                     for (var a = 0; a < attractionsNum; a++) {
                         if (a < 3)
                             attractions += `<li><i class="fa fa-map-marker primary-color"></i> <a href="#">${result[i]['attractions'][a].name}</a></li>`;
                     }

                     part2 = `</ul>
                </div>
                <div class="col">
                  <div class="stars" style="width:inherit;">
                    <span><i class="fa fa-star" style="color: gold;"></i></span>
                    <span>${result[i]['rating']} (<a href="#">${result[i]['reviewCount']} Reviews</a>)</span>
                  </div>
                  <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#" class="panel-title">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}"
                            aria-expanded="true" aria-controls="collapseOne">
                            <i class="fa fa-angle-double-down"></i>
                            Includes
                          </a>
                        </a>
                      </div>
                      <div id="collapse${i}" class="panel-collapse collapse in show">
                        <div class="panel-body">
                          <ul class="pl-1 mb-0" style="list-style: none;">`;
                     includes.map(function(x) {
                         part2 += `<li class="text-success"><i class="fa fa-check-square"> ${x} </i></li>`;
                     })

                     part2 += `</ul>
                        </div>
                      </div>
                    </div>
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#" class="panel-title">
                          <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#xcollapse${i}"
                            aria-expanded="false" aria-controls="collapseTwo">
                            <i class="fa fa-angle-double-right"></i>
                            Excludes
                          </a>
                        </a>
                      </div>
                      <div id="xcollapse${i}" class="panel-collapse collapse">
                        <div class="panel-body">
                          <ul class="pl-1 mb-0" style="list-style: none;">`;
                     excludes.map(function(x) {
                         part2 += `<li class="text-danger"><i class="fa fa-window-close"> ${x} </i></li>`;
                     })
                     part2 += `</ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <div class="pull-right">
                    <button id='wbtn${result[i].id}' onclick=addToWishlist(${result[i].id}) class="btn btn-danger btn-sm" ><i class="fa fa-heart"></i>  </button>
                    <button id='cbtn${result[i].id}' class="btn btn-success btn-sm"  onclick=addToCart(${result[i].id})><i class="fa fa-shopping-cart"> 
                    $${result[i]['price']}
                  </i> </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
                     finalData += part1 + attractions + part2;
                     finalData += `  <!-- Add to Cart modal -->
  <div class="modal fade" id="addToCart${result[i].id}" tabindex="-1" role="dialog" aria-labelledby="addToCartModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Purchase ${result[i].name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id='addToCartBody${result[i].id}'>
          <form>
            <h5>Pickup Date: </h5>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-calendar-o"></i></span>
              </div>
              <input type="date" id='date${result[i].id}' class="form-control pickup-date" aria-label="Username" aria-describedby="basic-addon1">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button id="cbtnbody"${result[i].id} onclick="addToCart(${result[i].id},auth)" type="button" class="btn btn-success"><i class="fa fa-cart-plus"></i> Add to Cart</button>
        </div>
      </div>
    </div>
  </div>`;
                     part1 = "";
                     attractions = "";
                     part2 = "";
                 }
                 $("#trips").html(finalData);
                 pagnation(result[0]['records'], page, String(vars));
             } else {
                 $("#trips").html("<center>There no trips match your filtration at this time</center>");
                 $("#pagenate").html("");
             }
         }
     });
 }
 var sBtn = document.getElementById("searchBtn");
 sBtn.addEventListener("click", function(event) {
     event.preventDefault();
     best = 0;
     topRated = 0;
     time = 0;
     date = 0;
     point = 0;
     if ($('#BestSellersTours').is(':checked')) {
         best = 1;
     }
     if ($('#TopRatedTours').is(':checked')) {
         topRated = 1;
     }
     if ($("#LastMinuteDeals").is(':checked')) {
         time = 1;
     }
     if ($("#datepicker").val() != "") {
         date = $("#datepicker").val();
     }
     if ($("#points").val() != 0) {
         point = $("#points").val();
     }

     url = "&priceMin=" + $("#priceMin").val() + "&priceMax=" + $("#priceMax").val() + "&durationMin=" + ($("#durationMin").val() * 60) + "&durationMax=" + ($("#durationMax").val() * 60) + "&best=" + best + "&top=" + topRated + "&time=" + time + "&date=" + date + "&point=" + point;
     getData(1, url);
     loadPickupPoints();
 });

 function topRatedTourGuides() {
     $.ajax({
         method: "GET",
         url: top_rated_tourguides,

         success: function(results) {
             var board = "";
             for (var i = 0; i < 3; i++) {
                 tourguide_route = tourguide_route.replace('url', results[i]['id']);
                 board += `<div class="col-sm-12 mt-3">
                <img src="${results[i]['image']}"alt="post img" class="pull-left img-responsive thumb margin10 img-thumbnail mr-3" style='max-height:80px;max-width:80px'>
                <span class="font-weight-bold mb-0">
                  ${results[i]['name']}
                </span>
                <h6><em><span><i class="fa fa-star" style="color: gold;"></i></span> ${results[i]['rating']} </a></em></h6>
                <a class="btn btn-primary btn-sm" href="${tourguide_route}">MORE DETAILS</a>
              </div>`;
                 tourguide_route = tourguide_route.replace(results[i]['id'], 'url');
             }
             $("#TRTourGuides").html(board);

         }
     })
 }