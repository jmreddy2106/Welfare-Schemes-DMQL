$("#citizenForm").form({
  on: "blur",
  inline: true,
  fields: {
    citizen_id: {
      identifier: "citizen_id",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a citizen id",
        },
      ],
    },
    first_name: {
      identifier: "first_name",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a first name",
        },
      ],
    },
    last_name: {
      identifier: "last_name",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a last name",
        },
      ],
    },
    address: {
      identifier: "address",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a address",
        },
      ],
    },
    mobile_number: {
      identifier: "mobile_number",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a mobile number",
        },
        {
          type: "number",
          prompt: "Please enter a valid mobile number",
        },
        {
          type: "minLength[10]",
          prompt: "Please enter a valid mobile number",
        },
      ],
    },
    dob: {
      identifier: "dob",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a date of birth",
        },
      ],
    },
    state: {
      identifier: "state",
      rules: [
        {
          type: "empty",
          prompt: "Please select a state",
        },
      ],
    },
    district: {
      identifier: "district",
      rules: [
        {
          type: "empty",
          prompt: "Please select a district",
        },
      ],
    },
    mandal: {
      identifier: "mandal",
      rules: [
        {
          type: "empty",
          prompt: "Please select a mandal",
        },
      ],
    },
    village: {
      identifier: "village",
      rules: [
        {
          type: "empty",
          prompt: "Please select a village",
        },
      ],
    },
  },
});

//gereate random data with Upper case letter with seven digit number
function generateCitizenId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var possible2 = "0123456789";
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  for (var i = 0; i < 7; i++)
    text += possible2.charAt(Math.floor(Math.random() * possible2.length));

  //validate user name with database
  fetch("/api/citizens/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ citizen_id: text }),
  }).then((res) => {
    if (res.status == 200) {
      document.getElementById("citizen_id").value = text;
    } else {
      generateCitizenId();
    }
  });
}

generateCitizenId();

//get all states
fetch("/api/geography/states", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((data) => {
    var state = document.getElementById("state");
    // set the first option to be the default disabled option
    var disabledOption = document.createElement("option");
    disabledOption.text = "Select State";
    disabledOption.value = "undefined";
    disabledOption.disabled = true;
    disabledOption.selected = true;
    $(state).dropdown("set selected", disabledOption.value);

    state.add(disabledOption);

    for (var i = 0; i < data.length; i++) {
      var option = document.createElement("option");
      option.value = data[i].state_id;
      option.text = data[i].state_name;
      state.add(option);
    }
  });

//get all districts
document.getElementById("state").addEventListener("change", function () {
  var state_id = document.getElementById("state").value;
  fetch("/api/geography/districts/" + state_id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      var district = document.getElementById("district");
      district.innerHTML = "";
      var disabledOption = document.createElement("option");
      disabledOption.text = "Select District";
      disabledOption.value = "undefined";
      disabledOption.disabled = true;
      disabledOption.selected = true;
      $(district).dropdown("set selected", disabledOption.value);

      district.add(disabledOption);

      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].district_id;
        option.text = data[i].district_name;
        district.add(option);
      }
    }).catch((err) => {
        alert(err);
    });
});

//get all mandals
document.getElementById("district").addEventListener("change", function () {
  var district_id = document.getElementById("district").value;
  fetch("/api/geography/mandals/" + district_id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      var mandal = document.getElementById("mandal");
      mandal.innerHTML = "";
      var disabledOption = document.createElement("option");
      disabledOption.text = "Select Mandal";
      disabledOption.value = "undefined";
      disabledOption.disabled = true;
      disabledOption.selected = true;
      $(mandal).dropdown("set selected", disabledOption.value);
      mandal.add(disabledOption);

      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].mandal_id;
        option.text = data[i].mandal_name;
        mandal.add(option);
      }
    }).catch((err) => {
        alert(err);
    });
});

//get all villages
document.getElementById("mandal").addEventListener("change", function () {
  var mandal_id = document.getElementById("mandal").value;
  fetch("/api/geography/villages/" + mandal_id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      var village = document.getElementById("village");
      village.innerHTML = "";
      var disabledOption = document.createElement("option");
      disabledOption.text = "Select Village";
      disabledOption.value = "undefined";
      disabledOption.disabled = true;
      disabledOption.selected = true;
      $(village).dropdown("set selected", disabledOption.value);
      village.add(disabledOption);

      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].village_id;
        option.text = data[i].village_name;
        village.add(option);
      }
    }).catch((err) => {
        alert(err);
    });
});

function addCitizen(event) {
  event.preventDefault();
  if ($("#citizenForm form").form("is valid")) {
    var formData = {
      citizen_id: document.getElementById("citizen_id").value,
      first_name: document.getElementById("first_name").value,
      middle_name: document.getElementById("middle_name").value,
      last_name: document.getElementById("last_name").value,
      address: document.getElementById("address").value,
      mobile_num: '+91-' + document.getElementById("mobile_number").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      marital_status: document.getElementById("marital_status").value,
      disabled: document.getElementById("disabled").value,
      disbaled_percentage: document.getElementById("disbaled_percentage").value ?? 0,
      caste: document.getElementById("caste").value,
      village_id: document.getElementById("village").value,
    };

    fetch("/api/citizens/addnewcitizen", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Citizen added successfully") {
          window.location.href = "/citizens";
        } else {
          console.log(data.message);
          alert(data.message);
        }
      });
  }
}

document.getElementById("add_citizen").addEventListener("click", addCitizen);
document.getElementById("disabled").addEventListener("change", function () {
  if (document.getElementById("disabled").value == "yes") {
    document.getElementById("disbaled_percentage").disabled = false;
  } else {
    document.getElementById("disbaled_percentage").disabled = true;
  }
});
