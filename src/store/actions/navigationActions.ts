/*
 * Reducer actions related with navigation
 */
import NavigationService from '../../navigation/NavigationService';
import ROUTES from '@utils/routes';

export function navigateToHome(params: any) {}

export function navigateToForgotPassword(params?: any) {}

export function navigateToBottomMain(params: any) {
  NavigationService.reset(ROUTES.BottomMainTab, params);
}