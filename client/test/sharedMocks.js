export const VALID_CONFIG_RESPONSE = JSON.stringify({
    requestType: 'config',
    serverName: 't99',
    features: ['config']
});

export const INVALID_REQUEST = JSON.stringify({ invalid: 'this is an invalid response to fail the schema' });

export const MOCK_PLACES = [
    { name: 'Place A', lat: 40.0, lng: 50.0 },
    { name: 'Place B', lat: 45.0, lng: 55.0 }
];