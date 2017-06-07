# Project Title

This is a simple jQuery plugin to add inactivity timer to C# MVC (or .Net Core) websites which logs the user out after specified time.

## Getting Started

If you have an MVC website and would like your users to be logged out after certain period of inactivity this library is for you. Easy to configure and really simple.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

Download the source and add it to your project.
Either add the files to your bundles or include the files straight into your views.
Best place is to include this script is in _layout.cshtml

## Built With

* [jQuery](http://www.dropwizard.io/1.0.2/docs/) - Widely used javascript library 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Options
The plugin comes with a few options. Most of the options have default values.

```javascript
var defaults = {
            'stayButtonText': "Stay logged in",
            'leaveButtonText': "Log out",
            'title': "Session timeout", // Optional, the title of the warning popup.
            'message': "You have been inactive for {timeout}. You will be logged out in {timeleft}.", // Optional, text shown in the warning popup box
            'timeout': 300, // Optional, time in seconds until the warning box is shown (default 300 = 5 minutes)
            'showWarningBoxFor': 30, // Optional, time in seconds until the user is logged out once the warning pop up is shown (default 30 seconds)
            'debug': false, // Optional, used to print out debuging messages to the console
            'logoutFormId': '',
            'logoutUrl': '',
            'enableProgressBar': false,
            'method': 'POST'
        };
```

### Breakdown
```stayButtonText: (Optional) (default = "Stay logged in")```
Text displayed on the 'Stay logged in' button.
 
 ```leaveButtonText: (Optional) (default = "Log out")```
Text displayed on the 'Log out' button.
 
 ```title: (Optional) (default = "")```
Title of the warning popup.
 
 ```message: (Optional) (default = "You have been inactive for {timeout}. You will be logged out in {timeleft}.")```
Text shown in the warning popup box. You can use {timeout} to get the inactivity time displayed and {timeleft} to display time left unti the warning box will log the user out.
 
 ```timeout: (Optional) (default = "300" (seconds))```
 Time in seconds until the warning box is shown
 
 ```showWarningBoxFor: (Optional) (default = "30" (seconds))```
Time in seconds until the user is logged out once the warning pop up is shown

```debug (Optional) (default = "false")```
Used to print out debuging messages to the console

```logoutFormId (Required if method = "POST") (default = "")```
The ID of the form that is used to logout the user. This for will be submited by the plugin to log the user out.

```logoutUrl (Required if method = "GET") (default = "")```
The URL where to redirect the user to log him out. 

```enableProgressBar (Optional) (default = "false")```
Boolean value to either enabled or disable the progress bar at the bottom of the screen.

```method (Optional) (default = "POST")```
Method for logging user out. If POST then you need to provide the form id so the code could submit it. If GET please provide logoutUrl (example: /Account/LogOut)
