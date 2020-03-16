// atoms
const id = x => x;
const konst = x => y => x;

// derived
const F = konst(id);
const T = konst;

const Pair = x => y => f => f(x)(y);
const fst = konst;
const snd = konst(id);
// const fst  = x => y => x;
// const snd  = x => y => y;
