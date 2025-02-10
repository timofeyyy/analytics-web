export interface IRouterData {
    name: string
    isShown: boolean 
    analytics: Array<IRouterDataAnalytics>
}

interface IRouterDataAnalytics {
    url: string
    name: string
}
