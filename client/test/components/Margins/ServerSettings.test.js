import '../../jestConfig/enzyme.config.js';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { expect, it } from '@jest/globals';
import { VALID_CONFIG_RESPONSE, INVALID_REQUEST } from '../../sharedMocks';
import ServerSettings from '../../../src/components/Margins/ServerSettings';

describe('Server Settings Modal', () => {
    let isOpen;
    const validUrl = 'http://localhost:8000';
    const inValidUrl = 'testUrl';
    const serverSettings = { 'serverUrl': validUrl, 'serverConfig': null };
    const toggleOpen = () => isOpen = !isOpen;
    const processServerConfigSuccess = jest.fn();
    let serverSettingsRender;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        isOpen = true;
        serverSettingsRender = render(<ServerSettings
            isOpen={isOpen}
            serverSettings={serverSettings}
            toggleOpen={toggleOpen}
            processServerConfigSuccess={processServerConfigSuccess}
        />);
    });

    it('updates input text onChange and disables save button with invalid url', async () => {
        const { getByDisplayValue } = serverSettingsRender;

        fireEvent.change(getByDisplayValue(validUrl), { target: { value: inValidUrl } });

        await waitFor(() => {
            expect(getByDisplayValue(inValidUrl).classList.contains('disabled'));
        });
    });

    it('disables save button on invalid Config response from url', async () => {
        const { getByDisplayValue, getByRole } = serverSettingsRender;
        fetch.mockResponseOnce(INVALID_REQUEST);
        fireEvent.change(getByDisplayValue(validUrl), { target: { value: validUrl } });

        await waitFor(() => {
            expect(getByRole('button', { name: /save/i }).classList.contains('disabled'));
        });

    });

    it('disables save button on config request rejection', async () => {
        const { getByDisplayValue, getByRole } = serverSettingsRender;
        fetch.mockRejectOnce(new Error('Rejected'));
        fireEvent.change(getByDisplayValue(validUrl), { target: { value: validUrl } });

        await waitFor(() => {
            expect(getByRole('button', { name: /save/i }).classList.contains('disabled'));
        });
    });

    it('save button is enabled with valid url', async () => {
        const { getByDisplayValue, getByRole } = serverSettingsRender;

        fireEvent.change(getByDisplayValue(validUrl), { target: { value: validUrl } });

        await waitFor(() => {
            expect(getByRole('button', { name: /save/i }).classList.contains('disabled')).toBeFalsy();
        });
    });
});
