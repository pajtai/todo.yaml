#!/usr/bin/env node

if (process.argv.length > 2) {
    import("./src/cli-arguments.js");
} else {
    // Run in interactive mode if no arguments are passed in
    import("./src/cli-interactive.js");
}
