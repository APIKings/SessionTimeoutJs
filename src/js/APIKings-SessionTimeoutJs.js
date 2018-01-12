(function ($) {

    $.fn.SessionTimeout = function (options) {
        var self = this;

        self.Debug = function (message) {
            if (options.debug) {
                console.log("APIKings-st DEBUG: " + message);
            }
        }

        self.Debug("Initializing API");

        var defaults = {
            // Default values
            'stayButtonText': "Stay logged in",
            'leaveButtonText': "Log out",
            'title': "Session timeout",
            'message': "You have been inactive for {timeout}. You will be logged out in {timeleft}.",
            'timeout': 300, // 5 minutes
            'showWarningBoxFor': 30, // 30 seconds
            'debug': false,
            'logoutFormId': '',
            'logoutUrl': '',
            'enableProgressBar': false,
            'method': 'POST'
        };

        options = $.extend(defaults, options);
        options.method = options.method.toUpperCase();
        options.message = options.message.replace("{timeleft}", "<span id='APIKings-st-timeleft'></span>");
        options.message = options.message.replace("{timeout}", "<span id='APIKings-st-timeout'></span>");

        $("#APIKings-st-timeout").each(function () {
            $(this).html(self.GetFormatedTime(options.timeout)); // Display coutdown in warning modal
        });


        // Make sure the logoutForm option is set
        

        if (options.method != "POST" && options.method != "GET") {
            console.log("APIKings-ST  WARNING: Unrecognised method: " + options.method);
            console.log("Accepted methods: GET or POST");
            return;
        }

        if (options.method == "POST") {
            if (options.logoutFormId == '') {
                console.log("APIKings-ST  WARNING: You need to provide your logout form id for SessionTimeout to work!");
                return;
            }
        }

        if (options.method == "GET") {
            if (options.logoutUrl == '') {
                console.log("APIKings-ST  WARNING: You need to provide your logout url for SessionTimeout to work!");
                return;
            }
        }


        // Private variables
        var ticks = 0;
        var tick;

        // HTML structures
        var overlay = "<div class='APIKings-st-overlay' id='APIKings-st-overlay'></div>";
        var confirmModal = "<div class='APIKings-st-modal-container' id='APIKings-st-modal'>"
            + "<div class='APIKings-st-modal'>"
            + "<div class='heading'>" + options.title + "</div>"
            + "<div class='body'>" + options.message + "</div>"
            + "<div class='footer'>"
            + "<button class='stay' id='APIKings-st-stay-button'>" + options.stayButtonText + "</button>"
            + "<button class='leave' id='APIKings-st-leave-button'>" + options.leaveButtonText + "</button>"
            + "</div>"
            + "</div>"
            + "</div>";
        var progressBar = "<div id='APIKings-st-progress-bar-container'>"
            + "<div id='APIKings-st-progress-bar'></div>"
            + "</div>";


        self.before(overlay);
        self.html(confirmModal);
        if (options.enableProgressBar) {
            self.after(progressBar);
        }


        // CORE
        self.StartSessionTimer = function () {

            self.Debug("Tick called");
            ticks++;
            self.Debug("Ticks: " + ticks);

            var countdown = (options.timeout + options.showWarningBoxFor) - ticks;
            $("#APIKings-st-timeleft").each(function () {
                $(this).html(self.GetFormatedTime(countdown)); // Display countdown in warning modal
            });
            $("#APIKings-st-timeout").each(function () {
                $(this).html(self.GetFormatedTime(options.timeout)); // Display coutdown in warning modal
            });

            if (options.enableProgressBar) {
                var percentage = 100 - (ticks / options.timeout * 100); // Calculate percentage for progress bar
                $("#APIKings-st-progress-bar").css('width', percentage + '%'); // Set percentage for the progressbar
            }

            // Show warning box
            if (ticks === options.timeout) {
                self.ShowModal();
            }

            //Log out if session not extended
            if (ticks === (options.timeout + options.showWarningBoxFor)) {
                clearTimeout(tick);
                self.Logout();
                return;
            }
            tick = setTimeout(self.StartSessionTimer, 1000); // Call itself in 1 second
        }


        self.GetFormatedTime = function (seconds) {
            var sec_num = parseInt(seconds, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            var returnString = "";
            if (minutes > 0) {
                if (minutes > 1) {
                    returnString += minutes + " minutes";
                } else {
                    returnString += minutes + " minute";
                }
            }
            if (seconds > 0) {
                if (minutes > 0) {
                    returnString += " ";
                }
                if (seconds > 1) {
                    returnString += seconds + " seconds";
                } else {
                    returnString += seconds + " second";
                }
            }
            return returnString;
        }

        $("#APIKings-st-stay-button").click(function () {
            self.Debug("Stay button clicked");
            self.HideModal();
            ticks = 0;
        });

        $("#APIKings-st-leave-button").click(function () {
            self.Debug("Leave clicked");
            self.HideModal();
            self.Logout();
        });

        this.Logout = function () {
            if (options.method == "POST") {
                document.getElementById(options.logoutFormId).submit();
            }
            if (options.method == "GET") {
                window.location.href = options.logoutUrl;
            }
        }

        this.ShowModal = function () {
            self.Debug("ShowModal called");
            $("#APIKings-st-modal").show();
            $("#APIKings-st-overlay").fadeIn();
        }

        this.HideModal = function () {
            self.Debug("HideModal called");
            $("#APIKings-st-modal").hide();
            $("#APIKings-st-overlay").fadeOut();
        }

        // Subscribe to events
        $("body").on('click keypress', function () {
            ticks = 0;
            self.Debug("click or keypress detected");
        });

        document.addEventListener('scroll', function (event) {
            ticks = 0;
            self.Debug("scroll detected");
        }, true);


        tick = setTimeout(self.StartSessionTimer(), 1000);
        if (options.method == "POST")
            self.Debug("Logout method: " + options.method + " form id: " + options.logoutFormId);
        if (options.method == "GET")
            self.Debug("Logout method: " + options.method + " url: " + options.logoutUrl);
        self.Debug("Finished initializing API");
        return this;
    }
}(jQuery));
