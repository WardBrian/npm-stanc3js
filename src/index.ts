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
new Function(rawStancJS)();

// the legacy/catchall entrypoint
let stanc: StancFunction;
let dump_stan_math_distributions: () => string;
let dump_stan_math_signatures: () => string;

// the newer entrypoints have much more specific types
export type Position = { line: number; column: number };

export type Diagnostic = {
  severity: "help" | "error" | "warning" | "note" | "bug";
  message: string;
  error_code?: string;
  labels: {
    range: {
      source?: string;
      start: Position;
      end: Position;
    };
    priority: "primary" | "secondary";
    message: string;
  }[];
  notes: string[];
};

export type CheckResult = {
  errors: Diagnostic[];
  warnings: Diagnostic[];
};

let check_model: (...args: Parameters<StancFunction>) => CheckResult;

export type FormatResult = CheckResult & {
  result: string | undefined;
};

let format_model: (...args: Parameters<StancFunction>) => FormatResult;

export type InfoType = {
  dimensions: number;
  type: "real" | "int" | "complex" | InfoType[];
};

export type StanVariables = {
  [key: string]: InfoType;
};

export type InfoResult = CheckResult & {
  result: {
    inputs: StanVariables;
    parameters: StanVariables;
    "transformed parameters": StanVariables;
    "generated quantities": StanVariables;
    functions: string[];
    distributions: string[];
    included_files: string[];
  };
};

let model_info: (...args: Parameters<StancFunction>) => InfoResult;

let stanc_version: string;

// stanc.js also detects if it is running under node, which makes loading even more annoying

if (typeof module === "object" && module.exports) {
  // node
  stanc = module?.exports?.stanc;
  dump_stan_math_distributions = module?.exports?.dump_stan_math_distributions;
  dump_stan_math_signatures = module?.exports?.dump_stan_math_signatures;
  check_model = module?.exports?.check_model;
  format_model = module?.exports?.format_model;
  model_info = module?.exports?.model_info;
  stanc_version = module?.exports?.version;
}
// @ts-expect-error
if (typeof stanc === "undefined") {
  // fallback/browser
  stanc = (globalThis as any).stanc;
  dump_stan_math_distributions = (globalThis as any)
    .dump_stan_math_distributions;
  dump_stan_math_signatures = (globalThis as any).dump_stan_math_signatures;
  check_model = (globalThis as any).check_model;
  format_model = (globalThis as any).format_model;
  model_info = (globalThis as any).model_info;
  stanc_version = (globalThis as any).version;
}

export {
  stanc,
  dump_stan_math_distributions,
  dump_stan_math_signatures,
  check_model,
  format_model,
  model_info,
  stanc_version,
};
