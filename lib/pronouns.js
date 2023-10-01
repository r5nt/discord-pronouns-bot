const defaultPronouns = {
    primary: [
        {
            id: 'They/Them',
            style: 'Primary'
        },
        {
            id: 'She/Her',
            style: 'Primary'
        },
        {
            id: 'He/Him',
            style: 'Primary'
        }
    ],
    secondary: [
        {
            id: 'Any',
            style: 'Secondary'
        },
        {
            id: 'Ask Me',
            style: 'Secondary'
        }
    ]
};

const pronounsGlobalState = {};

export { defaultPronouns, pronounsGlobalState };