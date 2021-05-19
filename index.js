#!/usr/bin/env node

if (process.argv.length <= 2 || /\.yaml$/.test(process.argv[2])) {
    // Run in interactive mode if no arguments are passed in
    import("./api/index.js");
} else {
    import("./cli/index.js");
}
