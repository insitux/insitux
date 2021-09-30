import readline = require("readline");
import fs = require("fs");
import { symbols, visStr, insituxVersion } from ".";
import { Ctx, Val, ValAndErr } from "./types";
import { ErrorOutput, invoker, parensRx } from "./invoker";
const env = new Map<string, Val>();

async function get(key: string) {
  return env.has(key)
    ? { value: env.get(key)!, err: undefined }
    : {
        value: <Val>{ v: undefined, t: "null" },
        err: `key ${key} not found`,
      };
}

async function set(key: string, val: Val) {
  env.set(key, val);
  return undefined;
}

const ctx: Ctx = {
  env: { funcs: {}, vars: {}, lets: [] },
  get,
  set,
  exe,
  loopBudget: 10000,
  rangeBudget: 1000,
  callBudget: 100000000,
  recurBudget: 10000,
};

async function exe(name: string, args: Val[]): Promise<ValAndErr> {
  const nullVal: Val = { v: undefined, t: "null" };
  switch (name) {
    case "print":
    case "print-str":
      process.stdout.write(`\x1b[32m${args[0].v}\x1b[0m`);
      if (name === "print") {
        process.stdout.write("\n");
      }
      break;
    case "read": {
      const path = args[0].v as string;
      if (!fs.existsSync(path)) {
        return { value: nullVal };
      }
      return {
        value: { t: "str", v: fs.readFileSync(path).toString() },
      };
    }
    default:
      if (args.length) {
        const a = args[0];
        if (visStr(a) && a.v.startsWith("$")) {
          if (args.length === 1) {
            return await get(`${a.v.substring(1)}.${name}`);
          } else {
            await set(`${a.v.substring(1)}.${name}`, args[1]);
            return { value: args[1] };
          }
        }
      }
      return { value: nullVal, err: `operation ${name} does not exist` };
  }
  return { value: nullVal };
}

function completer(line: string) {
  const input = line.split(parensRx).pop();
  const completions = symbols(ctx);
  if (!input) {
    return [completions, ""];
  }
  const hits = completions.filter(c => c.startsWith(input));
  return [hits.length ? hits : completions, input];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
  completer,
  history: fs.existsSync(".repl-history")
    ? fs.readFileSync(".repl-history").toString().split("\n").reverse()
    : [],
});

let lines: string[] = [];

rl.on("line", async line => {
  lines.push(line);
  const input = lines.join("\n");
  if (input.startsWith(" ") === /\r*\n$/.test(input)) {
    lines = [];
    if (input === "quit") {
      rl.close();
      return;
    }
    if (input.trim()) {
      if (lines.length === 1) {
        fs.appendFileSync(".repl-history", `\n${input}`);
      }
      printErrorOutput(await invoker(ctx, input));
    }
    rl.prompt();
  } else {
    process.stdout.write(".  ");
  }
});
rl.on("close", () => {
  console.log();
});

console.log(
  `Insitux ${insituxVersion} REPL. Append space for multiline input.`,
);
rl.prompt();

function printErrorOutput(lines: ErrorOutput) {
  const colours = { error: 31, message: 35 };
  lines.forEach(({ type, text }) => {
    process.stdout.write(`\x1b[${colours[type]}m${text}\x1b[0m`);
  });
}
