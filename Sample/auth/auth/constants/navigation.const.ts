import { AllowedNavigation } from '../types/authTypes.type';

//** THIS IS FOR TESTING/DEVELOPMENT ONLY */

export const OMG_USER_NAVIGATION: AllowedNavigation = {
    mainMenu: ['dashboard', 'searchClient', 'accounts'],
    salesAndTeam: ['unsuccessfulCAM', 'deviation'],
    other: ['loanCalculator', 'reports']
};

export const CRR_USER_NAVIGATION: AllowedNavigation = {
    mainMenu: ['dashboard', 'searchClient', 'myWorkloads', 'accounts', 'leadsVerification'],
    salesAndTeam: ['unsuccessfulCAM'],
    other: ['loanCalculator', 'reports']
};

export const BSA_USER_NAVIGATION: AllowedNavigation = {
    mainMenu: ['dashboard', 'accounts', 'leadsVerification'],
    salesAndTeam: ['salesChannel', 'loanConsultants', 'dealer', 'unsuccessfulCAM', 'deviation'],
    other: ['loanCalculator', 'reports']
};

export const OMG_SUPERVISOR_NAVIGATION: AllowedNavigation = {
    mainMenu: ['dashboard', 'searchClient', 'managedAccounts', 'releasedAccounts'],
    salesAndTeam: ['teamOverview', 'unsuccessfulCAM', 'deviation'],
    other: ['loanCalculator', 'reports']
};

export const RET_SUPERVISOR_NAVIGATION: AllowedNavigation = {
    mainMenu: ['dashboard', 'searchClient', 'managedAccounts', 'releasedAccounts', 'releasedAccounts', 'leadsVerification'],
    salesAndTeam: ['accountsOrigin', 'teamOverview', 'unsuccessfulCAM', 'deviation'],
    other: ['loanCalculator', 'reports']
};

export const SALES_REPRESENTATIVE_NAVIGATION: AllowedNavigation = {
    mainMenu: [],
    other: [],
    salesAndTeam: []
};
