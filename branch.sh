#!/bin/bash

cd $1
echo $(git branch --format='%(color:bold green) %(refname:short)' --sort=-committerdate)
