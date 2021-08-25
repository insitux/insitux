import { invoke } from ".";
import { concat, getTimeMs, len, padEnd, trim } from "./poly-fills";
import { Env, ExternalError, Val, ValAndErr } from "./types";

type State = { dict: Map<string, Val>; output: string };

async function get(state: State, key: string): Promise<ValAndErr> {
  if (!state.dict.has(key)) {
    return { value: { t: "null", v: undefined }, err: `"${key} not found.` };
  }
  return { value: state.dict.get(key)!, err: undefined };
}

async function set(
  state: State,
  key: string,
  val: Val
): Promise<ExternalError> {
  state.dict.set(key, val);
  return undefined;
}

async function exe(
  state: State,
  name: string,
  args: Val[]
): Promise<ValAndErr> {
  const nullVal: Val = { t: "null", v: undefined };
  switch (name) {
    case "print-str":
      state.output += args[0].v;
      break;
    case "print":
    case "test.function":
      state.output += args[0].v + "\n";
      break;
    default:
      return { value: nullVal, err: "operation does not exist" };
  }
  return { value: nullVal, err: undefined };
}

const tests: {
  name: string;
  code: string;
  err?: string[];
  out?: string;
}[] = [
  //Basic snippets
  { name: "Hello, world!", code: `"Hello, world!"`, out: `Hello, world!` },
  {
    name: "Say Hello, world!",
    code: `(print "Hello, world!")`,
    out: `Hello, world!\nnull`,
  },
  { name: "1 + 1 = 2", code: `(+ 1 1)`, out: `2` },
  { name: "Negate 1 = -1", code: `(- 1)`, out: `-1` },
  { name: "(1+1)+1+(1+1) = 5", code: `(+ (+ 1 1) 1 (+ 1 1))`, out: `5` },
  { name: "Conditional head", code: `((if true + -) 12 9 1)`, out: `22` },
  {
    name: "Cond number head",
    code: `((if false 1 2) [:a :b :c])`,
    out: `:c`,
  },
  {
    name: "and & short-circuit",
    code: `[(and true (if true null 1) true) (and 1 2 3)]`,
    out: `[false true]`,
  },
  {
    name: "or & short-circuit",
    code: `[(or true (print "hello") 1) (or false (print-str "-> ") 1)]`,
    out: `-> [true 1]`,
  },
  { name: "String retrieve", code: `(2 "Hello")`, out: `l` },
  { name: "Vector retrieve", code: `(2 [:a :b :c :d])`, out: `:c` },
  {
    name: "Key as operation",
    code: `(:age {:name "Patrick" :age 24})`,
    out: `24`,
  },
  {
    name: "Map as operation 1",
    code: `({"name" "Patrick" "age" 24} "age")`,
    out: `24`,
  },
  {
    name: "Map as operation 2",
    code: `({"name" "Patrick"} "age" 24)`,
    out: `{name Patrick, age 24}`,
  },
  {
    name: "Equalities",
    code: `[(= 1 2 1)
            (!= 1 2 1)
            (= "Hello" "hello")
            (!= "world" "world")
            (= [0 [1]] [0 [1]])]`,
    out: `[false true false false true]`,
  },
  { name: "Define and retrieve", code: `(define a 1) a`, out: `1` },
  { name: "Define and add", code: `(define a 1) (inc a)`, out: `2` },
  { name: "Define op and call", code: `(define f +) (f 2 2)`, out: `4` },
  { name: "Define vec and call", code: `(define f [1]) (f 1)`, out: `1` },
  {
    name: "Define num op and call",
    code: `(define f 1) (f [:a :b :c])`,
    out: `:b`,
  },
  { name: "Print simple vector", code: `[1 2 3]`, out: `[1 2 3]` },
  {
    name: "Sum vector of numbers",
    code: `[(reduce + [1 2 3]) (reduce + [1 2 3] 3)]`,
    out: `[6 9]`,
  },
  {
    name: "Sum vectors of numbers",
    code: `(map + [1 2 3] [1 2 3 4])`,
    out: `[2 4 6]`,
  },
  {
    name: "Comments, short decimal",
    code: `;((print "Hello")
           .456`,
    out: `0.456`,
  },
  {
    name: "Dictionary into vector",
    code: `(into [1 2] {3 4 5 6})`,
    out: `[1 2 3 4 5 6]`,
  },
  {
    name: "Vector into dictionary",
    code: `(into {[0] 1 [2] 3} [[0] 2])`,
    out: `{[0] 2, [2] 3}`,
  },
  //Basic functions
  {
    name: "Define with no call",
    code: `(function func (print "Nothing."))`,
  },
  {
    name: "Call greet func",
    code: `(function greeting (print "Hello!")) (greeting)`,
    out: `Hello!\nnull`,
  },
  {
    name: "Call const value func",
    code: `(function const 123) (const)`,
    out: `123`,
  },
  {
    name: "Call identity funcs",
    code: `(function id1 %)
           (function id2 x x)
           [(id1 123) (id2 456)]`,
    out: `[123 456]`,
  },
  {
    name: "Call greet with name",
    code: `(function greeting name (print "Hello, " name "!"))
           (greeting "Patrick")`,
    out: `Hello, Patrick!\nnull`,
  },
  {
    name: "Call with too few args",
    code: `(function func a b c [a b c]) (func 1 2)`,
    out: `[1 2 null]`,
  },
  {
    name: "Define func and call",
    code: `(function func a b (+ a b)) (define f func) (f 2 2)`,
    out: `4`,
  },
  {
    name: "Anonymous parameters",
    code: `(function avg<n? (< (/ (reduce + %) (len %)) %1))
           (avg<n? [0 10 20 30 40] 5)`,
    out: `false`,
  },
  {
    name: "While loop",
    code: `(define n 5)
           (while (< 0 n)
             (print-str n)
             (define n (dec n)))`,
    out: `543215`,
  },
  //Runtime errors
  {
    name: "String instead of number",
    code: `(function avg (/ (reduce + %) (len %)))
           (print (avg [1 2 3]))
           (avg "Hello")`,
    out: `2`,
    err: ["Type"],
  },
  {
    name: "Reference non-existing",
    code: `x`,
    err: ["Reference"],
  },
  {
    name: "Call non-existing",
    code: `(x)`,
    err: ["External"],
  },
  {
    name: "Call budget",
    code: `(function loop (loop)) (loop)`,
    err: ["Budget"],
  },
  {
    name: "Loop budget",
    code: `(define n 10000)
           (while (< 0 n)
             (define n (dec n)))`,
    err: ["Budget"],
  },
  //Complex functions
  {
    name: "Fibonacci 13",
    code: `(function fib n
             (if (< n 2) n
               (+ (fib (dec n))
                  (fib (- n 2)))))
           (fib 13)`,
    out: `233`,
  },
  //Test environment functions
  {
    name: "set get",
    code: `[($globals.time_offset 5.5) $globals.time_offset]`,
    out: `[5.5 5.5]`,
  },
  {
    name: "exe",
    code: `(test.function 123)`,
    out: `123\nnull`,
  },
  //Syntax errors
  { name: "Empty parens", code: `()`, err: ["Parse"] },
  {
    name: "Imbalanced parens",
    code: `(print ("hello!")`,
    err: ["Parse"],
  },
  {
    name: "Imbalanced quotes 1",
    code: `(print "Hello)`,
    err: ["Parse", "Parse"],
  },
  {
    name: "Imbalanced quotes 2",
    code: `print "Hello")`,
    err: ["Parse"],
  },
  {
    name: "Function as op",
    code: `(function)`,
    err: ["Parse"],
  },
  {
    name: "Function without body",
    code: `(function func)`,
    err: ["Parse"],
  },
];

export async function performTests(): Promise<string[]> {
  const results: {
    okErr: boolean;
    okOut: boolean;
    elapsedMs: number;
    display: string;
  }[] = [];
  for (let t = 0; t < len(tests); ++t) {
    const { name, code, err, out } = tests[t];
    const state: State = {
      dict: new Map<string, Val>(),
      output: "",
    };
    const env: Env = { funcs: {}, vars: {} };
    const startTime = getTimeMs();
    const errors = await invoke(
      {
        get: (key: string) => get(state, key),
        set: (key: string, val: Val) => set(state, key, val),
        exe: (name: string, args: Val[]) => exe(state, name, args),
        env,
        loopBudget: 10000,
        callBudget: 1000,
      },
      code,
      "testing",
      true
    );
    const okErr = (err || []).join() === errors.map(({ e }) => e).join();
    const okOut = !out || trim(state.output) === out;
    const elapsedMs = getTimeMs() - startTime;
    const [testNum, testName, testElapsed, testErrors] = [
      padEnd(`${t + 1}`, 3),
      padEnd(name, 24),
      padEnd(`${elapsedMs}ms`, 6),
      okErr ||
        errors.map(
          ({ e, m, errCtx: { line, col } }) => `${e} ${line}:${col}: ${m}`
        ),
    ];
    results.push({
      okErr,
      okOut,
      elapsedMs,
      display: `${testNum} ${testName} ${testElapsed} ${okOut} ${testErrors}`,
    });
  }
  const totalMs = results.reduce((sum, { elapsedMs }) => sum + elapsedMs, 0);
  const numPassed = len(results.filter(({ okOut, okErr }) => okOut && okErr));
  return concat(
    results.map(r => r.display),
    [`----- ${numPassed}/${len(results)} passed in ${totalMs}ms.`]
  );
}
