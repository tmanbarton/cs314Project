import '../jestConfig/enzyme.config.js';

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, it } from '@jest/globals';
import App from '../../src/components/App';

describe('App', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('bad connection shows snackbar', async () => {
        fetch.mockReject(() => "API is down (expected).");

        const { findByText } = render(<App />);
        await findByText(/failed/i);
    });
});

