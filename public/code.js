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
  // console.log(received_data);

  tmp = received_data.map((ob) => {
    result = [];
    if (name_ == "checked") result.push(ob["name"]);

    if (weight_ == "checked") result.push(ob["weight"]);

    return result;
  });
  // console.log(tmp);
  $("#result").html("<pre>" + tmp + "</pre>");
}

function process_res(data) {
  received_data = data;
  console.log(data);
  $("#result").html(JSON.stringify(data));
}
function findUnicornByName() {
  console.log($("#unicornName").val());
  $.ajax({
    url: "https://radiant-anchorage-93970.herokuapp.com/findUnicornByName/",
    type: "POST",
    data: {
      unicornName: $("#unicornName").val(),
    },
    success: process_res,
  });
  resetPage();
  $("#filters").show();
}

function findByWeight() {
  console.log("findByWeight" + "got called!");
  console.log($("#lowerWeight").val());
  $.ajax({
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
  $("#findUnicornByWeight").click(findByWeight);
  $("#findUnicornByFood").click(findUnicornByFood);
  $("#findUnicornByName").click(findUnicornByName);
  $("#filter").click(filter_f);
  $("#filters").hide();
}

$(document).ready(setup);
