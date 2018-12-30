methods = {
  helloWorld: function () {
    app.dialog.alert('Hello World!');
  },
  onBackKeyDown: function() {
    var self = this;

    // var cpage = app.views.main.router.url;
    var cpage = self.views.main.router.url;
    // console.log(cpage);
    var cpagename = cpage.name;
    // console.log(cpage);
    var leftp = app.panel.left && app.panel.left.opened;
    var rightp = app.panel.right && app.panel.right.opened;
    console.log('BackPressed');
    // console.log(self.views.main.router.url);
    // console.log(homeView.router);


    // QRScanner.getStatus(function(status){
    //   statusQR = status;
    //   app.dialog.alert(JSON.stringify(status,null,2), 'Status QR');

    //   var statQR = app.toast.create({text: 'NO Error. \n'+JSON.stringify(status,null,2)+'.', position: 'bottom', closeButton: true});
    //   statQR.open();
    //   QRScanner.destroy();

    // });

    // console.log(this);



    // console.log(leftp);
    // console.log(rightp);
      // console.log(cpagename);
      if (leftp || rightp) { // #leftpanel and #rightpanel are id of both panels.
        app.panel.right.close(true);
        app.panel.left.close(true);
        return false;
      } else if (cpage == '/' ) {
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
        // homeView.router.refreshPage();
        // homeView.router.back({
        // url: '/', // - in case you use Ajax pages
        // //pageName: 'home', // - in case you use Inline Pages or domCache
        // force: true
        // });
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
  scanProdukQR: function (form) {
      var callback = function(err, contents){
      console.log('QRSCANNER SCANNING... on callback');
      if(err){console.error(err._message);}
      $$('#app').addClass('ketok');
      $$('#my-popup').addClass('ketok');
      $$('#my-login-screen').addClass('ketok');
      app.dialog.alert('The QR Code contains: ' + contents);

      QRScanner.hide(function(status){
        QRScanner.cancelScan();
        console.log('QRSCANNER HIDING...');
        if($$('#app').hasClass('ra-ketok')||$$('#my-popup').hasClass('ra-ketok')||$$('#my-login-screen').hasClass('ra-ketok')){
        
        $$('#app').removeClass('ra-ketok');
        $$('#my-popup').removeClass('ra-ketok');
        $$('#my-login-screen').removeClass('ra-ketok');
        }
        
      });

      };
       
      QRScanner.scan(callback);

      
      QRScanner.show(function(status){
        console.log('QRSCANNER SHOWING...');
        if($$('#app').hasClass('ketok')||$$('#my-popup').hasClass('ketok')||$$('#my-login-screen').hasClass('ketok')){
          $$('#app').removeClass('ketok');
          $$('#my-popup').removeClass('ketok');
          $$('#my-login-screen').removeClass('ketok');
        }
        // if($$('#app').hasClass('ketok')){$$('#app').removeClass('ketok');}
        // if($$('#my-popup').hasClass('ketok')){$$('#my-popup').removeClass('ketok');}
        // if($$('#my-login-screen').hasClass('ketok')){$$('#my-login-screen').removeClass('ketok');}
        

        $$('#app').addClass('ra-ketok');
        $$('#my-popup').addClass('ra-ketok');
        $$('#my-login-screen').addClass('ra-ketok');
        console.log('QRSCANNER SCANNING...on SHOW METHOD');
        QRScanner.scan(callback);


        console.log(status);
      });  
    },
}