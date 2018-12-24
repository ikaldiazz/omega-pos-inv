// Dom7
var $$ = Dom7;


var store = localStorage;
var debugMode = true;
var statusQR;
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.mbutgae.omega.inv', // App bundle ID
  version: '1.0.20',
  name: 'Omega POS Inventory', // App name
  theme: 'auto', // Automatic theme detection
  pushState: true, //backButton
 //  view: {
 //pushStateRoot: ‘/example/’, // if the address like this https://www.example.com/example/ 5
 //  },
  // Enable swipe panel
  panel: {
    // swipe: 'both',
    // swipeCloseOpposite: true,
  },
  // App root data
  data: function () {
    return {
      user: {
        uid : 'mbutgae',
        key :'fjehJHAWU8ArKNwq09nrwqapoaw=masdk*)Asdadaw9a0e',
        mail : 'dev@mbutgae.com',
        created : '2018-04-01',
        status : 'debug',
        level : 'verbose',
        firstName: 'Jariman',
        lastName: 'Tarto',
      },
      qrstatus:{
      },
      cdv:{},
      cdvfile:{},
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
  methods: methods,
  // App routes
  routes: routes,
  on: events,
  // {
  //   init:function() {
  //     console.log('init() Framework7');
  //     // console.log(navigator.camera);
  //     var tempcdv;
  //     window.addEventListener('filePluginIsReady', function(){ console.log('File plugin is ready');}, false);
  //     document.addEventListener('deviceready', () => {
  //       console.log('DEVICE READY SECOND ON APP.JS => on init() Framework7','LINE:120');
  //       tempcdv = device;
  //       document.addEventListener("offline", onOffline, false);
  //       document.addEventListener("online", onOnline, false);
  //       document.addEventListener('backbutton', onBackKeyDown, false);
  //       document.addEventListener("pause", onPause, false);
  //       document.addEventListener("resume", onResume, false);
  //     });
  //     this.data.cdv = tempcdv;


  //     var rSF = function(){ return Math.round(Math.random()*15)};
  //     new Chartist.Line('.ct-chart', {
  //       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //       series: [
  //       [rSF(), 9, 7, 8, 5, rSF()],
  //       [rSF(), 1, 3.5, 7, 3, rSF()],
  //       [rSF(), 3, 4, 5, 6, rSF()]
  //       ]
  //     }, {
  //       high: 15,
  //       low: 0,
  //       showArea: true,
  //       fullWidth: true,
  //       chartPadding: {
  //         right: 40
  //       }
  //     });

  //   },
  //   reInit:function () {
  //     console.log('reinit');
  //   },
  //   pageInit:function(page) {
  //     console.log('pageInit ', page.name);
  //     console.log('pageInit(page)');
  //     $$('.progressbar-infinite').hide();
  //     $$('#notif-progress').show();
      
  //     console.log(page.name);

  //     // if (page.name =='setting') {console.log('setting')} else {console.log('unfound')}
  //     if (isLoggedIn()) {
  //       app.loginScreen.close('#my-login-screen'); 
  //     } else {
  //      app.loginScreen.open('#my-login-screen');
  //    }
  //   },
  //   pageBeforeRemove:function(page) {
  //     console.log('page before remove ', page.name);
  //     // var self = this;
  //     app.toast.destroy();
  //   },
  //   pageMounted: function (page) {
  //     console.log(' page mounted ', page.name);
  //   },
  //   pageBeforeIn: function (page) {
  //     console.log('page before in ', page.name);
  //   },
  //   pageAfterIn: function (page) {
  //     console.log('page after in ', page.name);
  //   },
  //   pageBeforeOut: function (page) {
  //     console.log('page before out ', page.name);
  //   },
  //   pageAfterOut: function (page) {
  //     console.log('page after out ', page.name);
  //   },
  //   pageBeforeUnmount: function (page) {
  //     console.log('page before unmount ', page.name);
  //   },
  //   pageBeforeRemove: function (page) {
  //     console.log('page before remove ', page.name);
  //   },
  // },
});


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



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var networkState = navigator.connection.type;
  if (networkState === Connection.NONE) {
    app.dialog.alert('Tidak ada koneksi', 'OFFLINE');
  }
  $$('.progressbar-infinite').show();
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  var formData = app.form.convertToData('#login-form');
  setTimeout(function () {
    app.request.post('http://khojati.id/titip/api/auth.php', formData, 
      function(response){
        $$('.progressbar-infinite').hide();

        output = JSON.parse(response);

        if(output.status=='success'){

          localStorage.uid = output.data.uid;
          localStorage.key = output.data.key;
          localStorage.user = JSON.stringify(output.user);
          app.loginScreen.close('#my-login-screen');
          app.dialog.alert('Selamat Datang '+output.user.firstname, 'Welcome');
          homeView.router.back({ url: '/',force: true	});

        }else{
          app.dialog.alert('username atau password salah', 'Error Input');
        }
      },
      function(xhr, status){
        $$('.progressbar-infinite').hide();
        app.dialog.alert('Error XHR', 'Error');
        console.error('Error: '+JSON.stringify(xhr));
        console.error('ErrorStatus: '+JSON.stringify(status));
      }
      );
  },      1000);
});

// Login Screen Demo
$$('.logout-button').on('click', function () {
  setTimeout(function () {
    homeView.router.refreshPage();
    homeView.router.back({
      url: '/', // - in case you use Ajax pages
      // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
      force: true
    });
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

$$('.status-qr').on('click', function(){
  var done = function(err){
    if(err){
      app.dialog.alert(JSON.stringify(err,null,2), 'Error QR');
      console.error('ERROR on STATUS QR on CLICK',err._message);
      var errQR = app.toast.create({text: 'QRScanner is Error. Status: \n'+JSON.stringify(err,null,2)+'.', position: 'bottom', closeTimeout: 5000,});
      errQR.open();
      QRScanner.destroy();

    } 
    QRScanner.getStatus(function(status){
      statusQR = status;
      app.dialog.alert(JSON.stringify(status,null,2), 'Status QR');

      var statQR = app.toast.create({text: 'NO Error. \n'+JSON.stringify(status,null,2)+'.', position: 'bottom', closeButton: true});
      statQR.open();
      QRScanner.destroy();

    });
  };
  QRScanner.prepare(done);
});

$$('.scan-qr').on('click', function(){

  // QRScanner.prepare(onDone); // show the toast
  // function onDone(err){
  //   // console.error(err);
  //   if (err) {
  //   // here we can handle errors and clean up any loose ends.
  //   // console.error(err._message);
  //   errTEXT = err.code+' => '+err.name+' => '+err._message;
  //   // console.error(errTEXT);
  //   prepQRErr = app.toast.create({text: errTEXT, position: 'bottom', closeButton: true, closeButtonText: 'Tutup', closeButtonColor: 'red', });
  //   prepQRErr.open();
  //   QRScanner.cancelScan();

  //   }
  //   else{
  //     QRScanner.getStatus(function(status){
  //       // console.log(status);
  //       var prepQRStat = app.toast.create({text: 'QRSCANNER.GETSTATUS. \n'+JSON.stringify(status,null,2)+'.',position: 'bottom', closeButton: true});
  //       prepQRStat.open();

  //     });
  //   }
  //     // console.error('NO ERROR');
  // }

   
  // Make the webview transparent so the video preview is visible behind it. Be sure to make any opaque HTML elements transparent here to avoid covering the video.
  
  var callback = function(err, contents){
    console.log('QRSCANNER SCANNING... on callback');
    if(err){console.error(err._message);}
    $$('#app').addClass('ketok');
    $$('#my-popup').addClass('ketok');
    $$('#my-login-screen').addClass('ketok');
    app.dialog.alert('The QR Code contains: ' + contents);

    QRScanner.hide(function(status){
      console.log('QRSCANNER HIDING...');
      $$('#app').removeClass('ra-ketok');
      $$('#my-popup').removeClass('ra-ketok');
      $$('#my-login-screen').removeClass('ra-ketok');
      QRScanner.cancelScan();
    });

  };
   
  QRScanner.scan(callback);

  
  QRScanner.show(function(status){
    console.log('QRSCANNER SHOWING...');
    $$('#app').removeClass('ketok');
    $$('#my-popup').removeClass('ketok');
    $$('#my-login-screen').removeClass('ketok');

    $$('#app').addClass('ra-ketok');
    $$('#my-popup').addClass('ra-ketok');
    $$('#my-login-screen').addClass('ra-ketok');
    console.log('QRSCANNER SCANNING...on SHOW METHOD');
    QRScanner.scan(callback);


    console.log(status);
  });

});


$$('.show-qr').on('click', function(){
  $$('#app').addClass('ra-ketok');
  QRScanner.show(function(status){
    console.log(status);
    app.dialog.alert('SHOW QR: ' + status);
    $$('#app').addClass('ketok');
  });
});

$$('.cordova-file').on('click', function(){
	console.log(JSON.stringify(cordova.file,null,2));
	filecdv = JSON.stringify(cordova.file,null,2);
	app.dialog.alert(filecdv);
	var cdvFileToast = app.toast.create({text: 'CORDOVA.FILE.GETSTATUS. \n'+JSON.stringify(cordova.file,null,2)+'.',position: 'bottom', closeButton: true});
  cdvFileToast.open();
});


document.addEventListener('deviceready', () => {
  console.log('on document addEventListener(deviceready) =>Device ready event fired!',' LINE:385');
  document.addEventListener('backbutton', onBackKeyDown, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
});





function onBackKeyDown() {
  var cpage = app.views.main.router.url;
  var cpagename = cpage.name;
  var leftp = app.panel.left && app.panel.left.opened;
  var rightp = app.panel.right && app.panel.right.opened;
  openedDialog = $$('.dialog.modal-in').length;

    if (leftp || rightp) { // #leftpanel and #rightpanel are id of both panels.
      app.panel.right.close(true);
      app.panel.left.close(true);

      return false;
    } else if (cpage == '/' && openedDialog < 1) {
      app.dialog.confirm('Are you sure you want to exit?', function() {
            // var deviceType = device.platform;
            // if(deviceType == 'Android' || deviceType == 'android'){
              navigator.app.exitApp();
            // }
          },
          function() {
          });
    } else {
      homeView.router.back();
      homeView.router.refreshPage();
      homeView.router.back({
      url: '/', // - in case you use Ajax pages
      // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
      force: true
    });
    }

  }



  function onOnline() {
    toastOnline = app.toast.create({text: 'ONLINE: Koneksi Internet Kembali Aktif', position: 'bottom', closeTimeout: 1000,});
    toastOnline.open();
  }

  function onOffline() {
    toastOffline = app.toast.create({text: 'OFFLINE: Tidak Ada Koneksi Internet',position: 'bottom', closeTimeout: 1000, });
    toastOffline.open();
  }


  function onPause() {
    toastP = app.toast.create({text: 'PAUSE: Aplikasi di Minimize',position: 'bottom', closeTimeout: 1000, });
    toastP.open();
    // QRScanner.destroy(function(status){
    //   console.log(status);
    // });
  }

  function onResume() {
    setTimeout(function() {
      toastR = app.toast.create({text: 'RESUME: Kembali ke Aplikasi',position: 'bottom', closeTimeout: 1000, });
      toastR.open();
    }, 0);
  }

  Template7.registerHelper('formatDate', function(date){
    var newDate = date.substr(0,10);
    return newDate;
  });