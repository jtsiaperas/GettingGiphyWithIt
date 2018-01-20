
var searchList =["infinite","possibilities","cosmic","mysteries","uncharted","depths","inky","blackness","radiant","beauty"];

$(document).on("click","img", function(){
    var state = $(this).attr("data-state");
    if(state=="still")
    { 
        $(this).attr("data-state","animate");
        $(this).attr("src",$(this).attr("data-animate"));
    }
    else
    {
          $(this).attr("data-state","still");
          $(this).attr("src",$(this).attr("data-still"));
    }
  });

for(i=0;i<searchList.length;i++){
      $("#buttons").append("<button class='btn search'>"+searchList[i]+"</button>");
}


$(document).on("click",".search", function() {
      var term = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        term + "&api_key=dc6zaTOxFJmzC";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
          var results = response.data;
          var total = 0;
          var i = 0;
          

          while(total < 10) {
            var rating = results[i].rating;
            
            if (rating !="r")
            {
                var gifDiv = $("<div class='jif col-auto'>");
                var p = $("<br><p>").text("Rating: " + rating);
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-state", "still");
                gifDiv.prepend(p);
                gifDiv.append(image);
                gifDiv.append("</div>");
            $("#jifs").prepend(gifDiv);
               total++;
            }
            i++;
          }
      });
});

$("#makeButton").on("click", function(event) {
  event.preventDefault();
  var term = $("#newButton").val();
  $("#buttons").append("<button class='btn search'>"+term+"</button>");

});
