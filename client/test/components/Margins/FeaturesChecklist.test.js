import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, it } from '@jest/globals';
import { VALID_CONFIG_RESPONSE, INVALID_REQUEST } from '../../sharedMocks';
import { LOG } from '../../../src/utils/constants';
import FeaturesChecklist from '../../../src/components/Margins/FeaturesChecklist';

describe('Server Settings Modal', () => {
    const validUrl = 'http://localhost:8000';
    const invalidUrl = 'BAD URL';
    const toggleOpen = jest.fn();
    const features = ["config", "find"];
    const supportedFeatures = ["config", "find"];

    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();

        jest.spyOn(LOG, 'error').mockImplementation(() => {});
        fetch.mockResponse(VALID_CONFIG_RESPONSE);

        render(<FeaturesChecklist
            isOpen={true}
            features={features}
            toggleOpen={toggleOpen}
            supportedFeatures={supportedFeatures}
        />);
    });

    it('renders', async () =>{
        render(<FeaturesChecklist
            isOpen={true}
            features={features}
            toggleOpen={true}
            supportedFeatures={supportedFeatures}
        />);
    });
});
