function calculateLuckyUnluckyNumbers(birthDate) {
    function getLifePathNumber(dob) {
        return dob.split("-").join("").split("").map(Number).reduce((a, b) => a + b, 0);
    }
    
    function reduceToSingleDigit(num) {
        while (num > 9) {
            num = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        return num;
    }
    
    let birthNumber = reduceToSingleDigit(birthDate.split("-")[2]);
    let lifePathNumber = reduceToSingleDigit(getLifePathNumber(birthDate));
    
    const unluckyBaseNumbersMap = {
        1: [8], 2: [9], 3: [9, 3], 4: [3, 8], 5: [4, 9], 6: [3], 7: [9], 8: [1, 4, 6], 9: [8, 3, 9]
    };
    
    const luckyNumbersMap = {
        1: [1, 5, 7], 2: [2, 4, 6], 3: [3, 9, 6], 4: [1, 4, 8], 5: [5, 6, 9], 
        6: [3, 6, 9], 7: [1, 2, 7], 8: [1, 4, 8], 9: [3, 6, 9]
    };
    
    const luckyDaysMap = {
        1: ["Sunday", "Monday"],
        2: ["Monday", "Friday"],
        3: ["Thursday", "Tuesday"],
        4: ["Sunday", "Monday"],
        5: ["Wednesday", "Friday"],
        6: ["Tuesday", "Friday"],
        7: ["Monday", "Wednesday"],
        8: ["Saturday", "Sunday"],
        9: ["Tuesday", "Thursday"]
    };
    
    const unluckyDaysMap = {
        1: ["Saturday", "Friday"],
        2: ["Sunday", "Wednesday"],
        3: ["Monday", "Saturday"],
        4: ["Tuesday", "Friday"],
        5: ["Sunday", "Thursday"],
        6: ["Wednesday", "Saturday"],
        7: ["Friday", "Sunday"],
        8: ["Tuesday", "Thursday"],
        9: ["Monday", "Friday"]
    };
    
    let unluckyBaseNumbers = unluckyBaseNumbersMap[birthNumber] || [];
    let unluckyNumbers = [];
    
    // Generate multiples of the unlucky base numbers up to 30
    unluckyBaseNumbers.forEach(num => {
        for (let i = 1; i <= 3; i++) {
            let multiple = num * i;
            if (multiple <= 30) {
                unluckyNumbers.push(multiple);
            }
        }
    });
    
    let luckyNumbers = luckyNumbersMap[birthNumber] || [];
    let luckyDays = luckyDaysMap[birthNumber] || [];
    let unluckyDays = unluckyDaysMap[birthNumber] || [];
    
    return {
        birthNumber,
        lifePathNumber,
        luckyNumbers,
        unluckyNumbers: [...new Set(unluckyNumbers)], // Remove duplicates
        luckyDays,
        unluckyDays
    };
}

// Example Usage

module.exports = {
    calculateLuckyUnluckyNumbers
}