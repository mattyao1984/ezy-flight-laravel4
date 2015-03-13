# README #

Welcome to Ezy Flight App!

### Demo Link ###
To see how it works, please check this [Demo Link](http://ezy-flight-app.herokuapp.com/).

### How to install? ###
- git clone repo: https://github.com/mattyao1984/ezy-flight-app.git 
- Install composer. Download from [here](https://getcomposer.org/download/)
- Run 'composer install'
- Run 'composer update'
- Create local mysql database. Go to /app/config/database.php and modify the db settings.
- Run 'php artisan migrate:install'
- Run 'php artisan migrate'
- Run 'php artisan migrate --package=cartalyst/sentry'
- Run 'php artisan config:publish cartalyst/sentry'
- Run 'php artisan db:seed'
- Run 'php artisan serve'
- Open your web browser and type "localhost:8000" to view the home page

### How to use it? ###
- Login with your account. If you don't know the access, please contact Matt Yao (mattyao1984@gmail.com) to get access.
- You can add new booking by clicking the button at the right bottom.
- You can view all your bookings once you have login.
- You can edit bookings.
- You can remove the booking.

### How to test? ###
This app is tested with Karma which makes the test process eaiser than ever before.
Just run 'grunt test --repoters' to test the app. Test result can be view under '/test/units.html'.

### Some notes: ###
- I adjusted the width of the container to 940px which gives more room for pages.
- Missing hover status for buttons. I make slightly change of the color when you hover.
- I implemented Fontawesome library for icons and assets such as username/password icons, refresh button etc. Fontawesome is easier to use and you will not have icons blurred when you resize them. However, the icons may look a bit different from the design.
- Missing "Log Out" button function. I have added it to the top navigation.
- For better user experience, I change the remove-booking-btn background color. So the customer can still see the information underneath.
- Added confirm message before you delete a booking.
- Added data loader feature for booking data init. It can also be trigger by clicking 'Sync' button. The loader assets is from: http://preloaders.net/en/letters_numbers_words
- Added date/time picker when adding new bookings. The source code is from: http://amsul.ca/pickadate.js/date/
- Added page protection feature. You need to login first and check your bookings.
- Site is responsive. But not pixel-perfect.
- Added search and sorting functions.

### I have some questions ###
Please contact Matt Yao via email mattyao1984@gmail.com

#### Matt Yao @ 2015.03 ####