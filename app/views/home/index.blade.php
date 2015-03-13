@extends('layouts.default')

@section('content')
<div class="page home" ng-controller="homeController">
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="login-form">
          <img src="/images/home-logo.png" class="home-logo">
          <form>
            <div class="form-group">
              <div class="text-wrap">
                <i class="fa fa-user"></i>
                <input type="text" class="form-control" placeholder="Username" ng-model="username" autofocus>
              </div>
            </div>
            <div class="form-group">
              <div class="text-wrap">
                <i class="fa fa-lock"></i>
                <input type="password" class="form-control" placeholder="Passwrod" ng-model="password">
              </div>
            </div>
            <button class="btn btn-primary" ng-click="login()">Sign In</button>
          </form>
          <p class="error login-error" ng-show="errorMessage !== ''">%% errorMessage %%</p>
          <div class="loader-wrap" ng-show="dataLoading">
            <img src="/images/loader.gif">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@stop