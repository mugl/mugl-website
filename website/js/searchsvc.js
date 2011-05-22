$(function(){
  $("#go").click(function(){
    var startHeight = $('#results').height();
    $('#results').css("height", startHeight);
    $('#results>div').fadeOut(function(){
      $('#results').empty().html("<p>Just looking for '<b>" + $('#terms').val() + "</b>', won't be a tick...</p>").addClass('loading');
      $('#results').animate({
        height: 125
      });
    });
    var afterDate = $('#afterDate').val().replace("/", "-", "gi");
    var beforeDate = $('#beforeDate').val().replace("/", "-", "gi");
    $.ajax({
      url: 'search?searchTerms='+$('#terms').val()+'&orderBy='+$('#orderBy').val()+
           '&afterDate='+afterDate+'&beforeDate='+beforeDate+
           '&firstResult='+$('#firstResult').val()+'&resultCount='+$('#resultCount').val()+
           '&lang='+$('#lang').val(),
      dataType: "html",
      success: function(data){
        var tmpCont = $('<div></div').css({"visibility":"hidden", "position": "absolute", "top":"0"}).appendTo("body");
        $(data).appendTo(tmpCont);
        var height = tmpCont.height();
        tmpCont.css("display", "none");
        tmpCont.css({"visibility":"visible", "position": "static", "top":"auto"});
        $('#results').animate({
          height: height
        }).empty().removeClass('loading');
        tmpCont.appendTo('#results').fadeIn(function(){$('#results').css("height", "auto");});
        $('.title h5').each(function(){
          $(this).html('<a href="#">' + $(this).text() + '</a>');
        });
        $('.title a').unbind().toggle(function(){
          $(this).addClass("open");
          $(this).parent().parent().next().slideDown();
          return false;
        },function(){
          $(this).removeClass("open");
          $(this).parent().parent().next().slideUp();
          return false;
        });
      },
      error:function(a,b,c){
          $(data).appendTo('#results');
//        alert ('error: a: ' + a + ", b: " + b + ", c: " + c);
      }
    });
    return false;
  });

  Date.format = 'yyyy/mm/dd';
  $("#afterDate, #beforeDate").datePicker({startDate:'01/01/1990'});

});





/*

$(function(){
    $("#go").click(function(){
        $('#results').empty();
        $('#results').html("<p>Just looking for that, won't be a tick...</p>");
        $.ajax({
            url: 'search?searchTerms='+$('#terms').val()+'&orderBy='+$('#orderBy').val()+'&afterDate='+$('#afterDate').val()+'&beforeDate='+$('#beforeDate').val()+'&firstResult='+$('#firstResult').val()+'&resultCount='+$('#resultCount').val(),
         dataType: "html",
         success: function(data){
           $('#results').empty();
           $(data).appendTo('#results');
           $('.title h5').wrap("<a href='#' />");
           $('.title a').unbind().toggle(function(){
             $(this).parent().next().slideDown();
             return false;
           },function(){
             $(this).parent().next().slideUp();
             return false;
           });
         },
         error:function(data,b,c){
             $(data).appendTo('#results');
//             alert ('error: data: ' + data + ", b: " + b + ", c: " + c);
         }
       });
        return false;
    });
});

*/