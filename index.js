#! /env/bin/dev node
import inquirer from "inquirer";
import chalk from "chalk";
// inittializing variables for user balance and pin code
let myBalance = 70000; // Dollar
let myPin = 1234;
// printing welcome message
console.log(chalk.blueBright.bold("\n\tWELLCOME TO UMER'S AUTO TELLER MACHINE\n\t"));
// taking input from user through inquirer prompt
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "enter your pin: ",
        type: "number",
    }
]);
// setting up if statement for confirmation of correct pin
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("correct pincode ... \n\nlogin successfull"));
    // printing wellcome user statement
    console.log(chalk.cyanBright("\nwelcome umer\n"));
    // taking input from user for desired operation like cash withdraw, check balance,
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            message: "please select options",
            type: "list",
            choices: ["fast cash", "withdraw cash", "check balance"]
        }
    ]);
    // setting up if statement for fast cash operation, taking choices from user
    if (operationAnswer.operation === "fast cash") {
        let fastCashAnswer = await inquirer.prompt([
            {
                name: "fastCash",
                message: "select fast cash option",
                type: "list",
                choices: ["1000", "2000", "5000", "7000", "10000"]
            }
        ]);
        if (fastCashAnswer.fastCash > myBalance) {
            console.log(chalk.redBright(`insufficient balance`));
        }
        console.log(chalk.magentaBright("\nprocessing... \n"));
        // printing statement for fast cash amount
        console.log(chalk.greenBright(`here you go,your fast cash amount: ${fastCashAnswer.fastCash}`, "$"));
        // printing statement for remaining balance
        console.log(chalk.yellowBright(`\nand your remaining balance is: ${myBalance}`, "$"));
        console.log(chalk.blueBright("\t...have a nice day..."));
    }
    // setting up if statement for cash withdraw operation, taking input from user for amount to withdraw
    if (operationAnswer.operation === "withdraw cash") {
        let amountAnswer = await inquirer.prompt([
            {
                name: "amount",
                message: "enter amount: ",
                type: "number",
            }
        ]);
        // setting up if statement for insefficint balance if the ennterd amount is greater than available balance
        if (amountAnswer.amount > myBalance) {
            console.log(chalk.redBright("insufficient balance"));
        }
        // else statement for deducting amount from balance and printing remaining balance
        else {
            myBalance -= amountAnswer.amount;
            console.log(chalk.magentaBright("\nprocessing... "));
            console.log(chalk.magentaBright("\nplease wait\n"));
            console.log(chalk.green(`${amountAnswer.amount}     \nwithdraw successfull\n`));
            // printing statement for remaining balance
            console.log(chalk.yellowBright(`your remaining balance is: ${myBalance}`, "$"));
        }
        console.log(chalk.blueBright(`\n\t...have a nice day...\t`));
    }
    // if statement for check balance operation
    if (operationAnswer.operation === "check balance") {
        console.log(chalk.bgYellow("\nyour current balance is: " + myBalance, "$"));
    }
    ;
}
// else statement for incorrect pin code
else {
    console.log(chalk.red("\nincorrect pin code\n"));
}
