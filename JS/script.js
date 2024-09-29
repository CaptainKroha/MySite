function printAlbum(){
    var photos = new Array();
    for(var i = 1; i < 16;i++)
    {
        photos[i-1] = "IMGS/" + i + ".jpg";
    }
    var titles = new Array("Колбаски на костре", "Романтический ужин", "Вкусные роллы", "Конь", "Брату 17 лет", "Сидящий человек",
        "Водопад в Абхазии", "Горы Абхазии", "Еще водопал Абхазии", "И еще горы Абхазии", "И снова горы Абхазии", "Цветочки",
        "Еще цветочки", "Киска 1", "Киска 2");
    for(var i = 0; i < 15; i+=3)
    {
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

function printListOfInterests(anc_name, title){
    document.write('<section><h2><a name=', anc_name,'>', title,'</a></h2>');
    for(var i = 2; i < printListOfInterests.arguments.length; i++)
    {
        item = printListOfInterests.arguments[i];
        document.write('<article><h3>', item[0],'</h3>', '<img src=', item[1], ' width="200px">', '<p class="text">', item[2],'</p></article>');
    }
    document.write('</section>');
}