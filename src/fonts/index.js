import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-display: swap;
        font-weight: 500;
        src: local('Montserrat'), local('Montserrat-Medium'), url(./Montserrat-Medium);
        src: local('Montserrat'), local('Montserrat-Medium'), url(./Montserrat-Medium.eot?#iefix) format('embedded-opentype');
        src: local('Montserrat'), local('Montserrat-Medium'), url(./Montserrat-Medium.woff2) format('woff2');
        src: local('Montserrat'), local('Montserrat-Medium'), url(./Montserrat-Medium.woff) format('woff');
        src: local('Montserrat'), local('Montserrat-Medium'), url(./Montserrat-Medium.ttf) format('truetype');
      }
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-display: swap;
        font-weight: 600;
        src: local('Montserrat'), local('Montserrat-SemiBold'), url(./Montserrat-SemiBold);
        src: local('Montserrat'), local('Montserrat-SemiBold'), url(./Montserrat-SemiBold.eot?#iefix) format('embedded-opentype');
        src: local('Montserrat'), local('Montserrat-SemiBold'), url(./Montserrat-SemiBold.woff2) format('woff2');
        src: local('Montserrat'), local('Montserrat-SemiBold'), url(./Montserrat-SemiBold.woff) format('woff');
        src: local('Montserrat'), local('Montserrat-SemiBold'), url(./Montserrat-SemiBold.ttf) format('truetype');
      }
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-display: swap;
        font-weight: normal;
        src: local('Montserrat'), local('Montserrat-Regular'), url(./Montserrat-Regular);
        src: local('Montserrat'), local('Montserrat-Regular'), url(./Montserrat-Regular.eot?#iefix) format('embedded-opentype');
        src: local('Montserrat'), local('Montserrat-Regular'), url(./Montserrat-Regular.woff2) format('woff2');
        src: local('Montserrat'), local('Montserrat-Regular'), url(./Montserrat-Regular.woff) format('woff');
        src: local('Montserrat'), local('Montserrat-Regular'), url(./Montserrat-Regular.ttf) format('truetype');
      }
    `,
    },
  },
});
