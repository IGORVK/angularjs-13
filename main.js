// AngularJS позволяет кешировать шаблоны с помощью сервиса $templateCache. 
//разберем как записывать и читать шаблоны из $templateCache.

//Для начала еще раз пройдемся по примеру урока12
// Мы инициализируем директиву fooBar 
        // app.directive('fooBar', function(){
        //     
        //     
           // var bookmarks = [
            // {
              // id: 1,
              // name: 'EmberJS'
            // },
            // {
              // id: 2,
              // name: 'AngularJS'
            // }
          // ];
          // return {
            // restrict: 'E',
            // templateUrl: "bookmarks.html",
            // link: function (scope, element, attrs) {
              // console.log('directive');
              // scope.bookmarks = bookmarks;
            // }
          // };
        // });
        
//В этой директиве мы говорим, что наша директива является элементом
// В templateUrl мы передаем bookmarks.html (он берется из script(cм урок12) или как я реализовал из файла bookmarks.html при условии если запуще web-server в моем случае openserver)
//Дальше у нас описана link : function в которой мы через 
// scope.bookmarks присваиваем массив объектов bookmarks
// Что такое script?
// script это кусочек кода который выполняется при загрузке аппликейшина
// но до того момента как у нас загрузятся директивы
// и что интересно он на самом деле кеширует шаблоны

// Давайте посмотрим!!!

// Если мы в директиву заиджектим $templateCache в функцию директивы и посмотрим что это есть через link : function прописав там  console.log($templateCache.info());
// Мы увидим что это объект с методами (get, input, put и тд) В основном мы будем использовать get, input, put
// Давайте посмотрим Size этого объекта он равен 1 это означает что сейчас в $templateCache у нас один шаблон
// Откуда он взялся?
// Это тот шаблон который мы загрузили с помощью script
// если script загружен при помощи text/ng-template, то в angular он сразу попадает в $templateCache и там кэшируется
// Давайте теперь используем $templateCache с помощью JavaScript
// Закомментируем script
 // <!-- <script type="text/ng-template" id='bookmarks.html'>
     // <div ng-repeat='bookmark in bookmarks'>
       // {{bookmark.name}}
     // </div>
//  
     // <div ng-repeat='bookmark in bookmarks'>
       // {{bookmark.name}}
     // </div>
// 
     // <div ng-repeat='bookmark in bookmarks'>
       // {{bookmark.name}}
    // </div>
  // </script> -->
  
  //Посмотрим в консоль браузера и увидим опять ошибки с кроссдоменностью
  
  //теперь допишем
// app.run(function ($templateCache) {
  // $templateCache.put('bookmarks.html', "<div ng-repeat='bookmark in bookmarks'>{{bookmark.name}}</div>");
// });
// Что это такое?
// app.run это первая функция и методы внутри нее, которые выполняется при запуске приложения angular 
// мы заиджектили в app.run $templateCache и написали внутри фукции $templateCache.put('bookmarks.html', "<div ng-repeat='bookmark in bookmarks'>{{bookmark.name}}</div>"); первым параметром мы проприсали 'bookmarks.html' а вторым параметром мы вписываем тот html код который мы хотели вставить в 'bookmarks.html'

// Запустим браузер посмотрим консоль и увидим что приложение у нас работает точно также 
// т.е. данный в этом случае берутся сразу из $templateCache так как там есть запись bookmarks.html установленная туда с помощью  $templateCache.put
// если же в $templateCache записи bookmarks.html не окажется то angular попробует сделать ajax запрос
// очень удобно шаблоны кешировать именно при старте приложения как у нас чтобы не было такого что некоторые шаблоны поднимаются несколько раз

// Т.е. так мы можем легко их кешировать при старте!!!

var app = angular.module('app', []);



app.run(function ($templateCache) {
  $templateCache.put('bookmarks.html', "<div ng-repeat='bookmark in bookmarks'>{{bookmark.name}}</div>");
});


app.directive('fooBar', function($templateCache){
    
    
   var bookmarks = [
    {
      id: 1,
      name: 'EmberJS'
    },
    {
      id: 2,
      name: 'AngularJS'
    }
  ];
  return {
    restrict: 'E',
    templateUrl: "bookmarks.html",
    link: function (scope, element, attr) {
      
      scope.bookmarks = bookmarks;
      console.log($templateCache.info());
    }
  };
});












