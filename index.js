#!/usr/bin/env node

if (process.argv.length > 2) {
    import("./cli/index.js");
} else {
    // Run in interactive mode if no arguments are passed in
    import("./api/index.js");
}
