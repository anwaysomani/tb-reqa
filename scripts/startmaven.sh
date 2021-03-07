#!/bin/bash

cd $1
git fetch origin
git checkout $2
git pull origin $2
del src\main]resources\config.properties
mvn clean package -DskipTests
cd $1\target
copy /y $3 $4\webapps
cd $1
git checkout .
