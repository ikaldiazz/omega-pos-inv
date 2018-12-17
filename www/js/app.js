document.addEventListener('deviceready', () => {
  // console.log(this);
  console.log('STARTER====>>Device ready event fired!');
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
    console.log('Connection typeX: ' + JSON.stringify(states));
}

        // console.log(document.addEventListener());

// checkConnection();




// document.addEventListener("offline", onOffline, false);


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

// document.addEventListener("offline", onOffline, false);
// document.addEventListener("online", onOnline, false);


// Dom7
var $$ = Dom7;

// console.log(Framework7.device.os);
// var dvc = JSON.stringify(Framework7.device.os);

var store = localStorage;
var debugMode = true;
var statusQR;
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.mbutgae.omega', // App bundle ID
  name: 'Omega POS Inventory', // App name
  theme: 'auto', // Automatic theme detection
  pushState: true, //backButton
  // App root data
  data: function () {
    return {
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
      qrstatus:{

      },
      cdv:{},
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
      console.log("INIT APP.JS");
      // $$('#notifx').show();
      var networkState = navigator.connection.type;

      var tempcdv;

      document.addEventListener('deviceready', () => {
        console.log(this);
        console.log("DEVICE READY SECOND ON APP.JS");
        // console.log('Device ready event fired!');
         // console.log(cordova); // Undefined
         tempcdv = device;
         // console.log('Connection Error: '+networkState); // Undefined
      });

      this.data.cdv = tempcdv;
      console.log('Status CORDOVA');
      console.log(this.data.cdv);
      console.log(cordova.device);

      document.addEventListener("offline", onOffline, false);
      document.addEventListener("online", onOnline, false);
      document.addEventListener('backbutton', onBackKeyDown, false);

      

      // console.log(navigator.camera);
      // console.log(device.platform);
      var done = function(err){
        if(err){
          console.error(err._message);
          // Create toast with large message
          var toastLargeMessage = app.toast.create({
            text: 'QRScanner is initialized. Status: \n'+JSON.stringify(err,null,2)+'.',
            position: 'bottom',
            closeTimeout: 5000,
          });

          toastLargeMessage.open();

        } else {
          console.log('QRScanner is initialized. Status:');
          
          QRScanner.getStatus(function(status){
            console.log(status);
            statusQR = status;
            // console.log(JSON.stringify(status));
            // app.dialog.alert(JSON.stringify(status) , 'Status');

            // Create toast with large message
            var toastLargeMessage = app.toast.create({
              text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet. \n'+JSON.stringify(status,null,2)+'.',
              position: 'top',
              closeTimeout: 5000,
            });
            console.log(JSON.stringify(status));

            toastLargeMessage.open();


          });
        }
      };
      QRScanner.prepare(done);

      var tempqrstat;

      QRScanner.getStatus(function(status){
        // console.log(status);
        tempqrstat = status;
        // console.log(JSON.stringify(status));
        // app.dialog.alert(JSON.stringify(status) , 'Status');

        // Create toast with large message
        var toastLargeMessage = app.toast.create({
          text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet. \n'+JSON.stringify(status,null,2)+'.',
          position: 'top',
          closeTimeout: 5000,
        });
        // console.log(JSON.stringify(status));

        toastLargeMessage.open();


      });

      // console.log('THIS '+this);
      // console.log(this);
      this.data.qrstatus = tempqrstat;
      console.log('Status QR');
      console.log(this.data.qrstatus);


      // var data = {
      //   // A labels array that can contain any sort of values
      //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      //   // Our series array that contains series objects or in this case series data arrays
      //   series: [
      //     [5, 2, 4, 2, 0]
      //   ]
      // };
      // new Chartist.Line('.ct-chart', data);
      var rSF = function(){ return Math.round(Math.random()*15)};
      new Chartist.Line('.ct-chart', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        series: [
          [rSF(), 9, 7, 8, 5, rSF()],
          [rSF(), 1, 3.5, 7, 3, rSF()],
          [rSF(), 3, 4, 5, 6, rSF()]
        ]
      }, {
        high: 15,
        low: 0,
        showArea: true,
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      });

      // Create a new line chart object where as first parameter we pass in a selector
      // that is resolving to our chart container element. The Second parameter
      // is the actual data object.



      // console.log(tempqrstat);
      // navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });

      // function onSuccess(imageURI) {
      //     var image = document.getElementById('myImage');
      //     image.src = imageURI;
      // }

      // function onFail(message) {
      //     alert('Failed because: ' + message);
      // }
      
      // QRScanner.prepare(onDone); // show the prompt
 
      // function onDone(err, status){
      //   if (err) {
      //    // here we can handle errors and clean up any loose ends.
      //    // console.error(err);
      //    console.error(err.name);
      //    console.log(status);
      //   }
      //   if (status.authorized) {
      //     // W00t, you have camera access and the scanner is initialized.
      //     // QRscanner.show() should feel very fast.
      //   } else if (status.denied) {
      //    // The video preview will remain black, and scanning is disabled. We can
      //    // try to ask the user to change their mind, but we'll have to send them
      //    // to their device settings with `QRScanner.openSettings()`.
      //   } else {
      //     console.log('QRScanner ERROR');
      //     // we didn't get permission, but we didn't get permanently denied. (On
      //     // Android, a denial isn't permanent unless the user checks the "Don't
      //     // ask again" box.) We can ask again at the next relevant opportunity.
      //   }
      // }


      // localStorage.uname = 'aaaa';
      // localStorage.key = 'bbbb';
      // if (isLoggedIn()) {app.loginScreen.open('#my-login-screen');} else {app.loginScreen.open('#my-login-screen');}
      // Init/Create views


    },
    pageInit(page) {
      $$('.progressbar-infinite').hide();
      $$('#notif-progress').show();
      
      // var ctx = document.getElementById("myChart").getContext('2d');
      


      //device ready here
      console.log(page.name);
      // if (page.name =='setting') {console.log('setting')} else {console.log('unfound')}
      if (
      	isLoggedIn()) {
      	app.loginScreen.close('#my-login-screen'); 
      } else {
      	app.loginScreen.open('#my-login-screen');
      }
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

// var catalogView = app.views.create('#view-catalog', {
  // url: '/catalog/'
// });
// $$('#view-catalog').on('tab:show', function () {
  // catalogView.router.refreshPage();
   // catalogView.router.back({
   //  url: '/', // - in case you use Ajax pages
   //  // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
   //  force: true
   //  });
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
          // console.log(output);
	        // console.log(output.data);
	        // console.log(output.user.uid);

	        if(output.status=='success'){


              // Alert username and name
              // app.dialog.alert('UID: ' + response.uid + '<br>Name: ' + response.firstname);
              localStorage.uid = output.data.uid;
              localStorage.key = output.data.key;
              localStorage.user = JSON.stringify(output.user);
	            // Close login screen
	            app.loginScreen.close('#my-login-screen');
              app.dialog.alert('Selamat Datang '+output.user.firstname, 'Welcome');
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


$$('.qrscanner').on('click', function(){
  // console.log(QRScanner);
  // cancelScan: ƒ (callback)
  // destroy: ƒ (callback)
  // disableLight: ƒ (callback)
  // enableLight: ƒ (callback)
  // getStatus: ƒ (callback)
  // hide: ƒ (callback)
  // openSettings: ƒ (callback)
  // pausePreview: ƒ (callback)
  // prepare: ƒ (callback)
  // resumePreview: ƒ (callback)
  // scan: ƒ (callback)
  // show: ƒ (callback)
  // useBackCamera: ƒ (callback)
  // useCamera: ƒ (index, callback)
  // useFrontCamera: ƒ (callback)
  QRScanner.scan(function(err, contents){
    if(err){
      console.log(err);
      console.log(contents);
      // 0 UNEXPECTED_ERROR
      // 1 CAMERA_ACCESS_DENIED
      // 2 CAMERA_ACCESS_RESTRICTED
      // 3 BACK_CAMERA_UNAVAILABLE
      // 4 FRONT_CAMERA_UNAVAILABLE
      // 5 CAMERA_UNAVAILABLE
      // 6 SCAN_CANCELED
      // 7 LIGHT_UNAVAILABLE
      // 8 OPEN_SETTINGS_UNAVAILABLE


      if(err.code ==0) {
        console.error('UNEXPECTED_ERROR');
        var tm = app.toast.create({
          text: 'ERROR QRSCANNER. ',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 1) {
        console.error('CAMERA_ACCESS_DENIED');
        var tm = app.toast.create({
          text: 'Akses kamera ditolak',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 2) {
        console.error('CAMERA_ACCESS_RESTRICTED');
        var tm = app.toast.create({
          text: 'Akses kamera terbatas',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 3) {
        console.error('BACK_CAMERA_UNAVAILABLE');
        var tm = app.toast.create({
          text: 'Kamera(Belakang) tidak tersedia',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 4) {
        console.error('FRONT_CAMERA_UNAVAILABLE');
        var tm = app.toast.create({
          text: 'Kamera(Depan) tidak tersedia',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 5) {
        console.error('CAMERA_UNAVAILABLE');
        var tm = app.toast.create({
          text: 'Kamera tidak tersedia',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 6) {
        console.error('SCAN_CANCELED');
        var tm = app.toast.create({
          text: 'Pemindaian Dibatalkan',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 7) {
        console.error('LIGHT_UNAVAILABLE');
        var tm = app.toast.create({
          text: 'Pencahayaan tidak tersedia',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }if(err.code == 8) {
        console.error('OPEN_SETTINGS_UNAVAILABLE');
        var tm = app.toast.create({
          text: 'Setting QRScanner tidak tersedia',
          position: 'top',
          closeTimeout: 3000,
        });
        tm.open();
      }
      // else {
      //   console.error(err._message);
      //   console.error('KODE ERROR '+err.code);
      //   var tm = app.toast.create({
      //     text: 'QRSCANNER ERROR!!!',
      //     position: 'top',
      //     closeTimeout: 3000,
      //   });
      //   tm.open();
      // }
      
    }
    console.log('Scan returned: ' + contents);
  });


});

function onDeviceReady() {
    document.addEventListener('backbutton', onBackKeyDown, false);
}

function onBackKeyDown() {
    var cpage = mainView.activePage;
    var cpagename = cpage.name;
    console.log(cpagename);
    if (($$('#leftpanel').hasClass('active')) || ($$('#rightpanel').hasClass('active'))) { // #leftpanel and #rightpanel are id of both panels.
        app.closePanel();
        return false;
    } else if ($$('.modal-in').length > 0) {
        app.closeModal();
        return false;
    } else if (cpagename == 'index') {
        app.confirm('Are you sure you want to exit?', function() {
            // var deviceType = device.platform;
            // if(deviceType == 'Android' || deviceType == 'android'){
            navigator.app.exitApp();
            // }
        },
        function() {
        });
    } else {
        mainView.router.back();
    }
}


function onOffline() {
  // Handle the offline event
  console.log('Connection type: OFFLINE');
  toastOffline = app.toast.create({
      text: 'OFFLINE: Tidak Ada Koneksi Internet',
      position: 'top',
      closeTimeout: 4000,
    });
  // Open it
  toastOffline.open();

}

function onOnline() {
  // Handle the offline event
  console.log('Connection type: ONLINE');

  toastOnline = app.toast.create({
      text: 'ONLINE: Koneksi Internet Kembali Aktif',
      position: 'top',
      closeTimeout: 4000,
    });
  // Open it
  toastOnline.open();
}


