'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server');

describe('GET /', () => {
    let server;
    const expectedResponseCode = 200;
    const expectedContent = 'ArmedStats server';

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        expect(res.statusCode).to.equal(expectedResponseCode);
    });

    it('has expected content', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        expect(res.payload).to.equal(expectedContent);
    });
});
