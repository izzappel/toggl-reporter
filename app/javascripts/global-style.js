import { injectGlobal } from 'styled-components';

import iconFontEot from './fonts/MaterialIcons/MaterialIcons-Regular.eot';
import iconFontWoff2 from './fonts/MaterialIcons/MaterialIcons-Regular.woff2';
import iconFontWoff from './fonts/MaterialIcons/MaterialIcons-Regular.woff';
import iconFontTtf from './fonts/MaterialIcons/MaterialIcons-Regular.ttf';

import robotoFontTtf from './fonts/Roboto/Roboto-Light.ttf';

injectGlobal`
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url('${iconFontEot}'); /* For IE6-8 */
    src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url('${iconFontWoff2}') format('woff2'),
    url('${iconFontWoff}') format('woff'),
    url('${iconFontTtf}') format('truetype');
  }
	
	@font-face {
    font-family: 'Roboto';
    src: url('${robotoFontTtf}');
	}

  * {
    font-family: Roboto, sans-serif;
  }
`;
