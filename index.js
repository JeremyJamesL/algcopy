#!/usr/bin/env node
import meow from "meow";
import ora from "ora";
import chalk from "chalk";
import cliErrorHandler from "cli-error-handler";
import cliHandleUnhandled from "cli-handle-unhandled";
import algoliasearch from "algoliasearch";
import { accountCopyIndex } from "@algolia/client-account";

const cyan = chalk.cyan;
const green = chalk.green;
const yellow = chalk.yellow;
const dim = chalk.dim;

const spinner = ora({ text: "" });

const helpText = `
    Commands
    ${cyan(`help`)}      Show CLI help information

    Flags
    ${yellow(`--app1`)}    First algolia appID 
    ${yellow(`--app2`)}    Second algolia appID 
    ${yellow(`--key1`)}    First algolia write ${dim(
  `Make sure API key has addObject ACL`
)}
    ${yellow(`--app2`)}    Second algolia appID ${dim(
  `Make sure API key has addObject ACL`
)}

    Examples
    ${green(
      `npx algcopy --app1 <APP1ID> --app2 <APP2ID> --key1 <KEY1> --key2 <KEY2>`
    )}
    
`;

const options = {
  importMeta: import.meta,
  flags: {
    app1: {
      type: "string",
      isRequired: true,
    },
    app2: {
      type: "string",
      isRequired: true,
    },
    key1: {
      type: "string",
      isRequired: true,
    },
    key2: {
      type: "string",
      isRequired: true,
    },
  },
};

const cli = meow(helpText, options);

const index1 = algoliasearch(cli.flags.app1, cli.flags.key1).initIndex(
  "prod_ECOM"
);
const index2 = algoliasearch(cli.flags.app2, cli.flags.key2).initIndex(
  "prod_comm"
);

try {
  spinner.start("Copying index between apps");
  await accountCopyIndex(index1, index2);
  spinner.succeed("Finished copying index");
} catch (err) {
  spinner.stop();
  cliErrorHandler("Failed the copy", err);
}

cliHandleUnhandled();
