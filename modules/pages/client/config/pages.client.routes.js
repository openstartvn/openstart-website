(function () {
  'use strict';

  angular
    .module('pages.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view/>'
      })
      .state('pages.list', {
        url: '',
        templateUrl: '/modules/pages/client/views/list-pages.client.view.html',
        controller: 'PagesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Pages List'
        }
      })
      .state('pages.view', {
        url: '/:pageId',
        templateUrl: '/modules/pages/client/views/view-page.client.view.html',
        controller: 'PagesController',
        controllerAs: 'vm',
        resolve: {
          pageResolve: getPage
        },
        data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      });
  }

  getPage.$inject = ['$stateParams', 'PagesService'];

  function getPage($stateParams, PagesService) {
    return PagesService.get({
      pageId: $stateParams.pageId
    }).$promise;
  }
}());
