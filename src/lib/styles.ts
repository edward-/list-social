export const authTheme = {
  name: 'authTheme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
        secondary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: `0 0 16px #293254`,
          borderWidth: '0',
        },
        form: {
          padding: `1rem 2.0rem 1rem`,
        },
      },
      button: {
        primary: {
          backgroundColor: '#FBBF01',
          _active: {
            backgroundColor: '#293254',
            borderColor: '#293254',
          },
          _hover: {
            backgroundColor: '#293254',
            borderColor: '#293254',
          },
        },
        link: {
          color: '#293254',
          _active: {
            color: '#293254',
            backgroundColor: '#FEF8E5',
          },
          _hover: {
            color: '#293254',
            backgroundColor: '#FEF8E5',
          },
        },
      },
      fieldcontrol: {
        borderColor: '#FBBF01',
        _focus: {
          borderColor: '#FBBF01',
          boxShadow: `0 0 0 1px #FBBF01`,
        },
      },
      tabs: {
        item: {
          color: '#FBBF01',
          _active: {
            borderColor: '#FBBF01',
            color: '#FBBF01',
          },
          _hover: {
            borderColor: '#FBBF01',
            color: '#FBBF01',
          },
        },
      },
    },
  },
};
