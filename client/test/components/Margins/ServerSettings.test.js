import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, it } from '@jest/globals';
import { VALID_CONFIG_RESPONSE, INVALID_REQUEST } from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import ServerSettings from '../../../src/components/Margins/ServerSettings';

describe('Server Settings Modal', () => {
    const validUrl = 'http://localhost:8000';
    const invalidUrl = 'BAD URL';
    const serverSettings = { 'serverUrl': validUrl, 'serverConfig': null };
    const toggleOpen = jest.fn();
    const processServerConfigSuccess = jest.fn();

    let inputBox;
    let saveButton;

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();

        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockResponse(VALID_CONFIG_RESPONSE);

        render(<ServerSettings
            isOpen={true}
            serverSettings={serverSettings}
            toggleOpen={toggleOpen}
            processServerConfigSuccess={processServerConfigSuccess}
        />);
        saveButton = screen.getByRole('button', { name: /continue/i });
    });

    it('renders', async () =>{
        render(<ServerSettings
            isOpen={true}
            serverSettings={serverSettings}
            toggleOpen={true}
            processServerConfigSuccess={processServerConfigSuccess}
        />);
    });
});
