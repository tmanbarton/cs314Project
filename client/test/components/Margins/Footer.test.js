import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, it, jest, expect } from '@jest/globals';
import { VALID_CONFIG_RESPONSE } from '../../sharedMocks';
import Footer from '../../../src/components/Margins/Footer';

describe('Footer', () => {
    const processServerConfigSuccess = jest.fn();
    const serverSettings = {
        serverConfig: { 'requestType': 'config', 'serverName': 't99' },
        serverUrl: 'http://localhost:8000'
    };

    let serverSettingsLink;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(VALID_CONFIG_RESPONSE);

        render(<Footer
            serverSettings={serverSettings}
            processServerConfigSuccess={processServerConfigSuccess}
        />);

        serverSettingsLink = screen.getByText(`(${serverSettings.serverUrl}).`);
    });

    it('renders', async () =>{
        render(<Footer
                    serverSettings={serverSettings}
                    processServerConfigSuccess={processServerConfigSuccess}
                />);
    });

    it('opens ServerSettings on link pressed and closes on continue button', async () => {
        user.click(serverSettingsLink);

        const continueButton = screen.getByRole('button', { name: /continue/i });
        user.click(continueButton);

        await waitFor(() => {
            expect(screen.queryByDisplayValue(serverSettings.serverUrl)).toBe(null);
        });

    });

    it('opens dropdown on click', async () =>{
        const dropdown = screen.getByTestId('interop-dropdown');
        const dropdownMenu = screen.getByTestId('interop-dropdown-menu');
        user.click(dropdown);

        await waitFor(()=>{
            expect(dropdownMenu).toBeTruthy();
        });
        
    });

    // it('opens ServerSettings on link pressed and saves on close button', async () => {
    //     user.click(serverSettingsLink);

    //     const saveButton = screen.getByRole('button', { name: /save/i });
    //     await waitFor(() => {
    //         expect(saveButton.classList.contains("disabled")).toBe(false);
    //     });
    //     user.click(saveButton);

    //     await waitFor(() => {
    //         const modalInput = screen.queryByDisplayValue(serverSettings.serverUrl);
    //         expect(modalInput).not.toBeInTheDocument();
    //     });
    // });
});