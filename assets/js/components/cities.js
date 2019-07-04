
   $('#select').on('change', function() {
    getPoints($('#select').val());
    $("#select option[value='']").remove();

  });
  function getPoints(id){
    if(id != "")
      $.ajax({
          url:"cities/points/"+id,
          dataType:'json',
          success:function(data)
          {
            let output;
            if(data.length > 0)
            {             
              $('#settings #cityName').html("<a href='#' class='Editable' data-type='text' data-pk='"+$("#select :selected").val()+"' data-url='cities/edit' data-title='Enter city name'>"+$("#select :selected").text()+"</a>");
              $('#settings').slideUp();
              $('#settings').slideDown();
              $('#addPoint').slideDown();
              for (var i = 0; i < data.length; i++)
                {            
                  output += "<tr><td><a href='#' class='Editable' data-type='text' data-pk='"+data[i].id+"' data-url='cities/point/edit' data-title='Enter point name'>"+data[i].name+"</a></td><td>"+data[i].created_at+"</td><td><a href='#' onclick=deletePoint("+data[i].id+")><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr>";
                }
                $("#table>tbody").html(output);
                $("#table").slideUp();
                $("#table").slideDown();
               $('.Editable').editable();
             }
             else{
              $('#table').hide();
              $('#settings #cityName').html("<a href='#' class='Editable' data-type='text' data-pk='"+$("#select :selected").val()+"' data-url='cities/edit' data-title='Enter city name'>"+$("#select :selected").text()+"</a>");
              $('#settings').slideUp();
              $('#settings').slideDown();
              $('#addPoint').slideDown();
              $('.Editable').editable();

             }

          },
      })
      
  }
$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.ajaxOptions = {type: "GET"};

$(document).ready(function() {
    $('#table').hide();
});
$("#AddNewPoint").click(function(){
  $.ajax({
    method: "POST",
    url:"cities/point/add",
    data : {cityId:$("#select :selected").val(),name:$("#nameOfPoint").val()},
    success:function(data){
          $("#table>tbody").append("<tr><td><a href='#' class='Editable' data-type='text' data-pk='"+data.id+"' data-url='cities/point/edit' data-title='Enter point name'>"+data.name+"</a></td><td>"+data.created_at+"</td><td><td><a href='#' onclick='deletePoint("+ data.id +")'><i class='fa fa-trash' aria-hidden='true'></i></a></td></tr>");
          getPoints($('#select').val());
          $("#nameOfPoint").val("");

    } 
  })
})

$("#deleteCity").click(function(){
  let ask = confirm("Are you sure you want to delete this city ?");
  if(ask)
    deleteCity();
})
function deleteCity(){
    $.ajax({
    method:"DELETE",
    url:"cities/delete/"+$("#select :selected").val(),
    success:function(){
      alert("deleted successfully");
      $("#settings").hide();
      $("#table").hide();
      $("#select option[value="+$("#select :selected").val()+"]").remove();
    }
  })
}
function deletePoint(id){
  let ask = confirm("Are you sure you want to delete this point ?");
  if(ask)
      $.ajax({
    method:"DELETE",
    url:"cities/point/delete/"+id,
    success:function(){
      alert("deleted successfully");
      getPoints($('#select').val());


    }
  })
}
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});