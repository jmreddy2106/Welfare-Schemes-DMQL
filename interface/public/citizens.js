$(".ui.form").form({
  fields: {
    address: "empty",
    mobile_number: "empty",
    dob: "empty",
    marital_status: "empty",
  },
});

// Get current page and limit query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get("page") || 1;
const limit = urlParams.get("limit") || 10;
const query = urlParams.get("query") || "";
const numberOfPages = Math.ceil(count / limit);
const pagination = $(".pagination");
const pageLeft = $('#pageLeft');
const pageRight = $('#pageRight');
if (page > 1) {
  pageLeft.removeClass("disabled");
  pageLeft.attr("href", `${window.location.pathname}?page=${parseInt(page) - 1}&limit=${limit}&query=${query}`);
} else {
  pageLeft.addClass("disabled");
}
if (page < numberOfPages) {
  pageRight.removeClass("disabled");
  pageRight.attr("href", `${window.location.pathname}?page=${parseInt(page) + 1}&limit=${limit}&query=${query}`);
} else {
  pageRight.addClass("disabled");
}

function redirectToLimit(limit) {
  window.location.href = `${window.location.pathname}?page=1&limit=${limit}&query=${query}`;
}

addPageNumbers(numberOfPages);

function addPageNumbers(numberOfPages) {
  // Add page numbers from current page to 2 pages before and 2 pages after, if there are more than 5 pages
  if (numberOfPages > 5) {
    let startingPoint = page - 2;
    if (page < 3) {
      startingPoint = 1;
    } else if (page > numberOfPages - 2) {
      startingPoint = numberOfPages - 4;
    } else {
      startingPoint = page - 2;
    }
    for (let i = startingPoint; i < startingPoint + 5; i++) {
      const linkElement = document.createElement("a");
      linkElement.innerHTML = i;
      linkElement.setAttribute("href", `${window.location.pathname}?page=${i}&limit=${limit}&query=${query}`);
      linkElement.setAttribute("id", `page${i}`);
      linkElement.classList.add("item");
      pageRight.before(linkElement);
    }
      // add dots
    const dots = document.createElement("a");
    dots.innerHTML = "...";
    dots.classList.add("item");
    pageRight.before(dots);

    // add first page if page > 3
    if (page > 3) {
      const firstPage = document.createElement("a");
      firstPage.innerHTML = 1;
      firstPage.setAttribute("href", `${window.location.pathname}?page=1&limit=${limit}&query=${query}`);
      firstPage.setAttribute("id", `page1`);
      firstPage.classList.add("item");
      pageLeft.after(dots);
      pageLeft.after(firstPage);
    }

    // add last page
    if (page != numberOfPages) {
      const lastPage = document.createElement("a");
      lastPage.innerHTML = numberOfPages;
      lastPage.setAttribute("href", `${window.location.pathname}?page=${numberOfPages}&limit=${limit}&query=${query}`);
      lastPage.classList.add("item");
      pageRight.before(lastPage);
    }
  } else {
    // add page numbers
    for (let i = 1; i <= numberOfPages; i++) {
      // Insert before pageRight
      const linkElement = document.createElement("a");
      linkElement.innerHTML = i;
      linkElement.setAttribute("href", `${window.location.pathname}?page=${i}&limit=${limit}&query=${query}`);
      linkElement.setAttribute("id", `page${i}`);
      linkElement.classList.add("item");
      pageRight.before(linkElement);
    }
  }
  const currentPageElement = document.getElementById(`page${page}&query=${query}`);
  try {
    currentPageElement.classList.add("active");
  } catch (error) {}
}

function editCitizensRecord(citizen) {
  citizen = JSON.parse(citizen);
  $(".edit.modal").modal("show");
  $("#address").val(citizen.address);
  $("#mobile_number").val(citizen.mobile_num);
  $("#dob").val(citizen.dob);
  $("#marital_status").val(citizen.marital_status);
  $("#marital_status").dropdown("set selected", citizen.marital_status);
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
    url: "/api${window.location.pathname}/edit",
    type: "POST",
    data: data,
    success: function (response) {
      console.log(response);
      $(".edit.modal").modal("hide");
      location.reload();
    },
  });
}

function deleteCitizenRecord(citizen) {
  citizen_id = JSON.parse(citizen).citizen_id;
  $.ajax({
    url: "/api${window.location.pathname}/delete",
    type: "POST",
    data: { citizen_id },
    success: function (response) {
      console.log(response);
      location.reload();
    },
  });
}
