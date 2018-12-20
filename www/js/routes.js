routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/catalog/',
    componentUrl: './pages/catalog.html',
  },
  {
    path: '/item/',
    async(to, from, resolve, reject) {
      
      // data= {};
      app.request( {
        url: 'http://khojati.id/titip/api/v2/api.php/records/items/',
        statusCode: {
          404: function(xhr) {
            console.log(xhr,'page not found');
          }
        },
        dataType: 'json',
        // data: data,
        method: "GET",
        crossDomain: true,
        beforeCreate: function(e){console.log('beforeCreate',e);},
        beforeOpen:  function(xhr, e){console.log('beforeOpen', xhr, e);},
        beforeSend: function (xhr){console.log('beforeSend', xhr);},
        complete: function(e) {
          // console.log(e);
          console.log('complete');
        },
        success: function(response) {
          console.log('success');
          console.log(response);
          resolve(
          {
            componentUrl: './pages/item.html',
          },
          {
            context: {
              users: response,
              products: response.records,
            },
          }
          );
        },
        error: function(e) {
          // console.log(e);
          console.log('error',e);
        }
      });
    },
    
    on: {
      pageAfterIn: function test (e, page) {
        //
        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          backdrop:false,
          on: {
            search(sb, query, previousQuery) {
              console.log(query, previousQuery);
            }
          }
        });
      },
      pageInit: function (e, page) {
        // do something when page initialized
        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
            search(sb, query, previousQuery) {
              console.log(query, previousQuery);
            }
          }
        });

        $$('.qrscanner').on('click', function(){

          QRScanner.getStatus(function(status){
            console.log(status);
            app.dialog.alert(JSON.stringify(status) , 'Status');

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


      },
      
    }
  },
  {
    path: '/product/:id/',
    async(routeTo, from, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var productId = routeTo.params.id;
      // data= {};
      app.request( {
        url: 'http://khojati.id/titip/api/v2/api.php/records/items/'+productId,
        dataType: 'json',
        // data: data,
        method: "GET",
        crossDomain: true,
        statusCode: {
          404: function(xhr) {
            console.log('page not found');
          }
        },
        complete: function() {
          // Hide Preloader
          app.preloader.hide();
          console.log('complete');
        },
        success: function(response) {
          console.log('success');
          console.log(response);
          resolve(
          {
            componentUrl: './pages/product.html',
          },
          {
            context: {
              product: response,
              // product: response.records,
            },
          }
          );
        },
        error: function() {
          console.log('error');
        }
      });
    },
    on: {
      pageAfterIn: function test (e, page) {
        
      },
      pageInit: function (e, page) {
        
      },
    }
  },
  {
    path: '/settings/',
    componentUrl: './pages/settings.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '/sales/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        // var temp;
        // function reqData(x) {
        //   return x;
        // }

        app.request({
          url: 'http://khojati.id/titip/api/v2/api.php/records/items/',
          dataType: 'json',
          // data: data,
          method: "GET",
          crossDomain: true,
          statusCode: {
            404: function(xhr) {
              console.log('page not found');
            }
          },
          complete: function() {
            // Hide Preloader
            // app.preloader.hide();
            console.log('complete');
          },
          success: function(response) {
            console.log('success');
            console.log(response);
            // Hide Preloader
            app.preloader.hide();
            console.log('TEMP');

            console.log(response)

            // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/sales.html',
              },
              {
                context: {
                  sales: response.records,
                }
              }
            );
          },
          error: function() {
            console.log('error');
          }
        });

      }, 1000);
    },

    on: {
      pageAfterIn: function test (e, page) {
        // do something after page gets into the view
        console.log(page.name);
        // app.view.current.router.refreshPage();
        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          backdrop:false,
          on: {
            search(sb, query, previousQuery) {
              console.log(query, previousQuery);
            }
          }
        });
      },
      pageInit: function (e, page) {
        // do something when page initialized
        console.log('b');
              console.log(navigator);
      console.log(device.platform);
        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
            search(sb, query, previousQuery) {
              console.log(query, previousQuery);
            }
          }
        });
      },
      
    }
    // ignoreCache: true,
  },
  {
    path: '/form/edit/:itemId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // console.log("USER: "+JSON.stringify(localStorage.user));
      // Router instance
      var router = this;
      // App instance
      var app = router.app;
      // Show Preloader
      app.preloader.show();
      // User ID from request
      var itemId = routeTo.params.itemId;
      // Show Preloader
      app.preloader.show();
      // Item ID from request
      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        app.request({
          url: 'http://khojati.id/titip/api/v2/api.php/records/items/'+itemId,
          dataType: 'json',
          // data: data,
          method: "GET",
          crossDomain: true,
          statusCode: {
            404: function(xhr) {
              console.log('page not found');
            }
          },
          complete: function() {
            // Hide Preloader
            app.preloader.hide();
            console.log('complete');
          },
          success: function(response) {
            console.log('success get item');
            console.log(response.records);
            console.log(response);
            // Hide Preloader
            app.preloader.hide();
            // console.log('TEMP');

            // console.log("routes User: "+localStorage.user);

            // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/form.html',
              },
              {
                context: {
                  item: response,
                }
              }
            );
          },
          error: function() {
            console.log('error');
            app.preloader.hide();

          }
        });

      }, 500);
    },

    on: {
      pageAfterIn: function test (e, page) {
        // do something after page gets into the view
        console.log(page.name);
        // app.view.current.router.refreshPage();
      },
      pageInit: function (e, page) {
        // do something when page initialized
      },
      
    }
    // ignoreCache: true,
  },
  {
    path: '/cordova/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;
      app.preloader.show();
      var itemId = routeTo.params.itemId;
      console.log(app.data);
      setTimeout(function () {
        app.preloader.hide();
        resolve(
        {
          componentUrl: './pages/cordova-status.html',
        },
        {
          context: {
            cdv: app.data.cdv,
          }
        }
        );
      }, 500);
    }
  },
  {
    path: '/qr/',
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;

      var app = router.app;
      app.preloader.show();
      var itemId = routeTo.params.itemId;
      console.log(app.data);
      setTimeout(function () {
        app.preloader.hide();
        resolve(
        {
          componentUrl: './pages/qr-status.html',
        },
        {
          context: {
            qr: app.data.qrstatus,
          }
        }
        );
      }, 500);
    }
  },

  {
    path: '/config/',
    async: function (routeTo, routeFrom, resolve, reject) {
      console.log("UID: "+localStorage.uid);
      console.log("KEY: "+localStorage.key);
      console.log("USER: "+localStorage.user);
      // console.log("USER: "+JSON.stringify(localStorage.user));

      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        app.request({
          url: 'http://khojati.id/titip/api/v2/api.php/records/items/',
          dataType: 'json',
          // data: data,
          method: "GET",
          crossDomain: true,
          statusCode: {
            404: function(xhr) {
              console.log('page not found');
            }
          },
          complete: function() {
            // Hide Preloader
            // app.preloader.hide();
            console.log('complete');
          },
          success: function(response) {
            console.log('success');
            console.log(response);
            // Hide Preloader
            app.preloader.hide();
            console.log('TEMP');

            console.log("routes User: "+localStorage.user)

            // Resolve route to load page
            resolve(
              {
                componentUrl: './pages/config.html',
              },
              {
                context: {
                  user: localStorage.user,
                }
              }
            );
          },
          error: function() {
            console.log('error');
          }
        });

      }, 1000);
    },

    on: {
      pageAfterIn: function test (e, page) {
        // do something after page gets into the view
        console.log(page.name);
        // app.view.current.router.refreshPage();
      },
      pageInit: function (e, page) {
        // do something when page initialized
      },
      
    }
    // ignoreCache: true,
  },
  {
    path: '/swipe/',
    componentUrl: './pages/search-swipe.html',
  },
  {
    path: '/vilist/',
    componentUrl: './pages/virtual-list.html',
  },
  {
    path: '/vilistvdom/',
    componentUrl: './pages/virtual-list-vdom.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
