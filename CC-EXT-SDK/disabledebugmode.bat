@echo off
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.10 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.9 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v PlayerDebugMode
reg query HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v PlayerDebugMode
if %errorlevel%==1 GOTO INSTALL
:INSTALL
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.10 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.9 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.7 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.6 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.5 /v PlayerDebugMode /t REG_SZ /d 0
reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.4 /v PlayerDebugMode /t REG_SZ /d 0