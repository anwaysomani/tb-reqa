#!/bin/bash

cd $1
git fetch origin
git checkout $2
git pull origin $2
cd src
del config.js
rename prod_config.js config.js
cd $1
call gulp clean
call gulp build
cd $1\target
copy /y $3.war $4\webapps
cd $1
git checkout .
call gulp clean
