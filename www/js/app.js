// Dom7
var $$ = Dom7;
// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
  console.log(theme);
}

var store = localStorage;
var debugMode = true;
var statusQR;
// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.mbutgae.omega.inv', // App bundle ID
  version: '1.0.22',
  name: 'Omega POS Inventory', // App name
  theme: theme, // Automatic theme detection
  pushState: true, //backButton
 //  view: {
 //pushStateRoot: ‘/example/’, // if the address like this https://www.example.com/example/ 5
 //  },
  // Enable swipe panel
  panel: {
    // swipe: 'both',
    // swipeCloseOpposite: true,
  },
  navbar: {
    hideOnPageScroll: true,
    iosCenterTitle: false,
  },
  // App root data
  data: dataRoot,
  methods: methods,
  routes: routes,
  on: events,
  touch: {
    // tapHold: true,
    materialRipple:true,
  }
});

var searchbarpanelright = app.searchbar.create({
      el: '.searchbar-panel-r',
      searchContainer: '.search-list-panel-r',
      searchIn: 'li',
      on: {
        enable: function () {
          // console.log('Searchbar enabled');
        },
        search(sb, query, previousQuery) {
        // console.log(query, previousQuery);
        }
      }
    })


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

// var qrView = app.views.create('#view-qr');


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:reinit', '.page[data-name="home"]', function (e) {
// Do something here when page with data-name="about" attribute loaded and initialized
var rSF = function(){ return Math.round(Math.random()*15)};
    new Chartist.Line('.ct-chart', { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], series: [ [rSF(), 9, 7, 8, 5, rSF()], [rSF(), 1, 3.5, 7, 3, rSF()], [rSF(), 3, 4, 5, 6, rSF()]  ]
    }, {high: 15, low: 0, showArea: true, fullWidth: true, chartPadding: { right: 40 } });
})


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

$$('.enc-barcode').on('click', function(){
  cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
      alert("encode success: " + success);
    }, function(fail) {
      alert("encoding failed: " + fail);
    }
  );
 
});

$$('.scan-qr').on('click', function(){
  // console.log(cordova.plugins.barcodeScanner);
  // formats : "QR_CODE,DATA_MATRIX,,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,ITF,PDF_417", // IOS
  // formats : "QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED"  //ANDROID
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        setTimeout(function() {
          resultScan = 'Result: ' + result.text + '\n' +'Format: ' + result.format + '\n' +'Cancelled: ' + result.cancelled;
          toastScan = app.toast.create({text: resultScan, position: 'bottom', closeButton: true,});
          toastScan.open();
        }, 0);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Tempatkan barcode di dalam area", // Android
          resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,DATA_MATRIX,,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,ITF,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          //orientation : "", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: true // iOS and Android
      }
   );

});


$$('.show-qr').on('click', function(){
  // $$('#app').addClass('ra-ketok');
});

$$('.cordova-file').on('click', function(){
	// console.log(JSON.stringify(cordova.file,null,2));
	// filecdv = JSON.stringify(cordova.file,null,2);
	// app.dialog.alert(filecdv);
	// var cdvFileToast = app.toast.create({text: 'CORDOVA.FILE.GETSTATUS. \n'+JSON.stringify(cordova.file,null,2)+'.',position: 'bottom', closeButton: true});
 //  cdvFileToast.open();
});
$$('a.smart-select').on('click', function(){
  app.dialog.alert('SMART SELECT CLICKED!');
});

$$('.change-theme').on('click', function(){
  // app.dialog.alert('change-theme!');
  console.log('change-theme');
  console.log(app);
});

$window = window;
document.addEventListener('deviceready', () => {
  console.log('on document addEventListener(deviceready) =>Device ready event fired!',' LINE:385');
  document.addEventListener('backbutton', onBackKeyDown, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  // console.log(cordova);
  // console.log(navigator);
  var cdvPlugin = app.toast.create({text: 'Plugins: \n'+JSON.stringify($window.cordova.plugins,null,2)+'.', position: 'bottom', closeButton: true});

  if (window.cordova && window.cordova.plugins) {
    console.log('window.cordova.plugins is available');
    // cdvPlugin.open();
  } else {
    console.log('window.cordova.plugins NOT available');
    var noPlugin = app.toast.create({text: 'Plugins: No plugins', position: 'bottom', closeButton: true});
    noPlugin.open();
  }
  
});





function onBackKeyDown() {
  var cpage = app.views.main.router.url;
  var cpagename = cpage.name;
  var leftp = app.panel.left && app.panel.left.opened;
  var rightp = app.panel.right && app.panel.right.opened;
  openedDialog = $$('.dialog.modal-in').length;
  // app.dialog.alert();
   toastR = app.toast.create({text: cpage, position: 'bottom', closeTimeout: 1000, });
    toastR.open();

    console.log('BackPressed');
    console.log(cpage);
    console.log(cpagename);

    if (leftp || rightp) { // #leftpanel and #rightpanel are id of both panels.
      app.panel.right.close(true);
      app.panel.left.close(true);

      return false;
    } else if (cpage == '/' && openedDialog < 1) {
      app.dialog.confirm('Are you sure you want to exit?', 
      	function() {
        // var deviceType = device.platform;
        // if(deviceType == 'Android' || deviceType == 'android'){
          navigator.app.exitApp();
        // }
	    },
	    function() {
	  		homeView.router.refreshPage();
	    });
    } else {
      homeView.router.back();
      homeView.router.refreshPage();
      homeView.router.back({
      // url: '/', // - in case you use Ajax pages
      // pageName: 'homepage_name', // - in case you use Inline Pages or domCache
      force: true
    });
    }

  }



  function onOnline() {
    setTimeout(function() {
    toastOnline = app.toast.create({text: 'ONLINE: Koneksi Internet Kembali Aktif', position: 'bottom', closeTimeout: 1000,});
    toastOnline.open();
    }, 0);
  }

  function onOffline() {
    setTimeout(function() {
    toastOffline = app.toast.create({text: 'OFFLINE: Tidak Ada Koneksi Internet',position: 'bottom', closeTimeout: 1000, });
    toastOffline.open();
    }, 0);
  }


  function onPause() {
    // toastP = app.toast.create({text: 'PAUSE: Aplikasi di Minimize',position: 'bottom', closeTimeout: 1000, });
    // toastP.open();
  }

  function onResume() {
    setTimeout(function() {
      // toastR = app.toast.create({text: 'RESUME: Kembali ke Aplikasi',position: 'bottom', closeTimeout: 1000, });
      // toastR.open();
    }, 0);
  }

  Template7.registerHelper('formatDate', function(date){
    var newDate = date.substr(0,10);
    return newDate;
  });

  Template7.registerHelper('formatRupiah', function(number){
    var   bilangan = number;
        
    var reverse = bilangan.toString().split('').reverse().join(''),
      ribuan  = reverse.match(/\d{1,3}/g);
      ribuan  = ribuan.join('.').split('').reverse().join('');

    // Cetak hasil  
    //document.write(ribuan); // Hasil: 23.456.789

    var newNum = 'Rp '+ribuan;
    return newNum;
  });

  function convertToRupiah(angka){
    var rupiah = '';    
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
      return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
        /**
     * Usage example:
     * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
     */
  }

 
 function convertToAngka(rupiah){
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
  /**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */
}