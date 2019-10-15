import { injectGlobal } from 'react-emotion';

export default () => injectGlobal`
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v14/S6u8w4BMUTPHjxsAXC-s.woff) format('woff');
  }
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 700;
    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v14/S6u_w4BMUTPHjxsI5wq_Gwfr.woff) format('woff');
  }
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    src: local('Lato Light'), local('Lato-Light'), url(https://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh7USSwaPGQ3q5d0N7w.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    src: local('Lato Light'), local('Lato-Light'), url(https://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh7USSwiPGQ3q5d0.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wWA.woff) format('woff');
  }
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPHw.woff) format('woff');
  }
`;
