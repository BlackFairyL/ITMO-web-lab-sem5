document.writeln('<nav id="my_menu">');
document.writeln('            <ul class="menu">');
document.writeln('                <li class="menu__link"><a href="index.html" class="menu__a" id="menu__a__id">Главная</a></li>');
document.writeln('                <li class="menu__link"><a href="about_me.html" class="menu__a" id="menu__a__id">Обо мне</a></li>');
document.writeln('                <li class="menu__link"><a href="contacts.html" class="menu__a" id="menu__a__id">Контакты</a></li>');
document.writeln('                <li class="menu__link"><a href="table.html" class="menu__a" id="menu__a__id">Таблица</a></li>');
document.writeln('                <li class="menu__link"><a href="constructor_menu.html" class="menu__a" id="menu__a__id">5 лаба</a></li>');
document.writeln('            </ul>');
document.writeln('        </nav>');

$(function () {
    $('.menu__a').each(function () {
        let location = window.location.href;
        let link = this.href;
        let result = location.match(link);
        if(result != null) {
            $(this).addClass('active');
        }
    });
});
