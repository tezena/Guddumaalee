export declare type ContainerItem<TData, TAPI> = {
    version: string;
    apiFactory: APIFactory<TData, TAPI>;
};
export declare type APIFactory<TData, TAPI> = (data: TData) => TAPI;
export default class Container {
    private extensions;
    register(name: string, version: string, apiFactory: APIFactory<any, any>): void;
    resolve<TAPI>(name: string): ContainerItem<unknown, TAPI> | null;
}
