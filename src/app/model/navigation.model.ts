import { IRouterData } from "../../types/INavigation"

export class NavigationModel {
  static baseUrl: string = `http://localhost:5000/api` 

  static routes : Array<IRouterData> = [
      {
        name: "Микрочип",
        isShown: true,
        analytics: [{
          name: "битность",
          url: "main/template/microchips/bitdepthvalue"
        },
        {
          name: "битность1",
          url: "main/template/microchips/bitdepthvalue1"
        }]
      },
  ]
}

