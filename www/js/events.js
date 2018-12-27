events = 
{
  init() {
    console.log('init() Framework7');
    var tempcdv;
    var tempcdvfile;
    document.addEventListener('deviceready', () => {
      // console.log('DEVICE READY SECOND ON APP.JS => on init() Framework7','LINE:120');
      tempcdv = device;
      document.addEventListener("offline", onOffline, false);
      document.addEventListener("online", onOnline, false);
      document.addEventListener('backbutton', onBackKeyDown, false);
      document.addEventListener("pause", onPause, false);
      document.addEventListener("resume", onResume, false);
      window.addEventListener('filePluginIsReady', function(){ 
        // console.log('File plugin is ready');
      }, false);
      
    });

    tempcdvfile = cordova.file;
    this.data.cdvfile = tempcdvfile;
    this.data.cdv = tempcdv;


    var rSF = function(){ return Math.round(Math.random()*15)};
    new Chartist.Line('.ct-chart', { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], series: [ [rSF(), 9, 7, 8, 5, rSF()], [rSF(), 1, 3.5, 7, 3, rSF()], [rSF(), 3, 4, 5, 6, rSF()]  ]
    }, {high: 15, low: 0, showArea: true, fullWidth: true, chartPadding: { right: 40 } });

  },
  pageInit(page) {
    console.log('pageInit(page)');
    $$('.progressbar-infinite').hide();
    $$('#notif-progress').show();

    // console.log(page.name);

    if (isLoggedIn()) {
       app.loginScreen.close('#my-login-screen'); 
     } else {
       app.loginScreen.open('#my-login-screen');
     }
  },
  pageBeforeRemove:function(page) {
    // console.log('page before remove ', page.name);
    // var self = this;
    app.toast.destroy();
  },
  pageMounted: function (page) {
    // console.log(' page mounted ', page.name);
  },
  pageBeforeIn: function (page) {
    // console.log('page before in ', page.name);
  },
  pageAfterIn: function (page) {
    // console.log('page after in ', page.name);
  },
  pageBeforeOut: function (page) {
    // console.log('page before out ', page.name);
  },
  pageAfterOut: function (page) {
    // console.log('page after out ', page.name);
  },
  pageBeforeUnmount: function (page) {
    // console.log('page before unmount ', page.name);
  },
  pageBeforeRemove: function (page) {
    // console.log('page before remove ', page.name);
  }, 
}