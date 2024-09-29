function printAlbum() {
    var photos = new Array();
    for(var i = 1; i < 16;i++) {
        photos[i-1] = "IMGS/" + i + ".jpg";
    }
    var titles = new Array("Колбаски на костре", "Романтический ужин", "Вкусные роллы", "Конь", "Брату 17 лет", "Сидящий человек",
        "Водопад в Абхазии", "Горы Абхазии", "Еще водопал Абхазии", "И еще горы Абхазии", "И снова горы Абхазии", "Цветочки",
        "Еще цветочки", "Киска 1", "Киска 2");
    for(var i = 0; i < 15; i+=3) {
        document.write(
            '<div class="album-row">',
                '<div class="album-item">',
                    '<img src=', photos[i] ,' alt=', titles[i],'>',
                    '<p>', titles[i],'</p>', 
                '</div>',
                '<div class="album-item">',
                    '<img src=', photos[i+1] ,' alt=', titles[i+1],'>',
                    '<p>', titles[i+1],'</p>',    
                '</div>',
                '<div class="album-item">',
                    '<img src=', photos[i+2] ,' alt=', titles[i+2],'>',
                    '<p>', titles[i+2],'</p>',
                '</div>',
            '</div>'
        );
    }
}

function printListOfInterests(anc_name, title) {
    document.write('<section><h2><a name=', anc_name,'>', title,'</a></h2>');
    for(var i = 2; i < printListOfInterests.arguments.length; i++) {
        item = printListOfInterests.arguments[i];
        document.write('<article><h3>', item[0],'</h3>', '<img src=', item[1], ' width="200px">', '<p class="text">', item[2],'</p></article>');
    }
    document.write('</section>');
}

function validateForm() {
    // Проверка заполненности текстовых полей
    var formElements = document.forms["mainForm"].elements;
    for(var i = 0; i < formElements.length; i++) {
        item = formElements[i];
        if(item.type == "text" && item.value == "") {
            alert("Поле " + item.title + " должно быть заполнено");
            item.focus();
            return false;
        }
    }

    if(document.URL.search("contact.html") != -1) { return validateContacts();}
    else if(document.URL.search("test.html") != -1) {return validateTest();}
}

function validateContacts() {
    var fioElement = document.forms["mainForm"]["FIO"];
    const fioPattern = /[А-Я][а-я]+ [А-Я][а-я]+ [А-Я][а-я]+/;
    
    var phoneElement = document.forms["mainForm"]["phone"];
    const phonePattern = /^(\+7|\+3)\d{8,10}$/;

    if(!fioPattern.test(fioElement.value)) {
        alert("ФИО заполнено некорретно");
        fioElement.focus();
        return false;
    }
    if (!phonePattern.test(phoneElement.value)) {
        alert("Мобильный телефон заполнен некорректно");
        phoneElement.focus();
        return false;
    }
}

function validateTest() {
    questionElement = document.forms["mainForm"]["q2"];
    value = Number(questionElement.value);
    if(Number.isNaN(value) || value % 1 == 0) {
        alert("Во втором вопросе должно быть введено вещественное число\nДля записи используется .");
        questionElement.focus();
        return false;
    }
}