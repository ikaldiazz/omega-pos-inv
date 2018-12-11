document.addEventListener('deviceready', () => {
  console.log('Device ready event fired!');
   // console.log(cordova.plugins); // Undefined
   function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // console.log('Connection type: ' + states[networkState]);
    console.log('Connection type: ' + states[networkState]);
}

// checkConnection();
// document.addEventListener("offline", onOffline, false);

// function onOffline() {
//     // Handle the offline event
//     console.log('Connection type: OFFLINE');

// }

// QRScanner.prepare(onDone); // show the prompt
 
// function onDone(err, status){
//   if (err) {
//    // here we can handle errors and clean up any loose ends.
//    console.error(err);
//    console.log(JSON.parse(status));
//   }
//   if (status.authorized) {
//     // W00t, you have camera access and the scanner is initialized.
//     // QRscanner.show() should feel very fast.
//   } else if (status.denied) {
//    // The video preview will remain black, and scanning is disabled. We can
//    // try to ask the user to change their mind, but we'll have to send them
//    // to their device settings with `QRScanner.openSettings()`.
//   } else {
//     // we didn't get permission, but we didn't get permanently denied. (On
//     // Android, a denial isn't permanent unless the user checks the "Don't
//     // ask again" box.) We can ask again at the next relevant opportunity.
//   }
// }


});



// Dom7
var $$ = Dom7;

// console.log(Framework7.device.os);
// var dvc = JSON.stringify(Framework7.device.os);

var store = localStorage;
var debugMode = true;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.mbutgae.omega', // App bundle ID
  name: 'Omega POS Inventory', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      dvcx:{
        // dvc
      } ,
      user: {
        uid : 'mbutgae',
        key :'',
        mail : 'dev@mbutgae.com',
        created : '2018-04-01',
        status : 'debug',
        level : 'verbose',
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Test',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    getData: function (tablename) {
      // app.dialog.alert('Hello World!');
      app.request({
          url: 'http://khojati.id/titip/api/v2/api.php/records/'+tablename,
          method: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          success: function(response){
            return response.records
          },
          error: function(xhr, status){
            console.log(xhr);
            console.log(status);
          }
        });
    },
    sendData: function (form) {
      // app.dialog.alert('Hello World!');
      app.request({
          url: 'http://khojati.id/titip/api/v2/api.php/records/'+tablename,
          method: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          // data: {
          //     uid: uname,
          //     pass: pwd
          // },
          success: function(response){
            return response.records
          },
          error: function(xhr, status){
            console.log(xhr);
            console.log(status);
          }
        });
    },
    formToData: function (form) {
      var formData;
      formData = app.form.convertToData(form);
      var act = $$(form).attr("action");
      var met = $$(form).attr("method");
      var enc = $$(form).attr("enctype");
      console.log(act, met, enc);
      console.log(JSON.stringify(formData));
      return JSON.stringify(formData);      
    },
  },
  // App routes
  routes: routes,
  on: {
    init() {
      //device ready here
      console.log("Ready");
      // $$('#notifx').show();
      document.addEventListener('deviceready', () => {
        // console.log('Device ready event fired!');
         console.log(cordova.plugins); // Undefined
      });

      // localStorage.uname = 'aaaa';
      // localStorage.key = 'bbbb';
      // if (isLoggedIn()) {app.loginScreen.open('#my-login-screen');} else {app.loginScreen.open('#my-login-screen');}
      // Init/Create views


    },
    pageInit(page) {
      $$('.progressbar-infinite').hide();
      $$('#notif-progress').show();
      // var self = this;
      // var app = self.$app;
      // self.searchbar = app.searchbar.create({
      //   el: page.$el.find('.searchbar'),
      //   on: {
      //     enable(evt) {
      //       Dom7('.page').css({'display':'none'})
      //       setTimeout(function() {
      //         Dom7('.page').css({'display':'block'})
      //       }, 0)
      //     }
      //   }
      // });

      //device ready here
      console.log(page.name);
      // if (page.name =='setting') {console.log('setting')} else {console.log('unfound')}
      if (
      	isLoggedIn()) {
      	app.loginScreen.close('#my-login-screen'); 
      } else {
      	app.loginScreen.open('#my-login-screen');}
    },
  },
});

// console.log(app.device);

//preAuth
function isLoggedIn() {
  if(store.uid != undefined && store.key != undefined) {
    return true;
  }else{
    return false;
  }
};

var homeView = app.views.create('#view-home', {
  url: '/'
});
$$('#view-home').on('tab:show', function () {
  homeView.router.refreshPage();
  homeView.router.back({
  url: '/', // - in case you use Ajax pages
  // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
  force: true
	});
});

var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});
$$('#view-catalog').on('tab:show', function () {
  catalogView.router.refreshPage();
   // catalogView.router.back({
   //  url: '/', // - in case you use Ajax pages
   //  // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
   //  force: true
   //  });
});

// var settingsView = app.views.create('#view-settings', {
//   url: '/settings/'
// });
// $$('#view-settings').on('tab:show', function () {
//   settingsView.router.refreshPage();
//   $$('.convert-form-to-data').on('click', function(){
//   var formData = app.form.convertToData('#setting-form');
//   app.dialog.alert(JSON.stringify(formData));
//   console.log('xxxxxxx');
//   });
// });

// var itemView = app.views.create('#view-item', {
//   url: '/item/'
// });
// $$('#view-item').on('tab:show', function () {
//   itemView.router.refreshPage();
// });



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  $$('.progressbar-infinite').show();

  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  var formData = app.form.convertToData('#login-form');
  // console.log(formData);

  setTimeout(function () {
    // We got user data from request



	app.request.post('http://khojati.id/titip/api/auth.php', formData, 
		function(response){
	    	$$('.progressbar-infinite').hide();
	        // $$('.progressbar-infinite').hide();
	        // app.dialog.alert(JSON.stringify(response));
	        // console.log(JSON.parse(response));
// 
	        // console.log(formData);
	        // console.log(response);
	        output = JSON.parse(response);
          console.log(output);
	        // console.log(output.data);
	        // console.log(output.user.uid);

	        if(output.status=='success'){
	            // Close login screen
	            app.loginScreen.close('#my-login-screen');
              app.dialog.alert('Selamat Datang '+output.user.firstname, 'Welcome');


	            // Alert username and name
	            // app.dialog.alert('UID: ' + response.uid + '<br>Name: ' + response.firstname);
	            localStorage.uid = username;
	            localStorage.key = password;
	            homeView.router.back({
      				  url: '/', // - in case you use Ajax pages
      				  // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
      				  force: true
      				});

	        }else{
	        	app.dialog.alert('Terjadi kesalahan koneksi atau username dan password salah', 'Error');
	        }
		},
	    function(xhr, status){
	    	$$('.progressbar-infinite').hide();
	    	app.dialog.alert('Error Network', 'Error');
	    	console.log('Error: '+JSON.stringify(xhr));
	    	console.log('ErrorStatus: '+JSON.stringify(status));
	    }
	);},      1000);
});

// Login Screen Demo
$$('.logout-button').on('click', function () {
  setTimeout(function () {
    console.log('logout');
    localStorage.clear();
    app.loginScreen.open('#my-login-screen');
  }, 1000);
});

$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#setting-form');
  app.dialog.alert(JSON.stringify(formData));
  console.log('xxxxxxx');
});

$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});

//searchbar on right panel
// var searchbar = app.searchbar.create({
//   el: '.search-right-panel',
//   searchContainer: '.notfications-list',
//   searchIn: '.item-title',
//   on: {
//     search(sb, query, previousQuery) {
//       console.log(query, previousQuery);
//     }
//   }
// });
// var searchbar = app.searchbar.create({
//   el: '.searchbar',
//   on: {
//     enable(evt) {
//       Dom7('.page').css({'display':'none'})
//       setTimeout(function() {
//         Dom7('.page').css({'display':'block'})
//       }, 0)
//     }
//   }
// });

// var searchbar = app.searchbar.create({
//   el: '.searchbar',
//   searchContainer: '.list',
//   searchIn: '.item-title',
//   on: {
//     search(sb, query, previousQuery) {
//       console.log(query, previousQuery);
//       console.log(sb);
//       console.log('c');

//     }
//   }
// });


// cordova.plugins.barcodeScanner.scan(
//   function (result) {
//     if(!result.cancelled)
//     {
//       alert("Barcode type is: " + result.format);
//       alert("Decoded text is: " + result.text);
//     }
//     else
//     {
//       alert("You have cancelled scan");
//     }
//   },
//   function (error) {
//       alert("Scanning failed: " + error);
//   }
// );



$$('.qrscanner').on('click', function(){

  QRScanner.getStatus(function(status){
    console.log(status);
    // app.dialog.alert(JSON.stringify(status) , 'Status');

    // Create toast with large message
    var toastLargeMessage = app.toast.create({
      text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore. '+JSON.stringify(status)+'.',
      closeTimeout: 2000,
    });

    toastLargeMessage.open();

  });

  // QRScanner.getStatus(function(status){
  //   if(!status.authorized && status.canOpenSettings){
  //     if(confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")){
  //       QRScanner.openSettings();
  //     }
  //   }
  // });

      // QRScanner.prepare(onDone); // show the prompt
 
      // function onDone(err, status){
      //   if (err) {
      //    // here we can handle errors and clean up any loose ends.
      //    console.error(err);
      //   }
      //   if (status.authorized) {
      //     // W00t, you have camera access and the scanner is initialized.
      //     // QRscanner.show() should feel very fast.
      //   } else if (status.denied) {
      //    // The video preview will remain black, and scanning is disabled. We can
      //    // try to ask the user to change their mind, but we'll have to send them
      //    // to their device settings with `QRScanner.openSettings()`.
      //   } else {
      //     // we didn't get permission, but we didn't get permanently denied. (On
      //     // Android, a denial isn't permanent unless the user checks the "Don't
      //     // ask again" box.) We can ask again at the next relevant opportunity.
      //   }
      // }
});




// // Create dynamic Popup
//     var dynamicPopup = app.popup.create({
//       content: '<div class="popup">'+
//                   '<div class="block">'+
//                     '<p>'+JSON.stringify(status)+'.</p>'+
//                     '<p><a href="#" class="link popup-close">Close me</a></p>'+
//                   '</div>'+
//                 '</div>',
//       // Events
//       on: {
//         open: function (popup) {
//           console.log('Popup open');
//         },
//         opened: function (popup) {
//           console.log('Popup opened');
//         },
//       }
//     });
//     // Events also can be assigned on instance later
//     dynamicPopup.on('close', function (popup) {
//       console.log('Popup close');
//     });
//     dynamicPopup.on('closed', function (popup) {
//       console.log('Popup closed');
//     });

//     // Open dynamic popup
//     $$('.dynamic-popup').on('click', function () {
//       dynamicPopup.open();
//     });






