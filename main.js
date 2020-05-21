text = document.querySelector("#city");
// При изменении поля ввода в городе вызывается функций сохранения названия города в cookies
text.addEventListener('input', setSity);

checked = {};
let frm = document.forms[0];
let fieldset = frm.elements.checkboxes;

// При обновлении страницы, если в сookies сохранён город его значение будет выведено на экран
if (getCookie(text.id) != undefined){
    out.textContent = "Ваш город: " + getCookie(text.id);
    inputCity.hidden = true;
    showCity.hidden = false;
}
// Проверка по индикатору сохранены ли checkboxes и возврат из cookies значения с блокировкой поля fieldset у формы
if (getCookie("save") != undefined){
    save.hidden = true;
    ResetCheckbox.hidden = false;
    checkedbox = getCookie("box");
    checkedbox = JSON.parse(checkedbox);
    for (let key in checkedbox){
        fieldset.elements[key].checked = checkedbox[key];
    }
    fieldset.disabled = true;
}
// Проверка введён ли город по нажатию на кнопку Enter и вывод на экран значение введённого города
setS.onclick = () => {
    if (getCookie(text.id) == undefined) return null;
    else {
        out.textContent = "Ваш город: " + getCookie(text.id);
        inputCity.hidden = true;
        showCity.hidden = false;
    }  
};
// Удаляем из cookies информацию о введённом городе и выводим снова поле для ввода   
resetCity.onclick = () => {
    text.value = "";
    out.textContent = "";
    inputCity.hidden = false;
    showCity.hidden = true;
    deleteCookie(text.id);
}
// Сохраняем введённый город в cookies
function setSity(e){
    value = e.target.value;
    name = e.target.id;
    setCookie(name, value);
}
// Благодаря всплытию событий определяем элемент формы, который был изменён (галочки) и сохраняем
// его значение в cookies ввиде json строки, чтобы не занимать лишние слоты в coockies
frm.onchange = (e) => {
    name = "box";
    checked[e.target.id] = e.target.checked;
    setCookie(name, JSON.stringify(checked));
}
// Создаём индикатор, что состояние галочек сохранено.
save.onclick = () =>{
    if (getCookie("box") == undefined) {
        return null;
    } 
    else {
        name = "save";
        value = 1;
        setCookie(name, value);
    }  
}
// Обнуляет Checkbox
ResetCheckbox.onclick = () =>{
    deleteCookie("save");
    deleteCookie("box");
    fieldset.disabled = false;
    save.hidden = false;
    ResetCheckbox.hidden = true;
}
// Создаёт Cookie
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        "max-age": "300",
      // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
}
// Возвращает значение Cookie
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
//Удаляет Cookie
function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1
    });
}
