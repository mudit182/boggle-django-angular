
export class CountdownTimer {
    gameTime: { min: number, sec: number };
    remainingTime: { min: number, sec: number };
    clockRunning: Boolean;
    refreshIntervalId: any;

    constructor() {
        this.clockRunning = false;
        this.gameTime = { min: 1, sec: 0};
        this.remainingTime = { min: 1, sec: 0};
    }

    countdown1Sec() {
        if (this.remainingTime.min === 0 && this.remainingTime.sec === 0) {
            this.stop();
        } else {
            if (this.remainingTime.sec === 0) {
                this.remainingTime.sec = 59;
                this.remainingTime.min--;
            } else {
                this.remainingTime.sec--;
            }
        }
    }

    toggleStartStop() {
        if (this.remainingTime.min === 0 && this.remainingTime.sec === 0) {
            this.stop();
        } else {
            if (this.clockRunning) {
                this.stop();
            } else {
                this.start();
            }
        }
    }

    resetStart() {
        this.resetTime();
        this.start();
    }

    resetTime() {
        this.clockRunning = false;
        this.remainingTime.sec = this.gameTime.sec;
        this.remainingTime.min = this.gameTime.min;
        if (this.remainingTime.sec === null) {
            this.remainingTime.sec = 0;
        }
        if (this.remainingTime.min === null) {
            this.remainingTime.min = 0;
        }
        clearInterval(this.refreshIntervalId);
    }

    start() {
        this.clockRunning = true;
        this.refreshIntervalId = setInterval(
            () => {
                this.countdown1Sec();
            }, 1000
        );
    }

    stop() {
        this.clockRunning = false;
        clearInterval(this.refreshIntervalId);
    }

    setGameTime(min: number, sec: number) {
        this.gameTime = {min: min, sec: sec};
        this.remainingTime = {min: min, sec: sec};
    }

    getGameTime() {
        return this.gameTime;
    }

    getRemainingTime() {
        return this.remainingTime;
    }

}
