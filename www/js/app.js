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
  id: 'com.mbutgae.omega.inv', // App bundle ID
  version: '1.0.19',
  name: 'Omega POS Inventory', // App name
  theme: 'md', // Automatic theme detection
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
    onBackKeyDown: function() {
      var cpage = app.views.main.router.url;
      console.log(cpage);
      var cpagename = cpage.name;
      var cpage = app.views.main.router.url;
      console.log(cpage);
      var leftp = app.panel.left && app.panel.left.opened;
      var rightp = app.panel.right && app.panel.right.opened;
      console.log(leftp);
      console.log(rightp);
      // console.log(cpagename);
      if (leftp || rightp) { // #leftpanel and #rightpanel are id of both panels.
        app.panel.right.close(true);
        app.panel.left.close(true);
        return false;
      } else if (cpage == '/') {
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
      console.log('init()');
      var tempcdv;
      document.addEventListener('deviceready', () => {
        console.log("DEVICE READY SECOND ON APP.JS");
        tempcdv = device;
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        document.addEventListener('backbutton', onBackKeyDown, false);
      });
      this.data.cdv = tempcdv;

      var tempqrstat;
      QRScanner.getStatus(function(status){
        tempqrstat = status;
        var initQRStat = app.toast.create({text: 'QRSCANNER.GETSTATUS. \n'+JSON.stringify(status,null,2)+'.',position: 'bottom',closeTimeout: 8000,});
        initQRStat.open();
      });
      this.data.qrstatus = tempqrstat;

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

    },
    pageInit(page) {
      console.log('pageInit(page)');
      $$('.progressbar-infinite').hide();
      $$('#notif-progress').show();
      
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

        output = JSON.parse(response);

        if(output.status=='success'){

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
      console.error(err._message);
          var errQR = app.toast.create({text: 'QRScanner is Error. Status: \n'+JSON.stringify(err,null,2)+'.', position: 'bottom', closeTimeout: 5000,});
          errQR.open();
        } 
    console.log('QRScanner is initialized. Status:');
    QRScanner.getStatus(function(status){
      statusQR = status;
      var statQR = app.toast.create({text: 'QRScanner Status no Error. \n'+JSON.stringify(status,null,2)+'.', position: 'bottom', closeTimeout: 5000,});
      statQR.open();
    });
  };
      QRScanner.prepare(done);
});

$$('.scan-qr').on('click', function(){
  // QRScanner.getStatus(function(status){
  //   console.log(status.authorized);
  //   if(!status.authorized && status.canOpenSettings){
  //     if(confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")){
  //       QRScanner.openSettings();
  //     }
  //   }
  // });

  QRScanner.show(function(status){
    console.log('QRSCANNER SHOWING...');
    console.log(status);
  });
  
  var callback = function(err, contents){
    if(err){
      console.error(err._message);
    }
    console.log('QRSCANNER SCANNING...');
    app.dialog.alert('The QR Code contains: ' + contents);
  };
   
  QRScanner.scan(callback);



});


$$('.show-qr').on('click', function(){
  QRScanner.show(function(status){
    console.log(status);
  });

  QRScanner.getStatus(function(status){
    console.log(status.authorized);
    if(!status.authorized && status.canOpenSettings){
      if(confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")){
        QRScanner.openSettings();
      }
    }
  });
});




document.addEventListener('deviceready', () => {
  console.log('LATEST====>>Device ready event fired!');
  //  function checkConnection() {
  //   var networkState = navigator.connection.type;
  //   var states = {};
  //   states[Connection.UNKNOWN]  = 'Unknown connection';
  //   states[Connection.ETHERNET] = 'Ethernet connection';
  //   states[Connection.WIFI]     = 'WiFi connection';
  //   states[Connection.CELL_2G]  = 'Cell 2G connection';
  //   states[Connection.CELL_3G]  = 'Cell 3G connection';
  //   states[Connection.CELL_4G]  = 'Cell 4G connection';
  //   states[Connection.CELL]     = 'Cell generic connection';
  //   states[Connection.NONE]     = 'No network connection';
  //   console.log('Connection type: ' + states[networkState]);
  //   console.log('Connection typeX: ' + JSON.stringify(states));
  // }

  document.addEventListener('backbutton', onBackKeyDown, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  console.log(document);
});

function onBackKeyDown() {
  var cpage = app.views.main.router.url;
  // console.log(cpage);
  // console.log(app.page.name);

  // var cpage = homeView.activePage;
  var cpagename = cpage.name;
  // var cpage = app.views.main.router.url;
  // console.log(cpage);
  // app.dialog.alert('Back pressed. \n'+cpage+' . ');

  var leftp = app.panel.left && app.panel.left.opened;
  var rightp = app.panel.right && app.panel.right.opened;
  // console.log(leftp);
  // console.log(rightp);
// console.log(cpagename);
    if (leftp || rightp) { // #leftpanel and #rightpanel are id of both panels.
      app.panel.right.close(true);
      app.panel.left.close(true);

      return false;
    } else if (cpage == '/') {
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



function onOffline() {
  // Handle the offline event
  // console.log('Connection type: OFFLINE');
  toastOffline = app.toast.create({text: 'OFFLINE: Tidak Ada Koneksi Internet',position: 'bottom',closeTimeout: 4000, });
  // Open it
  toastOffline.open();
}

function onOnline() {
  // Handle the offline event
  // console.log('Connection type: ONLINE');
  toastOnline = app.toast.create({text: 'ONLINE: Koneksi Internet Kembali Aktif', position: 'bottom', closeTimeout: 4000,});
  // Open it
  toastOnline.open();
}

function onOffline() {
  // Handle the offline event
  // console.log('Connection type: OFFLINE');
  toastOffline = app.toast.create({text: 'OFFLINE: Tidak Ada Koneksi Internet',position: 'bottom',closeTimeout: 4000, });
  // Open it
  toastOffline.open();
}