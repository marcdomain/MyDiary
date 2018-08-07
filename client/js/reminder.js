const modal = document.querySelector('#myModal');
const create = document.querySelector(".create");
const close = document.querySelector(".close");

create.onclick = () => {
    modal.style.display = "block";
}

close.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}