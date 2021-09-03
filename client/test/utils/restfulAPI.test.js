import '../jestConfig/enzyme.config.js';
import { describe, expect, it } from "@jest/globals";
import { getOriginalServerUrl, sendAPIRequest } from '../../src/utils/restfulAPI';
import { VALID_CONFIG_RESPONSE, INVALID_REQUEST } from '../sharedMocks'
describe('restfulAPI', () => {
    it('sendAPIRequest works as expected', async () => {
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(VALID_CONFIG_RESPONSE));
    });

    it('sendAPIRequest response is not ok', async () => {
        fetch.mockResponse(INVALID_REQUEST, { status: 404, ok: false, statusText: 'This is what we expect' });
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
    });

    it('sendAPIRequest response is rejected', async () => {
        fetch.mockReject(new Error('Expected rejection'));
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
    });

    it('sendAPIRequest schema not implement', async () => {
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        expect(sendAPIRequest({ requestType: 'notValid' })).rejects.toThrow();
    });

    it('sendAPIRequest schema not implement', async () => {
        fetch.mockResponse(INVALID_REQUEST);
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
    });

    it('getOriginalServerUrl', async () => {
        process.env.SERVER_PORT = '3113';
        expect(getOriginalServerUrl()).toEqual('http://localhost:3113');
    });
});