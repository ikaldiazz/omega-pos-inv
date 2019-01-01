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
    toastR = app.toast.create({text: 'cpage: '+cpage+' homeView.router: '+homeView.router+' self.views.main.router.url: '+self.views.main.router.url,position: 'bottom', closeTimeout: 5000, });

      toastR.open();

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
      // console.log(act, met, enc);
      if (formData.status[0]=='on') {
        formData.status = 1
      } else {
        formData.status = 0
      }
      // console.log(JSON.stringify(formData));
      console.log(formData);
      // console.log(app.form);
      // return JSON.stringify(formData); 
      return formData; 
    },
}