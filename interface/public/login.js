$(".ui.form").form({
  fields: {
    username: "empty",
    password: "empty",
  },
});

function login(event) {
  event.preventDefault();
  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  // make sure username is a-zA-Z0-9
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    alert("Username must be alphanumeric");
    return;
  } else {
    // make request to /api/login
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        });
      } else {
        alert("Invalid username or password");
      }
    });
  }
}
