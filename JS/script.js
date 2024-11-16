function albumOnLoad(){
  printAlbum();

  $(".arrow-img").click(function(){
    switchPhoto(this);
  });
}
function switchPhoto(element){

  event.stopPropagation();
  let arrow = $(element);
  let currentPhoto = findCurrentPhoto();
  let allPhotos = $("#album-body").find("img");
  let currentPhotoIndex = 0;
  allPhotos.each(function(index, element){
    if($(element).attr("src") === currentPhoto.attr("src")){
      currentPhotoIndex = index;
    }
  });
  let newPhoto = undefined;
  if(arrow.attr("id") == "left-arrow"){
    if(currentPhotoIndex === 0)
      newPhoto = allPhotos.eq(allPhotos.length - 1);
    else
      newPhoto = allPhotos.eq(currentPhotoIndex - 1);
  }
  else{
    if(currentPhotoIndex === allPhotos.length - 1)
      newPhoto = allPhotos.eq(0);
    else
      newPhoto = allPhotos.eq(currentPhotoIndex + 1);
  }
  updateLargeImage(newPhoto);

}

function updateLargeImage(newPhoto){
  $("#largeImage").attr({
    "src":$(newPhoto).attr("src"),
    "alt":$(newPhoto).attr("alt")
  });  
}

function findCurrentPhoto(){
  const largeImageSrc = $("#largeImage").attr("src");
  let currentPhoto = $("#album-body").find(`img[src='${largeImageSrc}']`);
  return currentPhoto;
}

function printAlbum() {
  const photosMap = getPhotosWTitles();

  const photosCount = photosMap.size;
  const photosInRow = 3;
  const photoRows = photosCount / photosInRow;

  for(let currentRowOffset = 0; currentRowOffset < photoRows; currentRowOffset++){
    const currentRowPhotos = getSliceOfMap(photosMap, currentRowOffset, photosInRow);
    let rowDiv = getAlbumRow(currentRowPhotos);
    $("#album-body").append(rowDiv);
  }
}

function getSliceOfMap(map, offset, quantity){
  return new Map(Array.from(map.entries()).splice(offset*quantity, quantity));
}

function getAlbumRow(currentRowPhotos){
  let rowDiv = $("<div></div>").addClass("album-row");
    for(let photoSrc of currentRowPhotos.keys()){
      let currentPhotoTitle = currentRowPhotos.get(photoSrc);
      let photoDiv = getPhotoItem(photoSrc, currentPhotoTitle);
      rowDiv.append(photoDiv);
    }
  return rowDiv;
}

function getPhotoItem(photoSrc, photoTitle){
  let photoDiv = $("<div></div>").addClass("album-item");
      let photoImg = $("<img></img>").
        attr({
          "src":photoSrc,
          "alt":photoTitle
        });
      let photoTitleP = $("<p></p>").text(photoTitle);
      photoDiv.append(photoImg, photoTitleP);
    return photoDiv; 
}

function getTitlesFotAlbum(){
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
  return titles; 
}

function getPhotoNames(){
  let photos = [];
  for (let i = 1; i < 16; i++) {
    photos[i - 1] = `IMGS/${i}.jpg`;
  }
  return photos; 
}

function getPhotosWTitles(){
  let photosWTitles = new Map;
  const photos = getPhotoNames();
  const titles = getTitlesFotAlbum();
  for(let i = 0; i < photos.length; i++){
    photosWTitles.set(photos[i], titles[i]);
  }
  return photosWTitles;
}

function showImage() {
  if(event.target.hasAttribute("src")){
    $("#overlay").css("display", "flex");
    $("#largeImage").attr("src", $(event.target).attr("src"));
  }
}

function closeOverlay() {
  $("#overlay").css("display", "none");
}

function printListOfInterests(anc_name, title) {
  let section_title = $("<h2></h2>");
  section_title.append($("<a></a>").attr("name", anc_name).text(title));
  let section = $("<section></section>").attr("id", "interests-section");
  section.append(section_title);
  for (let i = 2; i < printListOfInterests.arguments.length; i++) {
    let item = printListOfInterests.arguments[i];
    let article = $("<acrticle></article>")
      .append($("<h3></h3>").text(item[0]))
      .append($("<img></img>").attr({"src":item[1],"width":"200px"}))
      .append($("<p></p>").addClass("text").text(item[2]));
    section.append(article);
  }
  $("body").append(section);
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
  $("#datetime").text(dateTimeString);
}

function createCalendar(year, month) {
  let calendar = $("#calendar");
  calendar.html("");
  let weekdays = getWeekdaysArray();
  for(let weekday of weekdays){
    calendar.append($("<div></div>").addClass("header").text(weekday));
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.append($("<div></div>"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendar.append($("<button></button>").text(day).click(function(){
      selectDate(year, month, day);
      calendarOnClick();
    }));
  }
}

function getWeekdaysArray(){
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
}

function getMonths(){
  return ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
}

function selectDate(year, month, day) {
  event.preventDefault();
  const monthNames = getMonths();
  const dateString = `${monthNames[month]}/${day}/${year}`;
  let birthdateInput = $("input[name='birthdate']");
  birthdateInput.val(dateString);
  validateField(birthdateInput);
}

function calendarOnClick() {
  const calendarContainer = $("#calendar-container");

  if(calendarContainer.css("display") === "block") {
    calendarContainer.css("display", "none");
  } 
  else {
    let yearSelect = $("#year-select");
    const currentYear = new Date().getFullYear();
    if (yearSelect.children().length === 0) {
        for (let i = currentYear - 100; i <= currentYear; i++) {
          let option = $("<option></option>").val(i).text(i);
          yearSelect.append(option);
        }
    }
    yearSelect.val(currentYear);

    const monthSelect = $("#month-select");
    const currentMonth = new Date().getMonth();
    monthSelect.val(currentMonth);

    createCalendar(currentYear, currentMonth);

    calendarContainer.css("display", "block");
  }
}

function bodyOnLoad() {

  $("#year-select").change(function(){
    const year = this.value;
    const month = $("#month-select").val();
    createCalendar(year, month);  
  });

  $("#month-select").change(function(){
    const month = this.value;
    const year = $("#year-select").val();
    createCalendar(year, month); 
  });

  const form = $("#mainForm");
  const textInputs = form.find("input[type='text']");
  const submitButton =$("#submitButton");

  form.on({
    change: () => {
      let isFormValid = true;
      textInputs.each(function(index, element){
        if ($(element).hasClass("invalid") || !$(element).hasClass("valid")) {
          isFormValid = false;
        }
      });
      submitButton.attr("disabled", !isFormValid);
      submitButton.css("cursor", isFormValid ? "pointer" : "not-allowed");
    },
    reset: () => {
      $(".valid").removeClass("valid");
      $(".invalid").removeClass("invalid");
      $("#FIO").focus();
    },
    submit: () => {
      form.trigger("reset");
    }
  });

  textInputs.each(function(index, element){
    if ($(element).attr("name") === "birthdate") return;
    $(element).blur(function(){
      validateField(this);
    });
  });

  let field_containers = $(document).find(".field-container");
  field_containers.each(function(index, element){
    let tipContainer = $(element).find("div.field-tip-container");
    $(tipContainer).hide();
    if(tipContainer.length !== 0){
      let inputField = $(element).find("input");
      inputField.hover(
        function(){
          $(tipContainer).fadeIn(4*100);  
        }, 
        function(){
          setTimeout(() => {$(tipContainer).fadeOut(4*100);}, 3000);
        }
      );
    }
  });
}

function setupModalWindow(){
  const submitButton = $("#submitButton");

  submitButton.click(() => {
    $(".overlay").css("display", "flex"); 
  });
}

function submitForm(){
  closeOverlay();
}

function validateField(input) {

  let inputElem = $(input);
  const inputName = inputElem.attr("name");
  const errorElement = $(`#${inputName}Error`);
  
  let functionName = `validate${inputName}`;
  let validationResult = inputElem.val().trim() !== "";
  if(validationResult === false){
    errorElement.html("Поле не заполнено");
  }
  if (validationResult && typeof window[functionName] === "function") {
    validationResult = window[functionName](inputElem, errorElement);
  }

  if (validationResult) {
    inputElem.addClass("valid");
    inputElem.removeClass("invalid");
    errorElement.css("display", "none");
  } else {
    inputElem.addClass("invalid");
    inputElem.removeClass("valid");
    errorElement.css("display", "inline");
  }

  const form = $("#mainForm");
  form.trigger("change");
  return validationResult;

  
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
  if (!pattern.test(input.val())) {
    errorElement.html("Поле заполнено некорректно");
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
  let sessionHistory = JSON.parse(sessionStorage.getItem('sessionHistory')) || {};
  sessionHistory[page] = (sessionHistory[page] || 0) + 1;
  sessionStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));

  // Update all-time history in Cookies
  let allTimeHistory = JSON.parse(getCookie('allTimeHistory') || '{}');
  allTimeHistory[page] = (allTimeHistory[page] || 0) + 1;
  setCookie('allTimeHistory', JSON.stringify(allTimeHistory), 365);
}

function loadHistory() {
  // Load session history from Local Storage
  let sessionHistory = JSON.parse(sessionStorage.getItem('sessionHistory')) || {};
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

function loadHeader(){

  let pages = getPagesMap();
  let interestsPageRef = getInterestsPageRef();
  const currentPageRef = getCurrentPageRef();

  let header = $("<header></header>");
  let nav = $("<nav></nav>");
  let ul = $("<ul></ul>");
  for (const pageRef of pages.keys()){
    let a = $("<a></a>").attr("href", pageRef).text(pages.get(pageRef));
    let li = $("<li></li>").append(a);
    if(pageRef === currentPageRef){
      li.attr("class", "current");
    }
    if(pageRef === interestsPageRef){
      appendInterestUl(li);
    }
    ul.append(li);
  }
  nav.append(ul);
  let spanDateTime = $("<span></span>").attr("id", "datetime");
  header.append(nav,spanDateTime);
  $("body").prepend(header);
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

function getPagesMap(){
  let pages = new Map;
  pages.set("main.html", "Главная");
  pages.set("about_me.html", "Обо мне");
  pages.set("interests.html", "Мои интересы");
  pages.set("study.html", "Учеба");
  pages.set("photoalbum.html", "Фотоальбом");
  pages.set("history.html", "История просмотра");
  return pages;
}

function getInterestAnchorsMap(){
  let interestsAnchors = new Map;
  interestsAnchors.set("fav_books", "Любимые книги");
  interestsAnchors.set("fav_movies", "Любимые фильмы");
  interestsAnchors.set("fav_langs", "Любимые ЯП");
  return interestsAnchors;
}

function getInterestList(){
  let interestsAnchors = getInterestAnchorsMap();
  pageRef = getInterestsPageRef();
  let interestsUl = $("<ul></ul>");
    for(const anchor of interestsAnchors.keys()){
      let interestsA = $("<a></a>").
        attr("href", pageRef + "#" + anchor).
        text(interestsAnchors.get(anchor));
      let interestsLi = $("<li></li>").append(interestsA);
      interestsUl.append(interestsLi);
    }
  return interestsUl;
}

function getInterestsPageRef(){
  return "interests.html";
}

function appendInterestUl(element){
  let interestsUl = getInterestList();
  element.append(interestsUl);
}

function isCurrentPage(pageRef){
  return pageRef === getCurrentPageRef();
}

function getCurrentPageRef(){
  const url = document.URL;
  const parts = url.split('/');
  return parts.pop();
}
