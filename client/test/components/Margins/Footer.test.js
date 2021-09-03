import '../../jestConfig/enzyme.config.js';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, jest } from '@jest/globals';
import { VALID_CONFIG_RESPONSE } from '../../sharedMocks';
import Footer from '../../../src/components/Margins/Footer';

describe('Footer', () => {
    const processServerConfigSuccess = jest.fn();
    let footerRender;
    const serverSettings = {
        serverConfig: { 'requestType': 'config', 'serverName': 't99' },
        serverUrl: 'http://localhost:8000'
    };

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        footerRender = render(<Footer
            serverSettings={serverSettings}
            processServerConfigSuccess={processServerConfigSuccess}
        />);
    });

    it('opens ServerSettings on link pressed and closes on cancel button', async () => {
        const { getByText, queryByDisplayValue, getByRole } = footerRender;

        fireEvent.click(getByText(`(${serverSettings.serverUrl}).`));

        await waitFor(() => {
            expect(queryByDisplayValue(serverSettings.serverUrl)).toBeTruthy();
        });

        fireEvent.click(getByRole('button', { name: /cancel/i }));

        await waitFor(() => {
            expect(queryByDisplayValue(serverSettings.serverUrl)).toBeFalsy();
        });
    });

    it('opens ServerSettings on link pressed and saves on close button', async () => {
        const { getByText, queryByDisplayValue, getByRole } = footerRender;

        fireEvent.click(getByText(`(${serverSettings.serverUrl}).`));

        await waitFor(() => {
            expect(queryByDisplayValue(serverSettings.serverUrl)).toBeTruthy();
        });

        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(queryByDisplayValue(serverSettings.serverUrl)).toBeFalsy();
        });
    });
});
