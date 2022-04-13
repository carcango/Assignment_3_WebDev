

received_data = [];

function resetPage() {
  $("#unicornNameFilter").prop("checked", false);
  $("#unicornWeightFilter").prop("checked", false);
}

function filter_f() {
  name_ = "unchecked";
  weight_ = "unchecked";

  if ($("#unicornNameFilter").is(":checked")) {
    name_ = "checked";
  }
  if ($("#unicornWeightFilter").is(":checked")) {
    weight_ = "checked";
  }
  console.log(received_data);

  tmp = received_data.map((ob) => {
    result = [];
    if (name_ == "checked") result.push(ob["name"]);

    if (weight_ == "checked") result.push(ob["weight"]);

    return result;
  });
  console.log(tmp);
  $("#result").html("<pre>" + tmp + "</pre>");
}

function process_res(data) {
  received_data = data;
  console.log(data);

  result = "";

  for (i = 0; i < data.length; i++) {
    // for each unicorn
    result += `<button id="${data[i]['name']}" class="unicornButtons">`;
    result += data[i]['name'];
    result += "</button>";
    result += "<br>"


  }
  $("#result").html(result);
}



function findUnicornByFood() {

  $.ajax({
    // url: "http://localhost:5000/findUnicornByFood",
    url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByFood",
    type: "POST",
    data: {

    },
    success: process_res,
  });
  resetPage();
  $("#filters").show();
}

function findUnicornByName() {
  w = $(this).attr("id");
  

  // url = "http://localhost:5000/findUnicornByName";
  url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByName",
  unicornName = w
  data = unicornName
  $.get(
    url,
    function (data) {
      success: process_res_right(data);
    }
    );
  resetPage();
  $("#filters").show();
}



function process_res_right(data) {
  received_data = data;
  console.log(data);


  


  $("#right").html(data)
}


function setup() {
  $("#allUnicorns").click(findUnicornByFood);
  $("#filter").click(filter_f);
  $("#filters").hide();
  
  $("body").on("click", ".unicornButtons", findUnicornByName);
}

$(document).ready(setup);
