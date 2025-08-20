function calculateMoolankAndBhagyank(dob) {
  const [day, month, year] = dob.split('-').map(Number);

  const sumDigits = (num) => {
    while (num > 9) {
      num = num.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return num;
  };

  const moolank = sumDigits(day);
  const bhagyank = sumDigits(sumDigits(day) + sumDigits(month) + sumDigits(year));

  return { moolank, bhagyank };
}

module.exports = calculateMoolankAndBhagyank;
