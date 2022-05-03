$(".ui.form").form({
  fields: {
    address: "empty",
    mobile_number: "empty",
    dob: "empty",
    marital_status: "empty",
  },
});

function editCitizensRecord(citizen) {
  citizen = JSON.parse(citizen);
  $(".edit.modal").modal("show");
  $("#address").val(citizen.address);
  $("#mobile_number").val(citizen.mobile_num);
  $("#dob").val(citizen.dob);
  $("#marital_status").val(citizen.marital_status);
  $('#marital_status').dropdown('set selected', citizen.marital_status);
  $("#citizen_id").html(citizen.citizen_id);
}

const editCitizenButton = document.getElementById("editCitizen");
editCitizenButton.addEventListener("click", editCitizen);

function editCitizen(event) {
  event.preventDefault();
  var data = {
    address: $("#address").val(),
    mobile_num: $("#mobile_number").val(),
    dob: $("#dob").val(),
    marital_status: $("#marital_status").val(),
    citizen_id: $("#citizen_id").html(),
  };
  $.ajax({
    url: "/api/citizens/edit",
    type: "POST",
    data: data,
    success: function (response) {
      console.log(response);
      $(".edit.modal").modal("hide");
      location.reload();
    },
  });
}
