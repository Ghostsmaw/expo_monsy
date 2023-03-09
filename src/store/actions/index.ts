// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as themeActions from './themeActions';
import * as userActions from './dashboardActions';
import * as transactionAction from './transactionAction';
import * as currencyAction from './currencyAction';
import * as commonActions from './commonActions';
import * as chartAction from './chartAction';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  themeActions,
  userActions,
  transactionAction,
  currencyAction,
  commonActions,
  chartAction
);
