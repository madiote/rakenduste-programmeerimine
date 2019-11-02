@ECHO OFF
PowerShell.exe -executionpolicy remotesigned -Command "& '%~dpn0.ps1'"
PAUSE
taskkill /im PowerShell.exe