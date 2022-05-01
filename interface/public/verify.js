const token = localStorage.getItem("token");
if (token) {
    fetch("/api/verify", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        if (response.status === 200) {
            $('#loginButton').hide();
            $('#logoutButton').show();
        } else {
            window.location.href = "/";
            $('#loginButton').show();
            $('#logoutButton').hide();
        }
    });
} else {
    $('#loginButton').show();
    $('#logoutButton').hide();
}
