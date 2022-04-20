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
    result += "<table>";
    result += "<tr>";

    for (field in data[i]) {
      result += "<th>";
      result += field;
      result += "</th>";
    }
    result += "</tr>";
    result += "<tr>";
    for (field in data[i]) {
      result += "<td>";
      if (field == "loves") {
        result += "<ul>";
        for (j = 0; j < data[i]["loves"].length; j++) {
          result += "<li>";
          result += data[i][field][j];
          result += "</li>";
        }
        result += "</ul>";
      } else {
        result += data[i][field];
      }
      result += "</td>";
    }

    result += "<tr>";
    result += "</table>";
  }

  $("#result").html(result);
}
function findUnicornByName() {
  console.log($("#unicornName").val());
  url = "http://localhost:5000/findUnicornByName";
  unicornName = $("#unicornName").val();
  data = unicornName;
  $.get(
    url,
    function (data) {
      success: process_res;
    }

    // url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByName/",
  );
  resetPage();
  $("#filters").show();
}

function findUnicornByWeight() {
  console.log("findUnicornByWeight" + "got called!");
  console.log($("#lowerWeight").val());
  console.log($("#higherWeight").val());
  $.ajax({
    // url: "http://localhost:5000/findUnicornByWeight",
    url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByWeight",
    type: "POST",
    data: {
      lowerWeight: $("#lowerWeight").val(),
      higherWeight: $("#higherWeight").val(),
    },
    success: process_res,
  });
  resetPage();
  $("#filters").show();
}

function findUnicornByFood() {
  carrotIsChecked = "unchecked";
  appleIsChecked = "unchecked";
  if ($("#carrot").is(":checked")) carrotIsChecked = "checked";

  if ($("#apple").is(":checked")) appleIsChecked = "checked";

  $.ajax({
    // url: "http://localhost:5000/findUnicornByFood",
    url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByFood",
    type: "POST",
    data: {
      appleIsChecked: appleIsChecked,
      carrotIsChecked: carrotIsChecked,
    },
    success: process_res,
  });
  resetPage();
  $("#filters").show();
}

function setup() {
  $("#findUnicornByWeight").click(findUnicornByWeight);
  $("#findUnicornByFood").click(findUnicornByFood);
  $("#findUnicornByName").click(findUnicornByName);
  $("#filter").click(filter_f);
  $("#filters").hide();
}

$(document).ready(setup);
