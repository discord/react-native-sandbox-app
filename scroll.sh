#!/bin/bash
while :
do
  echo "swipe down 1"
  adb shell "input touchscreen swipe 200 800 200 200 30"
  sleep 2
  echo "swipe down 2"
  adb shell "input touchscreen swipe 200 800 200 200 30"
  sleep 2
  echo "swipe up 1"
  adb shell "input touchscreen swipe 200 200 200 800 30"
  sleep 2
  echo "swipe up 2"
  adb shell "input touchscreen swipe 200 200 200 800 30"
  sleep 2
done