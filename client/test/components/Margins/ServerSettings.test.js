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
    const toggleOpen = jest.fn();
    const features = ["config", "find"];

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();

        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockResponse(VALID_CONFIG_RESPONSE);

        render(<ServerSettings
            isOpen={true}
            features={features}
            toggleOpen={toggleOpen}
            
        />);
    });

    it('renders', async () =>{
        render(<ServerSettings
            isOpen={true}
            features={features}
            toggleOpen={true}
            
        />);
    });
});
