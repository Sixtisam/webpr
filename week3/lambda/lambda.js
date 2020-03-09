const id = x => x;
const fst = x => y => x;
const snd = x => y => y;
const M   = f => f (f);

const id = x => x;
// first argument
const fst = x => y => x; 

// second argument
const kite = fst(id)

// self-application of functions
const mockingbird = f => f(f);

const F = kite;
const T = fst;

const and = p => q  => p(q)(p);

// const or = p => p(p);
const or = mockingbird;

const not = x => x(F)(T);

const beq = p => q => p(q)(not(q))

const flip = f => a => b => f(b)(a);

const snd = kite;
const konst = fst;

// endless loop
// const Y = mockingbird(mockingbird);


const Pair = first => second => f => f(first)(second);
const firstname = fst;
const lastname = snd;

const either = id;

const Left = value => f => g => f(value);
const Right = value => f => g => g(value);

// ----- special -----

const Tuple = n => [
    parmStore (n + 1) ( [] ) (parms => parms.reduce( (accu, it) => accu(it), parms.pop() ) ), // ctor
    ...Array.from( {length:n}, (it, idx) => iOfN (n) (idx) () )                    // selectors
];

const iOfN = n => i => value => // from n curried params, take argument at position i,
    n === 0
    ? value
    : x => iOfN (n-1) (i-1) ( i === 0 ? x : value );


const parmStore = n => args => onDone =>  // n args to come
    n === 0
    ? onDone(args)
    : arg => parmStore(n - 1)([...args, arg]) (onDone); // store parms in array

const Choice = n => [
    ...Array.from( {length:n}, (it, idx) => parmStore(n+1) ([]) (parms => parms[idx+1] (parms[0]) ) ), // ctors
    id
];




