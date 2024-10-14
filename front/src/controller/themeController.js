export async function changeTheme(element) {

    if (localStorage.getItem("theme") === "light" || localStorage.getItem("theme") === null) {
        element.style.setProperty('--ThemeColor', 'black');
        element.style.setProperty('--ContentColor', 'white');
        localStorage.setItem("theme", "dark");
        console.log("Tema alterado: Dark");
        return "dark";

    } else {
        element.style.setProperty('--ThemeColor', 'white');
        element.style.setProperty('--ContentColor', 'black');
        localStorage.setItem("theme", "light");
        console.log("Tema alterado: Light");
        return "light";
    }
}
export async function setInitialTheme(element) {


    if (localStorage.getItem("theme") === "light" || localStorage.getItem("theme") === null) {
        element.style.setProperty('--ThemeColor', 'white');
        element.style.setProperty('--ContentColor', 'black');

    } else {
        element.style.setProperty('--ThemeColor', 'black');
        element.style.setProperty('--ContentColor', 'white');
    }
}