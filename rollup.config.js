import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import banner from 'rollup-plugin-banner';

const extensions = [".ts", ".js"];
const bannerText = `wanikani-gs v<%= pkg.version %>
Copyright (c) 2021 Collin Bachman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const preventThreeShakingPlugin = () => {
    return {
        name: 'no-threeshaking',
        resolveId(id, importer) {
            if (!importer) {
                // let's not treeshake entry points, as we're not exporting anything in App Scripts
                return {id, moduleSideEffects: "no-treeshake" }
            }
            return null;
        }
    }
}

export default {
    input: "./src/index.ts",
    output: {
        dir: "build",
        format: "cjs",
    },
    plugins: [
        preventThreeShakingPlugin(),
        banner(bannerText),
        nodeResolve({
            extensions,
            mainFields: ['jsnext:main', 'main']
        }),
        babel({ extensions, babelHelpers: "runtime" }),
    ],
};