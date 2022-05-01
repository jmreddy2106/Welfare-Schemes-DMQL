function logout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/";
}
