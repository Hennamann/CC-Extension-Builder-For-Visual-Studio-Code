#!/bin/bash
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.10.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.9.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.8.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.7.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.6.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.5.plist
/usr/libexec/PlistBuddy -c "Add:PlayerDebugMode string 1" ~/Library/Preferences/com.adobe.CSXS.4.plist
#must kill cfprefsd to take effect
killall "cfprefsd"
