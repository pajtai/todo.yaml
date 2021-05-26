#!/usr/bin/env node

import configs from "./configs.js";

if (process.argv.length <= 2 || /\.yaml$/.test(process.argv[2])) {
    // Run in interactive mode if no arguments are passed in
    configs.CLI = false;
    import("./api/index.js");
} else {
    configs.CLI = true;
    import("./cli/index.js");
}
