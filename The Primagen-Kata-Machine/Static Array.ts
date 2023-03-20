/*
 * Arrays are continuous blocks of memory, determined by the type we want to store
 */

const a = new ArrayBuffer(6);
console.log(a); //6 bytes of memory

const a8 = new Uint8Array(a);

a8[0] = 45;
console.log(a); //45 in the first memory slot

a8[2] = 45;
console.log(a); //45 in the third memory slot

/*
  Here we process the original array with 6 slots, but we do it in double the size.
  Hence, 0x4545 will be stored in the 5th and 6th slots.

  This is because the Uint16Array is a 16-bit array, which means that it will
  store 2 bytes per slot. In contrast, the Uint8Array is an 8-bit array, which means
  that it will store 1 byte per slot.

  So we are looking at the same memory through 2 lenses, and we are seeing different
  values, using the same index

  0 -- 1 -- 2 -- 3 -- 4 -- 5  SLOTS
  0 -- 0 -- 0 -- 0 -- 0 -- 0  UINT 8 ARRAY
  
  0 -- - -- 1 -- - -- 2 -- - -- 3 -- - -- 4 -- - -- 5  SLOTS
  0 -- - -- 0 -- - -- 0 -- - -- 0 -- - -- 0 -- - -- 0 UINT 16 ARRAY
*/
const a16 = new Uint16Array(a);
a16[2] = 0x4545;
console.log(a);

/*
Of course, in memory, we can't insert new slots and over-extend the array
thus, insertion is a overwriting process.

The same goes for deletion, we overwrite and set to 0
*/
a8[5] = 0x99;
console.log(a);

/*
 * Data structures then can create their own push, shift, pop, etc methods within the abstraction we make.
 * But it is not possible to do so in memory
 */
