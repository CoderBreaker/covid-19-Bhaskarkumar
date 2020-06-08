
$(document).ready(function(){
   var url = "https://api.covid19india.org/data.json"

   $.getJSON(url,function(data){
       console.log(data)

       var total_active,total_recovered,total_deaths,total_confirmed

       var state = []
       var confirmed = []
       var recovered = []

       var death = []

       $.each(data.statewise,function(id,obj){
           state.push(obj.state)
           confirmed.push(obj.confirmed)
           recovered.push(obj.recovered)
           death.push(obj.deaths)
       })

       
       state.shift()
       confirmed.shift()
       recovered.shift()
       death.shift()

       console.log(state)

       total_active = data.statewise[0].active
       total_confirmed = data.statewise[0].confirmed 
       total_recovered = data.statewise[0].recovered
       total_deaths = data.statewise[0].deaths

      $('#active').append(total_active)
      $('#confirmed').append(total_confirmed)
      $('#recovered').append(total_recovered)
      $('#death').append(total_deaths)

      var myChart = document.getElementById("myChart").getContext('2d')

      var chart = new Chart(myChart,{
          type:'line',
          data:{
              labels:state,
              datasets:[
                  {
                      label: "Confirmed Cases",
                      data:confirmed,
                      backgroundColor : "#f1c40f",
                      minBarLength:100
                  },

                  {
                    label: "Recovered Cases",
                    data: recovered,
                    backgroundColor : "#2ec771",
                    minBarLength:100
                 },

                 {
                    label: "Deceased",
                    data:confirmed,
                    backgroundColor : "#e74c3c",
                    minBarLength:100
                }
              ]
          },
          options:{}
        })
   })
});


$.ajax({
    url : "https://api.covid19india.org/data.json",
    type : "GET",
    dataType : "JSON",
    success : function(data){
        console.log(data);
        console.log(data.statewise);
    
        var sno = 1;
        $.each(data.statewise, function(key, value){
           $("#state-wise").append("<tr>" +
                                    "<td>" + sno + "</td>" +
                                    "<td>" + value.lastupdatedtime + "</td>" +
                                    "<td>" + value.state + "</td>" +
                                    "<td>" + value.confirmed + "</td>" +
                                    "<td>" + value.deaths + "</td>" +
                                    "<td>" + value.recovered + "</td>" +
                                    "</tr>");
             sno++;                       
        });
    }

});

$(document).ready(function(){
    $('#icon').click(function(){
          $('ul').toggleClass('show');
    });
});
