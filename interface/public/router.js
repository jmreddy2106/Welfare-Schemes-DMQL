function route(page) {
    if (!localStorage.getItem("token")) {
        $("#loginButton").click();
    } else {
        window.location.href = page;
    }
}