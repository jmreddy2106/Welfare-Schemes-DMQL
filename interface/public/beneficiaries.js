// Get current page and limit query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get("page") || 1;
const limit = urlParams.get("limit") || 10;
const numberOfPages = Math.ceil(count / limit);
const pagination = $(".pagination");
const pageLeft = $('#pageLeft');
const pageRight = $('#pageRight');
if (page > 1) {
  pageLeft.removeClass("disabled");
  pageLeft.attr("href", `/beneficiaries?page=${page - 1}&limit=${limit}`);
} else {
  pageLeft.addClass("disabled");
}
if (page < numberOfPages) {
  pageRight.removeClass("disabled");
  pageRight.attr("href", `/beneficiaries?page=${page + 1}&limit=${limit}`);
} else {
  pageRight.addClass("disabled");
}

function redirectToLimit(limit) {
  window.location.href = `/beneficiaries?page=1&limit=${limit}`;
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
      linkElement.setAttribute("href", `/beneficiaries?page=${i}&limit=${limit}`);
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
      firstPage.setAttribute("href", `/beneficiaries?page=1&limit=${limit}`);
      firstPage.setAttribute("id", `page1`);
      firstPage.classList.add("item");
      pageLeft.after(dots);
      pageLeft.after(firstPage);
    }

    // add last page
    if (page != numberOfPages) {
      const lastPage = document.createElement("a");
      lastPage.innerHTML = numberOfPages;
      lastPage.setAttribute("href", `/beneficiaries?page=${numberOfPages}&limit=${limit}`);
      lastPage.classList.add("item");
      pageRight.before(lastPage);
    }
  } else {
    // add page numbers
    for (let i = 1; i <= numberOfPages; i++) {
      // Insert before pageRight
      const linkElement = document.createElement("a");
      linkElement.innerHTML = i;
      linkElement.setAttribute("href", `/beneficiaries?page=${i}&limit=${limit}`);
      linkElement.setAttribute("id", `page${i}`);
      linkElement.classList.add("item");
      pageRight.before(linkElement);
    }
  }
  const currentPageElement = document.getElementById(`page${page}`);
  currentPageElement.classList.add("active");
}