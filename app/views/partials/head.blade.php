<meta charset="utf-8">
<title>Ezy Flight</title>
<meta name="description" content="This is Ezy Flight System - For B2Cloud only.">
<meta name="viewport" content="width=device-width">
<meta name=apple-mobile-web-app-capable content=yes>
<meta name=apple-mobile-web-app-status-bar-style content=black>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="author" content="Matt Yao 2015.03">
<link rel="shortcut icon" href="favicon.ico" type="image">
<link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700' rel='stylesheet' type='text/css'>

<!-- CSS -->
{{ HTML::style('css/bootstrap.min.css') }}
{{ HTML::style('css/bootstrap-theme.min.css') }}
{{ HTML::style('css/font-awesome/css/font-awesome.css') }}
{{ HTML::style('js/lib/angular-native-picker/build/themes/default.css') }}
{{ HTML::style('js/lib/angular-native-picker/build/themes/default.date.css') }}
{{ HTML::style('js/lib/angular-native-picker/build/themes/default.time.css') }}
{{ HTML::style('css/style.css') }}

@yield('styles')

<!-- JS -->
{{HTML::script('js/lib/jquery-1.10.2.min.js')}}
{{HTML::script('js/lib/jquery-migrate-1.2.1.min.js')}}
{{HTML::script('js/lib/angular.js')}}
{{HTML::script('js/lib/angular-animate.min.js')}}
{{HTML::script('js/lib/angular-route.min.js')}}
{{HTML::script('js/lib/angular-sanitize.min.js')}}
{{HTML::script('js/lib/angular-resource.min.js')}}
{{HTML::script('js/lib/bootstrap.min.js')}}
{{HTML::script('js/lib/underscore.js')}}
{{HTML::script('js/lib/moment.js')}}
{{HTML::script('js/lib/angular-native-picker/build/angular-datepicker.js')}}
{{HTML::script('js/controllers/homeController.js')}}
{{HTML::script('js/controllers/bookingsController.js')}}
{{HTML::script('js/directives/directives.js')}}
{{HTML::script('js/services/dataService.js')}}
{{HTML::script('js/services/authService.js')}}
{{HTML::script('js/app.js')}}