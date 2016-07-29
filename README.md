# Setup:

## If you dont have ruby:
1. `brew install gpg` (checks security of rvm)
2. `gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3`
3. `\curl -sSL https://get.rvm.io | bash`
4. `rvm install ruby-2.0.0-p481`
5. `gem install bundler`


## Once you have ruby:
1. `bundle install`
2. `rake db:migrate`
3. `rails s`
4. open localhost:3000/ in browser



## Tech:

* Ruby 2.0.0-p481

* Rails 4.2.4

* React-Rails

* Bootstrap-Sass

* MomentJS-Rails
