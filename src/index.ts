import rawStancJS from "./stanc.js?raw";

export type StancReturn =
  | { errors: undefined; result: string; warnings?: string[] }
  | { errors: string[]; result: undefined; warnings?: string[] };

type StancFunction = (
  filename: string,
  code: string,
  options: string[],
  includes?: Record<string, string>,
) => StancReturn;

// stanc.js code is not a module, so most nice options for loading are unavailable
eval(rawStancJS);

let stanc: StancFunction;
let dump_stan_math_distributions: () => string;
let dump_stan_math_signatures: () => string;

// stanc.js also detects if it is running under node, which makes loading even more annoying
if (typeof module !== "undefined") {
  // node
  stanc = module.exports.stanc;
  dump_stan_math_distributions = module.exports.dump_stan_math_distributions;
  dump_stan_math_signatures = module.exports.dump_stan_math_signatures;
} else {
  // browser
  stanc = (globalThis as any).stanc;
  dump_stan_math_distributions = (globalThis as any)
    .dump_stan_math_distributions;
  dump_stan_math_signatures = (globalThis as any).dump_stan_math_signatures;
}

const stanc_version = stanc("", "", ["version"]).result;

export {
  stanc,
  dump_stan_math_distributions,
  dump_stan_math_signatures,
  stanc_version,
};
