// home
export const HOME_ROUTE = '/home';
export const homeList = (parent = HOME_ROUTE) => `${parent}/list`;

// eval
export const visibilityRoute = (token = ':token') => `/eval/${token}`;
export const policiesRoute = (token = ':token') => `/eval/${token}/policy`;
export const legalAspectsRoute = (token = ':token') => `/eval/${token}/legal_aspects`;
export const metadataRoute = (token = ':token') => `/eval/${token}/metadata`;
export const interoperabilityRoute = (token = ':token') => `/eval/${token}/interoperability`;
export const securityRoute = (token = ':token') => `/eval/${token}/security`;
export const statsRoute = (token = ':token') => `/eval/${token}/stats`;
export const servicesRoute = (token = ':token') => `/eval/${token}/services`;
export const summaryRoute = (token = ':token') => `/eval/${token}/summary`;

export const getRouteBySection = {
    visibility: visibilityRoute,
    policy: policiesRoute,
    legal_aspects: legalAspectsRoute,
    metadata: metadataRoute,
    interoperability: interoperabilityRoute,
    security: securityRoute,
    statistics: statsRoute,
    services: servicesRoute,
};