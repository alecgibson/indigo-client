import { NavigationActions } from 'react-navigation';
import {AppNavigator} from "../navigators/AppNavigator";

import * as Navigate from "../actions/Navigate";

const splashScreenAction = AppNavigator.router.getActionForPathAndParams('Splash');
const initialNavState = AppNavigator.router.getStateForAction(splashScreenAction);

export default function nav(state = initialNavState, action) {
  if (action.type !== Navigate.TYPE) {
    return state;
  }

  let nextState;
  switch (action.navigation.target) {
  case 'Login':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Login' }),
      state
    );
    break;
  case 'Register':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Register' }),
      state
    );
    break;
  case 'Map':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Map' }),
      state
    );
    break;
  case 'Battle':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Battle' }),
      state
    );
    break;
  default:
    nextState = AppNavigator.router.getStateForAction(action, state);
    break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
