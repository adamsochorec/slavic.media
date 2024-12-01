import * as Chai from "chai";

declare module "chai" {
  interface ChaiStatic {
    /**
     * Initiates an HTTP request.
     */
    request: (server: any) => ChaiHttp.Agent;
  }

  namespace ChaiHttp {
    interface Agent {
      post(url: string): Request;
      get(url: string): Request;
      delete(url: string): Request;
      patch(url: string): Request;
      put(url: string): Request;
      set(field: string, value: string): Request;
      send(body: any): Request;
      end(callback: (err: any, res: any) => void): void;
    }

    interface Request {
      set(field: string, value: string): this;
      send(body: any): this;
      end(callback: (err: any, res: any) => void): void;
    }
  }
}
