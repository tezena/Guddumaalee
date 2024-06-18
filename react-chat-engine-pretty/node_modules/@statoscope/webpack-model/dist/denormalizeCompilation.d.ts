import { NormalizationData, Webpack } from '../webpack';
import Compilation = Webpack.Compilation;
import RawModule = Webpack.RawModule;
export declare type ModulesMap = Map<number, RawModule>;
export declare type CompilationData = {
    id: string;
    data: {
        modules: ModulesMap;
    };
};
export declare type DenormalizationData = {
    links: NormalizationData['links'];
    data: {
        compilations: CompilationData[];
    };
};
export default function denormalizeCompilation<T extends Compilation>(json: T): T;
