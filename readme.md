# sniffkin-session-processor: Session processor plugin for Sniff-kin Web MITM debugging proxy

[Sniff-kin](https://github.com/hylom/sniff-kin) plugin to manipulate request and response.

# Install

You can install this plugin using npm command.

```
$ npm i sniffkin-session-processor
```

# How to use

## Example 1: rewrite request url from '/' to '/hoge'

```javascript
import { SessionProcessorPlugin } from 'sniffkin-session-processor';
const sessionProcessor = new SessionProcessorPlugin();

sessionProcessor.setConditionForRequest(request => {
  return request.url == '/';
});

sessionProcessor.setRequestProcessor(request => {
  request.url = '/hoge';
});

```

# Interfaces

See [dist/session-processor-plugin.d.ts](./dist/session-processor-plugin.d.ts) and Sniff-kin's [session.d.ts](https://github.com/hylom/sniff-kin/blob/master/types/session.d.ts).

# License

MIT License.




