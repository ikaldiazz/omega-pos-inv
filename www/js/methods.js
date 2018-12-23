methods = {
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
  }