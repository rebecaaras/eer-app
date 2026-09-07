// Source - https://stackoverflow.com/a/74838145
// Posted by Alex Wayne, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-11, License - CC BY-SA 4.0

import * as repl from 'node:repl';

const replServer = repl.start('> ')
replServer.context.thingYouWantToBeLocal = { abc: 123 };