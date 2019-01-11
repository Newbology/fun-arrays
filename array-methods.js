'use strict';
let dataset = require('./dataset.json');
let bankBalances = dataset.bankBalances;

/**
 * create an array with accounts from bankBalances that are
 *greater than 100000 @sada1
 *assign the resulting new array to `hundredThousandairs`
 */
let hundredThousandairs = bankBalances.filter(element => {
  return element.amount > 100000;
});

// let hundredThousandairs = bankBalances.filter(function(element) {
//   if (element.amount > 100000) {
//     return element;
//   }
// });

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
let sumOfBankBalances = bankBalances.reduce((accum, current) => {
  return (accum += parseInt(current.amount));
}, 0);

/*
  from each of the following states:
    Wisconsin, WI
    Illinois, IL
    Wyoming, WY
    Ohio, OH
    Georgia, GA
    Delaware, DE
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
let sumOfInterests = bankBalances
  .filter(current => {
    return ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current.state);
  })
  .reduce((accum, current) => {
    return (accum += Math.round(parseInt(current.amount) * 0.189));
  }, 0);
/* just for shiggles what not to do
    let result= Math.round(parseInt(current.amount) *.189)
    return ( result += parseInt(accum));
*/

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )

  get sum of all banks groups by states 
 */
let stateSums = bankBalances.reduce((accum, current) => {
  if (accum.hasOwnProperty(current.state)) {
    accum[current.state] += Math.round(parseInt(current.amount));
  } else {
    accum[current.state] = parseInt(current.amount);
  }
  return accum;
}, {});

/*
  for all states *NOT* in the following states:
  take all except these
    W1isconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
let sumOfHighInterests = Object.keys(stateSums)
  .filter(current => {
    return !['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current);
  })
  .reduce((accum, current) => {
    // if ((Math.round(stateSums[current] * 0.189)) > 50000) {
    return (accum += Math.round(stateSums[current] * 0.189));
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
let lowerSumStates = bankBalances.reduce((accum, current) => {
  if (
    !accum.hasOwnProperty(current.state) &&
    stateSums[current.state] < 1000000
  ) {
    accum.push(current.state);
  }
  return accum;
}, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
let higherStateSums = Object.keys(stateSums).reduce((accum, current) => {
  if (stateSums[current] > 1000000) {
    accum += stateSums[current];
  }
  return accum;
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
let areStatesInHigherStateSum = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].every(
  current => {
    stateSums[current] > 2550000;
  }
);

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
let anyStatesInHigherStateSum = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].some(
  current => {
    stateSums[current] > 2550000;
    return current;
  }
);

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
