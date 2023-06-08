console.log("WELCOME TRAIN ARENA");
/** Shunday function tuzing, 
 * unga string argument pass bolsin. 
 * Function ushbu agrumentdagi faqat digitlarni 
 * yangi stringda return qilsin!
 * Masalan: findDigits('ad5we34jkf89') return qilishi 
 * kerak bolgan qiymat '53489' */

function faqatDigitQabul(str) {
  let digits = str.replace(/\D/g, "");
  return digits;
}

let a = "ad5we34jkf89";
let result = faqatDigitQabul(a);
console.log(result);


















// /**CHALLENGE: 5 CAN YOU SORT ME!? */

// const detail_list = [12, 23, 55, null, 34, 25, null, 45, null];

// function tartiblikSortlash(detail_list) {
//   detail_list.sort((a, b) => {
//     if (a === null) return 1;
//     if (b === null) return -1;
//     return a - b;
//   });
//   return detail_list;
// }
// const result1 = tartiblikSortlash(detail_list);
// console.log("result:", result1);

// const moment = require("moment");

// /** CHALLENGE: MAX PROFIT */

// function buyStock(stock_prices) {
//   let kichikSon = stock_prices[0];
//   let kattaSon = stock_prices[0];
//   let indexPrices = 0;
//   let realTime = moment();

//   for (let i = 1; i < stock_prices.length; i++) {
//     if (stock_prices[i] < kichikSon) {
//       kichikSon = stock_prices[i];
//       indexPrices = i;
//     }

//     if (stock_prices[i] > kattaSon) {
//       kattaSon = stock_prices[i];

//     }
//   }

//   console.log(
//     `${realTime.format(
//       "YYYY-MM-DD"
//     )} Aksiya bozoridagi eng arzon aksiya: ${kichikSon}`
//   );
//   console.log(
//     `${realTime.format(
//       "YYYY-MM-DD"
//     )} Aksiya bozordagi eng qimmat aksiya: ${kattaSon}`
//   );
//   let maxProfit = kattaSon - kichikSon;
//   console.log(`You should buy stock => index: ${indexPrices}, profit: ${maxProfit} `);
// }

// const prices = [2, 1, 30, 3, 10];
// buyStock(prices);

// console.log("You should buy stock =>", buyStock(prices));
