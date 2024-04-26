#!/usr/bin/env node
//Project09: Count Down Timer
// getDate : returns the day of the month (1-31)
// getMonth : returns the month as an integer (0-11). Note that January is represented as 0 and December as 11.
// getFullYear : returns the year in 4-digit format
// getHours: returns the hour of the day in 24-hour format (0-23)
// getMinutes: returns the minute (0-59)
// getSeconds: returns the seconds (0-59)
import inquirer from "inquirer";
function pad(num, length) {
    return num.toString().padStart(length, '0');
}
// Function  date and time as YYYY-MM-DD HH:MM:SS
function formatDateTime(dateTime) {
    const year = dateTime.getFullYear();
    const month = pad(dateTime.getMonth() + 1, 2);
    const day = pad(dateTime.getDate(), 2);
    const hours = pad(dateTime.getHours(), 2);
    const minutes = pad(dateTime.getMinutes(), 2);
    const seconds = pad(dateTime.getSeconds(), 2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
async function askForDate() {
    const { date } = await inquirer.prompt({
        type: "input",
        name: "date",
        message: "Enter the date (YYYY-MM-DD):",
        validate: (input) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/; //regex
            if (regex.test(input)) {
                return true;
            }
            return "Please enter a valid date in the format YYYY-MM-DD.";
        },
    });
    return new Date(date);
}
// Countdown timer function
async function startCountdown() {
    // Ask for date
    const chosenDate = await askForDate();
    const { choice } = await inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Choose what you want to count:",
        choices: ["Hours", "Minutes", "Seconds"],
    });
    let totalSeconds = 0;
    switch (choice) {
        case "Hours":
            const { hours } = await inquirer.prompt({
                type: "number",
                name: "hours",
                message: "Enter the number of hours:",
                default: 0,
            });
            totalSeconds = hours * 3600;
            break;
        case "Minutes":
            const { minutes } = await inquirer.prompt({
                type: "number",
                name: "minutes",
                message: "Enter the number of minutes:",
                default: 0,
            });
            totalSeconds = minutes * 60;
            break;
        case "Seconds":
            const { seconds } = await inquirer.prompt({
                type: "number",
                name: "seconds",
                message: "Enter the number of seconds:",
                default: 0,
            });
            totalSeconds = seconds;
            break;
        default:
            break;
    }
    const timer = setInterval(() => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        const now = new Date();
        const formattedDateTime = formatDateTime(now);
        process.stdout.write('\r' + `${formattedDateTime} - Time Remaining: ${pad(hrs, 2)}:${pad(mins, 2)}:${pad(secs, 2)}`);
        totalSeconds--;
        if (totalSeconds < 0) {
            clearInterval(timer);
            process.stdout.write('\r' + "Countdown Finished!");
            process.stdout.write('\n');
        }
    }, 1000);
}
startCountdown();
