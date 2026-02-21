import { Command } from "commander";

const program = new Command();
program.name("apis").version("2.0.0").description("APIs Collection CLI");

program
  .command("build")
  .description("Generate README.md, API pages, and dist/apis.json")
  .action(async () => {
    const { build } = await import("./commands/build.js");
    await build();
  });

program
  .command("validate")
  .description("Validate all collection/*.yaml files against schema")
  .action(async () => {
    const { validate } = await import("./commands/validate.js");
    await validate();
  });

program
  .command("move-to-graveyard")
  .description("Move inactive APIs from collection/ to graveyard/")
  .action(async () => {
    const { moveToGraveyard } = await import("./commands/move-to-graveyard.js");
    await moveToGraveyard();
  });

program
  .command("add")
  .description("Interactively add a new API")
  .action(async () => {
    const { add } = await import("./commands/add.js");
    await add();
  });

program
  .command("check-links")
  .description("Check all URLs in collection files")
  .action(async () => {
    const { checkLinks } = await import("./commands/check-links.js");
    await checkLinks();
  });

program
  .command("check-orphans")
  .description("Remove orphaned API directories")
  .action(async () => {
    const { checkOrphans } = await import("./commands/check-orphans.js");
    await checkOrphans();
  });

program
  .command("enrich")
  .description("Enrich library data from GitHub API")
  .action(async () => {
    const { enrich } = await import("./commands/enrich.js");
    await enrich();
  });

program.parseAsync(process.argv);
