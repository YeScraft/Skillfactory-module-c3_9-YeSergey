text = document.querySelector("#city");
text.addEventListener('input', setSity);

if (getCookie(text.id) != undefined){
    out.textContent = "Ваш город: " + getCookie(text.id);
    inputCity.hidden = true;
    showCity.hidden = false;
}

setS.onclick = () => {
    if (getCookie(text.id) == undefined) return null;
    else {
        out.textContent = "Ваш город: " + getCookie(text.id);
        inputCity.hidden = true;
        showCity.hidden = false;
    }
    
};
    
reset.onclick = () => {
    text.value = "";
    out.textContent = "";
    inputCity.hidden = false;
    showCity.hidden = true;
    deleteCookie(text.id);
}

function setSity(e){
    value = e.target.value;
    name = e.target.id;
    setCookie(name, value);
}

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

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1
    });
}
