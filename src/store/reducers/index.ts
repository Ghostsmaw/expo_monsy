/*
 * combines all th existing reducers
 */
import * as themeReducer from './themeReducer';
import * as loadingReducer from './loadingReducer';
import * as masterReducer from './masterReducer';
import * as dataReducer from './dataReducer';
import * as chartReducer from './chartReducer'
export default Object.assign(loadingReducer, themeReducer, dataReducer, masterReducer, chartReducer);
