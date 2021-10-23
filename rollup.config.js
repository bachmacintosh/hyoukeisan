import fs from "fs";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import banner from 'rollup-plugin-banner';

const extensions = [".ts", ".js"];
let bannerText = `wanikani-gs v<%= pkg.version %>

`;

try {
    const data = fs.readFileSync('LICENSE', 'utf8');
    bannerText += data;
} catch (err) {
    console.error(err)
}

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