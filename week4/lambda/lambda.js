
// atoms
const id    = x =>      x;
const konst = x => y => x;


// derived
const F = konst (id);
const T = konst;

const Pair = x => y => f => f(x)(y);
const fst  = konst;
const snd  = konst(id);

const Left   = x => f => g => f(x);
const Right  = x => f => g => g(x);
const either = e => f => g => e (f) (g);