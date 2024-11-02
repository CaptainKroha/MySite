function printAlbum() {
  let photos = [];
  for (let i = 1; i < 16; i++) {
    photos[i - 1] = `IMGS/${i}.jpg`;
  }
  let titles = [
    "Колбаски на костре",
    "Романтический ужин",
    "Вкусные роллы",
    "Конь",
    "Брату 17 лет",
    "Сидящий человек",
    "Водопад в Абхазии",
    "Горы Абхазии",
    "Еще водопал Абхазии",
    "И еще горы Абхазии",
    "И снова горы Абхазии",
    "Цветочки",
    "Еще цветочки",
    "Киска 1",
    "Киска 2"
  ];
  for (let i = 0; i < 15; i += 3) {
    document.write(
      '<div class="album-row">',
        '<div class="album-item">',
          `<img src=${photos[i]} alt=${titles[i]} onclick=showImage("${photos[i]}")>`,
          `<p>${titles[i]}</p>`,
        "</div>",
        '<div class="album-item">',
          `<img src=${photos[i+1]} alt=${titles[i+1]} onclick=showImage("${photos[i+1]}")>`,
          `<p>${titles[i+1]}</p>`,
        "</div>",
        '<div class="album-item">',
          `<img src=${photos[i+2]} alt=${titles[i+2]} onclick=showImage("${photos[i+2]}")>`,
          `<p>${titles[i+2]}</p>`,
        "</div>",
      "</div>"
    );
  }
}

function showImage(src) {
  const overlay = document.getElementById('overlay');
  const largeImage = document.getElementById('largeImage');
  largeImage.src = src;
  overlay.style.display = 'flex';
}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function printListOfInterests(anc_name, title) {
  document.write("<section><h2><a name=", anc_name, ">", title, "</a></h2>");
  for (let i = 2; i < printListOfInterests.arguments.length; i++) {
    let item = printListOfInterests.arguments[i];
    document.write(
      "<article>",
        `<h3>${item[0]}</h3>`,
        `<img src=${item[1]} width="200px">`,
        `<p class="text">${item[2]}</p>`,
      "</article>"
    );
  }
  document.write("</section>");
}

function validateForm() {
  // Проверка заполненности текстовых полей
  let formElements = document.forms["mainForm"].elements;
  for (let i = 0; i < formElements.length; i++) {
    let item = formElements[i];
    if (item.type == "text" && item.value == "") {
      alert("Поле " + item.title + " должно быть заполнено");
      item.focus();
      return false;
    }
  }

  if (document.URL.search("contact.html") != -1) {
    return validateContacts();
  } else if (document.URL.search("test.html") != -1) {
    return validateTest();
  }
}

function validateContacts() {
  let fioElement = document.forms["mainForm"]["FIO"];
  const fioPattern = /[А-Я][а-я]+ [А-Я][а-я]+ [А-Я][а-я]+/;

  let phoneElement = document.forms["mainForm"]["phone"];
  const phonePattern = /^(\+7|\+3)\d{8,10}$/;

  if (!fioPattern.test(fioElement.value)) {
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
  let questionElement = document.forms["mainForm"]["q2"];
  let value = Number(questionElement.value);
  if (Number.isNaN(value) || value % 1 == 0) {
    alert(
      "Во втором вопросе должно быть введено вещественное число\nДля записи используется ."
    );
    questionElement.focus();
    return false;
  }
}

function headerOnLoad() {
  const currentLocation = location.href;
  const menuItem = document.querySelectorAll("nav ul li a");
  const menuLength = menuItem.length;
  for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
      menuItem[i].parentElement.classList.add("current");
    }
  }
}

function updateDateTime() {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2); // Двухзначный формат года
  const dayOfWeek = daysOfWeek[now.getDay()];
  const dateTimeString = `${day}.${month}.${year} ${dayOfWeek}`;
  document.getElementById("datetime").textContent = dateTimeString;
}

function createCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = `
      <div class="header">Sun</div>
      <div class="header">Mon</div>
      <div class="header">Tue</div>
      <div class="header">Wed</div>
      <div class="header">Thu</div>
      <div class="header">Fri</div>
      <div class="header">Sat</div>
    `;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += "<div></div>";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendar.innerHTML += `<button onclick="selectDate(${year}, ${month}, ${day})">${day}</button>`;
  }
}

function selectDate(year, month, day) {
  event.preventDefault();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateString = `${monthNames[month]}/${day}/${year}`;
  document.querySelector('input[name="birthdate"]').value = dateString;
  const input = document.getElementsByName("birthdate")[0];
  validateField(input);
}

function calendarOnClick() {
  const calendarContainer = document.getElementById("calendar-container");
  if (calendarContainer.style.display === "block") {
    calendarContainer.style.display = "none";
  } else {
    calendarContainer.style.display = "block";

    const yearSelect = document.getElementById("year-select");
    const currentYear = new Date().getFullYear();
    if (yearSelect.options.length === 0) {
      for (let i = currentYear - 100; i <= currentYear; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
      }
    }
    yearSelect.value = currentYear;

    const monthSelect = document.getElementById("month-select");
    const currentMonth = new Date().getMonth();
    monthSelect.value = currentMonth;

    createCalendar(currentYear, currentMonth);
  }
}

function bodyOnLoad() {
  document
    .getElementById("year-select")
    .addEventListener("change", function () {
      const year = this.value;
      const month = document.getElementById("month-select").value;
      createCalendar(year, month);
    });

  document
    .getElementById("month-select")
    .addEventListener("change", function () {
      const month = this.value;
      const year = document.getElementById("year-select").value;
      createCalendar(year, month);
    });

  document.addEventListener("click", function (event) {
    calendarConteiner = document.getElementById("calendar-container");
    if (!calendarConteiner.contains(event.target)) {
      triggerEvent(document.getElementById("calendar-icon"), "onclick");
    }
  });

  const form = document.getElementById("mainForm");
  const inputs = form.getElementsByTagName("input");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("input", () => {
    let isFormValid = true;
    for (let input of inputs) {
      if (input.type !== "text") continue;
      if (input.classList.contains("invalid") || !input.classList.contains("valid")) {
        isFormValid = false;
      }
    }
    submitButton.disabled = !isFormValid;
    submitButton.style.cursor = isFormValid ? "pointer" : "not-allowed";
  });

  for (let input of inputs) {
    if (input.name === "birthdate") continue;
    input.addEventListener("blur", () => validateField(input));
  }
}

function validateField(input) {
  const form = document.getElementById("mainForm");
  const errorElement = document.getElementById(input.name + "Error");
  let functionName = `validate${input.name}`;
  let validationResult = input.value.trim() !== "";;
  if(validationResult === false){
    errorElement.innerHTML = "Поле не заполнено";
  }
  if (validationResult && typeof window[functionName] === "function") {
    validationResult = window[functionName](input, errorElement);
  }

  if (validationResult) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    errorElement.style.display = "none";
    triggerEvent(form, 'input');
    return true;
  } else {
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorElement.style.display = "inline";
    triggerEvent(form, 'input');
    return false;
  }
  
}

function triggerEvent(element, eventName) {
  let event = new Event(eventName);
  element.dispatchEvent(event);
}

function validateFIO(input, errorElement) {
  const fioPattern = /[А-Я][а-я]+ [А-Я][а-я]+ [А-Я][а-я]+/;
  return validateByPattern(input, fioPattern, errorElement);
}

function validatephone(input, errorElement) {
  const phonePattern = /^(\+7|\+3)\d{8,10}$/;
  return validateByPattern(input, phonePattern, errorElement);
}

function validateByPattern(input, pattern, errorElement){
  if (!pattern.test(input.value)) {
    errorElement.innerHTML = "Поле заполнено некорректно";
    return false;
  }
  else {
    return true;
  }
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  console.log(matches);
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, expiration_days) {
  let date = new Date();
  date.setTime(date.getTime() + (expiration_days * 24 * 60 * 60 * 1000));
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function savePageView() {
  let page = document.title;
  
  // Update session history in Local Storage
  let sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || {};
  sessionHistory[page] = (sessionHistory[page] || 0) + 1;
  localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));

  // Update all-time history in Cookies
  let allTimeHistory = JSON.parse(getCookie('allTimeHistory') || '{}');
  allTimeHistory[page] = (allTimeHistory[page] || 0) + 1;
  setCookie('allTimeHistory', JSON.stringify(allTimeHistory), 365);
}

function loadHistory() {
  // Load session history from Local Storage
  let sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || {};
  let sessionTable = document.getElementById('sessionHistoryTable').getElementsByTagName('tbody')[0];
  for (let page in sessionHistory) {
      let row = sessionTable.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.textContent = page;
      cell2.textContent = sessionHistory[page];
  }

  // Load all-time history from Cookies
  let allTimeHistory = JSON.parse(getCookie('allTimeHistory') || '{}');
  let allTimeTable = document.getElementById('allTimeHistoryTable').getElementsByTagName('tbody')[0];
  for (let page in allTimeHistory) {
      let row = allTimeTable.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.textContent = page;
      cell2.textContent = allTimeHistory[page];
  }
}
