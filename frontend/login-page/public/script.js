const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

const htmlEl = document.getElementsByTagName("html")[0];
const currentTheme = localStorage.getItem("theme") ?
    localStorage.getItem("theme") :
    null;
if (currentTheme) {
    htmlEl.dataset.theme = currentTheme;
}
const toggleTheme = (theme) => {
    htmlEl.dataset.theme = theme;
    localStorage.setItem("theme", theme);
};

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#id_password");

togglePassword.addEventListener("click", function(e) {
    const type =
        password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

const toggleReg = document.querySelector("#toggleReg");
const pass = document.querySelector("#id_reg");

toggleReg.addEventListener("click", function(e) {
    const type = pass.getAttribute("type") === "password" ? "text" : "password";
    pass.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

function login() {
    const emailInput = document.querySelector("#sign-in-email");
    const passwordInput = document.querySelector("#id_password");
    const email = emailInput.value;
    const password = passwordInput.value;

    const validationResult = validate(email, password);

    if (validationResult) {
        // send HTTP request
        axios.post("/login", {
            email: email,
            pwd: password
        }).then(() => {
            window.location.href = "https://www.google.com/"; //test redirect
        }, () => {
            alert(`Login failed: incorrect account information`);
        }).catch((e) => {
            alert(`Login failed: ${e.response.data.result}`);
        });
    }
};

function register() {
    const usernameInput = document.querySelector("#sign-up-username");
    const emailInput = document.querySelector("#sign-up-email");
    const passwordInput = document.querySelector("#id_reg");
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const validationResult = validate(email, password);

    if (validationResult) {
        // send HTTP request
        axios.post("/register", {
            username: username,
            email: email,
            pwd: password
        }).then(() => {
            alert(`Registration success`);
        }, () => {
            alert(`Registration failed: e-mail already registered.`);
        }).catch((e) => {
            alert(`Registration failed: ${e.response.data.result}`);
        });
    }
};

// frontend input validation
function validate(email, password) {
    if (!email.includes("@")) {
        alert("email input must include @");
        return false;
    }

    if (password.length < 6) {
        alert("password must be at least 6 characters");
        return false;
    }

    return true;
}