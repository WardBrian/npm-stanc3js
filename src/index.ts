export type StancReturn =
  | { errors: undefined; result: string; warnings?: string[] }
  | { errors: string[]; result: undefined; warnings?: string[] };

type StancFunction = (
  filename: string,
  code: string,
  options: string[],
  includes?: Record<string, string>,
) => StancReturn;

const stancjs = require("./stanc.js");

const stanc: StancFunction = stancjs.stanc;
const dump_stan_math_distributions: () => string =
  stancjs.dump_stan_math_distributions;
const dump_stan_math_signatures: () => string =
  stancjs.dump_stan_math_signatures;

const stanc_version = stanc("", "", ["version"]).result;

export {
  stanc,
  dump_stan_math_distributions,
  dump_stan_math_signatures,
  stanc_version,
};
