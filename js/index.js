/**
 * Created by asrirang on 4/8/17.
 */

// function loadData()
// {
//     $("#ul_id_1 li").click(function() {
//
//         movie_catogery = $(this).text() ; // gets text contents of clicked li
//         alert(movie_catogery);
//         loadData1();
//     });
//
// }

var movie_category;
var movie_count;
var jdata;
var movie_name;
var curr_user='';
var admin='false';

$(document).ready(function (){
    ajax_fetchUser();

    if(curr_user==''){
        $("#checkout").hide();
        $("#logout").hide();
        $("#register1").show();
        $("#login1").show();
        $("#cart12").hide();
        $("#user").text('Guest');
    }
    else
    {
        $("#tmp").text('');
        $("#checkout").show();
        $("#logout").show();
        $("#user").text(curr_user);
        $("#register1").hide();
        $("#login1").hide();
        $("#cart12").show();
    }
});

function removeUser(){
  // $("#logout").empty().append($('<a href="php/login.php>').text("Login"));
  $("#logout").hide();
  $("#login1").show();
  $("#user").text('Guest');
  $.ajax({
      // async: false,
      url: 'http://localhost/php/logout.php',
      type:'post',
      success:function (data) {
          alert("Logged Out successfully");
          window.location = '../index.php';
      },
      error: function() { console.log('error logging out');  }
  })


}
function loadData(movie) {

    movie_category = movie;

    $("#movie-page").empty();
    $("#page1").empty();

    ajax_call();//calling php for count
    if(movie_count>0) {
        pagination(movie_count);    // creating pagination
    }
    //------------
    ajax_call1(1);  // fethcing data from db
}


// function loadMovies(jdata){
//
//   console.log(jdata);
//   var d2 = $('<div class="section group">');
//   $("#movie-page-cart").empty();
//   $(function () {
//       var d1 = $('<div class="content_top">').append(
//           $('<div class="heading">').append(
//               $('<h3>').text('Your Movies')
//           ));
//       $("#movie-page-cart").append(d1);
//       $("#movie-page-cart").append(d2);
//   });
//   if(Object.keys(jdata).length === 0 && obj.constructor === Object)
//   //if(jdata != 0) {
//       $.each(jdata, function (i, item) {
//           var movie_cost = item.Cost;
//           var movie_name = item.Name;
//           var movie_image = "../images/" + item.Img_url;
//           var mov_name = '\'' + movie_name + '\'';
//           var d3 = $('<div class="grid_1_of_5 images_1_of_5">').append(
//               $('<a onclick="movie_preview(' + mov_name + ')">').append($('<img src=' + movie_image + ' alt="" />')),
//               $('<h2>').append($('<a onclick="movie_preview(' + mov_name + ')">').text(movie_name)),
//               $('<div class="price-details">').append(
//                   $('<div class="price-number">').append(
//                       $('<p>').append($('<span class="rupees">').text("$" + movie_cost + ".00"))),
//                   $('<div class="add-cart">').append(
//                       $('<h4>').append($('<a onclick="removeFromCart(' + mov_name + ')">').text("Remove Item"))),
//                   $('<div class="clear">')
//               ));
//           d2.append(d3);
//       })
//   }
//   else{
//       $("#movie-page-cart").append($('<p><br/>&nbsp;&nbsp;No movies found </p>'));
//   }
// }

// function removeFromCart(name){
//   //var username = '<?php echo $user_name ?>';
//   console.log(curr_user, name);
//   var showCartURL = 'http://localhost/php/fetch_movies.php?action=fetch';
//   $.ajax({
//       async: false,
//       url: 'http://localhost/php/update_cart.php',
//       type: 'post',
//       data: {user_name : curr_user, movie_name : name, action: 'delete' },
//       success:function(data){
//         $.get(showCartURL, function success(response) {
//           var jdata=$.parseJSON(response);
//           loadMovies(jdata);
//         });
//       },
//       error: function() { alert("error loading file");  }
//   });
// }

function pagination(count2){
    var count1 = count2/10;

    var pag = $('<div class="center">').append($('<div class="pagination" id="pa1">').append(
        $('<a href="#">&laquo;</a>'),
        $('<a onclick="ajax_call1(1)">1</a>')
    ));

    $("#page1").append(pag);

    for (i = 1; i <= count1; i++) {
        k = 10*(i);
        $("#pa1").append($('<a onclick="ajax_call1('+k+')">'+(i+1)+'</a>'));
    }

    $("#pa1").append($('<a href="#">&raquo;</a>'));

}

function ajax_call(){
    $.ajax({
        async: false,
        url: 'http://localhost/php/data_count.php',
        type:'post',
        data :{movie_category:movie_category},
        success:function (data) {
            movie_count = data;
        },
        error: function() { alert("error loading file");  }
    })
}

function ajax_call1(limit){

    $.ajax({
        async: false,
        url: 'http://localhost/php/data_fetch.php',
        type: 'post',
        //dataType : "json",
        data: {movie_category : movie_category, limit : limit },
        success:function(data)
        {
            jdata=$.parseJSON(data);
            //alert(jdata);
        },
        error: function() { alert("error loading file");  }
    });
    parsing_data();
}

function parsing_data(){
    var d2;
    $("#movie-page").empty();
    $(function () {
        var d1 = $('<div class="content_top">').append(
            $('<div class="heading">').append(
                $('<h3>').text('Movies')
            )
        );
        $("#movie-page ").append(d1);
    });

    if(jdata != 0) {
        $.each(jdata, function (i, item) {
            if (i < 10) {
                //var movie_cart = "preview.html";
                var movie_cost = item.cost;
                var movie_name = item.name;
                //var movie_page = 'preview.html';
                var movie_image = "images/" + item.img;
                var mov_name = '\'' + movie_name + '\'';
                //alert(mov_name);

                var d3 = $('<div class="grid_1_of_5 images_1_of_5">');
                if (admin=='true') {
                  d3.append($('<button />', { "class":  "primary-btn delete_btn", text: "Delete"}));
                }
                d3.append(
                    $('<a onclick="movie_preview(' + mov_name + ')">').append($('<img src=' + movie_image + ' alt="" />')),
                    $('<h2>').append($('<a onclick="movie_preview(' + mov_name + ')">').text(movie_name)),
                    $('<div class="price-details">').append(
                        $('<div class="price-number">').append(
                            $('<p>').append($('<span class="rupees">').text("$" + movie_cost + ".00"))),
                        $('<div class="add-cart">').append(
                            $('<h4>').append($('<a onclick="addToCart(' + mov_name + ')">').text("Add to Cart"))),
                        $('<div class="clear">')
                    ));

                if (i % 5 == 0) {
                    d2 = $('<div class="section group">');
                    $("#movie-page ").append(d2);
                }
                d2.append(d3);
            }
        })
    }
    else
    {
        $("#movie-page ").append($('<p><br/>&nbsp;&nbsp;No movies found </p>'));
    }
}

function addToCart(name){

    if(curr_user == ''){
        window.location = 'http://localhost/php/user_login.php';
        // alert("Login to enable Cart");
    }
    else {
        $.ajax({
            async: false,
            url: 'http://localhost/php/cart_add.php',
            type: 'post',
            //dataType : "json",
            data: {user_name: curr_user, movie_name: name},
            success: function (data) {
                alert("Added to Cart Sucessfully!!")
            },
            error: function () {
                alert("error loading file");
            }
        });
    }
}

function ajax_fetchUser(){

    $.ajax({
        async:false,
        url: "http://localhost/php/user_fetch.php",
        cache: false,
        success: function(data){
            if(data != ''){
              var user = $.parseJSON(data);
                curr_user = user.username;
                admin = user.admin;
            }
        }
    });
}

function movie_preview(name1){
    window.location.replace('http://localhost/php/movie_preview.php?name=' + name1);
}

function search(){

    var p = document.getElementById('search1');
    var res = 0;
    $("#movie-page").empty();
    $("#page1").empty();



    $.ajax({
        async: false,
        url: 'http://localhost/php/search.php',
        type: 'post',
        //dataType : "json",
        data: {movie_name : p.value },
        success:function(data)
        {

            jdata = $.parseJSON(data);



        },
        error: function() { alert("error loading file");  }
    });
    // movie_category = 'All';
    // pagination(43);
     parsing_data();
    return false;


}
