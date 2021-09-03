import '../jestConfig/enzyme.config.js';

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { CLIENT_TEAM_NAME } from '../../src/utils/constants';
import { VALID_CONFIG_RESPONSE } from '../sharedMocks';
import Page from '../../src/components/Page';

describe('Page', () => {
    let pageRender;

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        pageRender = render(<Page />);
    });

    it('renders the headers', async () => {
        const { getAllByRole } = pageRender;
        await waitFor(() => {
            expect(getAllByRole('heading', { name: /T[0-9][0-9]/i })[0].textContent).toBe(CLIENT_TEAM_NAME);
        })
    });

    it('closes map and opens about when header is clicked', async () => {
        const { getByRole, getByTestId } = pageRender;

        await waitFor(() => {
            expect(getByTestId('planner-collapse').classList.contains('show')).toBeTruthy();
        });

        fireEvent.click(getByRole('button', { name: /T[0-9][0-9]/i }));

        await waitFor(() => {
            expect(getByTestId('planner-collapse').classList.contains('show')).toBeFalsy();
            expect(getByRole('button', { name: /close/i }).textContent).toBe('Close');
        });
    });
});
