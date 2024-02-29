#!/bin/bash
swipe_down_count=1
echo "tapping flatlist"
adb shell "input touchscreen tap 150 200"
sleep 2
while :
do
  echo "swipe down $swipe_down_count"
  adb shell "input touchscreen swipe 200 800 200 200 100"
  ((swipe_down_count += 1))
  sleep 0.1
done