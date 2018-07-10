
const userAuthForms = () => {
    const authForm = document.querySelectorAll(".auth-form");
    authForm[0].style.display = 'block';

    function switchForm(event){
        if(event.target.id === "signin"){
            authForm[0].style.display = "none";
            authForm[1].style.display = "block";
        }
        else {
            authForm[1].style.display = "none";
            authForm[0].style.display = "block";
        }
    }
    const signup = document.querySelector("#signup");
    const signin = document.querySelector("#signin");
    signup.addEventListener("click", switchForm);
    signin.addEventListener("click", switchForm);
};
window.onload = userAuthForms();
