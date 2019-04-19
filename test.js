// // const styleMaps = {
// //   a: {
// //     a1: 'x',
// //     a2: 'y'
// //   },
// //   b: {
// //     b1: 'x',
// //     b2: 'y'
// //   }
// // };

// // const crashingStyleMaps = {
// //   c: {
// //     c1: 'x',
// //     c2: 'y'
// //   },
// //   d: {
// //     d1: 'x',
// //     d2: 'y'
// //   }
// // };

// // const xy = Object.keys(styleMaps || {})
// //                  .concat(Object.keys(crashingStyleMaps || {}))
// //                  .reduce((acc, curr) => {
// //                   acc[curr] = curr;
// //                   return acc;
// //                  }, {});

// // console.log(xy);                 
// // console.log(Object.keys(xy));

// const customStyles = {
//   _STRIKE: {
//     textDecoration: 'line-through' 
//   }, 
//   _BOLD: { 
//     fontWeight: 'bold' 
//   }, 
//   fonts: [{
//     FONTSIZE_12: { fontSize: '12px' },
//     FONTSIZE_18: { fontSize: '18px' },
//     FONTSIZE_22: { fontSize: '22px' },
//     FONTSIZE_26: { fontSize: '26px' },
//     FONTSIZE_30: { fontSize: '30px' }
//   }]
// };

// const x = Object.keys(customStyles).reduce((acc, key) => {
//   if (Array.isArray(customStyles[key])) {
//     Object.keys(customStyles[key]).reduce((a, crashingStyleKey) => {
//       acc[crashingStyleKey] = customStyles[key][crashingStyleKey];
//       return acc;
//     });
//   } else {
//     acc[key] = customStyles[key];
//   }
// }, {});

const mutuallyexc = {
  FONT_SIZE12: { a: 2, b: 4},
  FONT_SIZE14: { a: 2, b: 4}
};

const y = Object.keys(mutuallyexc).reduce((curr, key) => {
  curr[key] = mutuallyexc[key];
  return curr;
}, {});

console.log(y);