import { parse } from './handler';
import { createServer } from 'http';

const xml = `<!--?xml version="1.0" encoding="UTF-8"?-->
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>dummy-blog</id>
  <entry>
    <title>Hello World!</title>
  </entry>
</feed>`;

test('should parse url', done => {
  const server = createServer((_, res) => {
    res.write(xml);
    res.end();
  });
  server.listen(async () => {
    let url = 'http://localhost';
    const addr = server.address();
    if (typeof addr !== 'string') {
      url += ':' + addr.port;
    }
    const output = await parse(url);
    server.close();
    expect(output).toEqual({
      items: [{
        title: 'Hello World!',
      }]
    });
    done();
  });
});

test('should parse xml', async () => {
  const output = await parse(xml);
  expect(output).toEqual({
    items: [{
      title: 'Hello World!',
    }]
  });
});
