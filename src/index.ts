export type StancReturn =
  | { errors: undefined; result: string; warnings?: string[] }
  | { errors: string[]; result: undefined; warnings?: string[] };

type StancFunction = (
  filename: string,
  code: string,
  options: string[],
  includes?: Record<string, string>,
) => StancReturn;

const {
  stanc,
  dump_stan_math_distributions,
  dump_stan_math_signatures,
}: {
  stanc: StancFunction;
  dump_stan_math_distributions: () => string;
  dump_stan_math_signatures: () => string;
} = require("./stanc.js");

const stanc_version = stanc("", "", ["version"]).result;

export {
  stanc,
  dump_stan_math_distributions,
  dump_stan_math_signatures,
  stanc_version,
};
