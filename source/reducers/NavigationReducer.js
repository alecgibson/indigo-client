import { NavigationActions } from 'react-navigation';
import {AppNavigator} from "../navigators/AppNavigator";

import * as Navigate from "../actions/Navigate";

// Start with two routes: The Main screen, with the Login screen on top.
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
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
