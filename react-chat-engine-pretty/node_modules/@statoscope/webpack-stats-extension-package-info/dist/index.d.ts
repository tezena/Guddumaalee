import { Compiler } from 'webpack';
import { ExtensionDescriptor } from '@statoscope/stats/spec/extension';
import Generator, { Format, Payload } from '@statoscope/stats-extension-package-info/dist/generator';
import { StatsExtensionWebpackAdapter } from '@statoscope/webpack-model';
export default class WebpackCompressedExtension implements StatsExtensionWebpackAdapter<Payload> {
    descriptor: ExtensionDescriptor;
    generator: Generator;
    getExtension(): Format;
    handleCompiler(compiler: Compiler, context?: string): void;
}
