import { NavigationActions } from 'react-navigation';

import {AppNavigator} from "../screens-old/Navigator";

// Start the app with the map at the bottom of the stack, and a login page on top
const baseAction = AppNavigator.router.getActionForPathAndParams('Map');
const temporaryNavigationState = AppNavigator.router.getStateForAction(baseAction);
const loginAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavigationState = AppNavigator.router.getStateForAction(loginAction, temporaryNavigationState);

export default function nav(state = initialNavigationState, action) {
  let nextState;

  switch(action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
