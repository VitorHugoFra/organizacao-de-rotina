var pomodoro = {
    started: false,
    resume: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function () {
        var self = this;
        this.minutesDom = document.querySelector("#minutes");
        this.secondsDom = document.querySelector("#seconds");
        this.fillerDom = document.querySelector("#filler");
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector("#work").onclick = function () {
            self.startWork.apply(self);
        };
        document.querySelector("#shortBreak").onclick = function () {
            self.startShortBreak.apply(self);
        };
        document.querySelector("#longBreak").onclick = function () {
            self.startLongBreak.apply(self);
        };
        document.querySelector("#stop").onclick = function () {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: function (mins, secs, started, resume) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.resume = resume;

        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },
    startWork: function () {

        this.resetVariables(25, 0, true, true); //25
    },
    startShortBreak: function () {
        this.resetVariables(5, 0, true, false);
    },
    startLongBreak: function () {
        this.resetVariables(15, 0, true, false);
    },
    stopTimer: function () {
        this.resetVariables(25, 0, false, false);
        this.updateDom();
    },
    toDoubleDigit: function (num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },
    updateDom: function () {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + "px";
    },
    intervalCallback: function () {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },
    Resumo: function () {
        var blur = document.getElementById('blur')
        blur.classList.toggle('active')
        var popup = document.getElementById('popup')
        popup.classList.toggle('active')
    },

    timerComplete: function () {
        var audio = new Audio("audio/ding.mp3");
        audio.addEventListener("canplaythrough", function () {
            audio.play();
        });
        if (this.resume) {
            this.Resumo();
        }
        this.started = false;
        this.fillerHeight = 0;
    },


};
window.onload = function () {
    pomodoro.init();
};