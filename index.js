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
    ${yellow(`--index1`)}    First algolia index 
    ${yellow(`--index2`)}    Second algolia index ${dim(
  `If index doesn't exist, one will be create for you`
)}
    
    Examples
    ${green(
      `npx algcopy --app1 <APP1ID> --app2 <APP2ID> --key1 <KEY1> --key2 <KEY2> --index1 <INDEX1> --index2 <INDEX2>`
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
    index1: {
      type: "string",
      isRequired: true,
    },
    index2: {
      type: "string",
      isRequired: true,
    },
  },
};

const cli = meow(helpText, options);

cliHandleUnhandled();

const index1 = algoliasearch(cli.flags.app1, cli.flags.key1).initIndex(
  cli.flags.index1
);
const index2 = algoliasearch(cli.flags.app2, cli.flags.key2).initIndex(
  cli.flags.index2
);

try {
  spinner.start("Copying index between apps");
  await accountCopyIndex(index1, index2);
  spinner.succeed("Finished copying index");
} catch (err) {
  spinner.stop();
  cliErrorHandler("Failed the copy", err);
}
