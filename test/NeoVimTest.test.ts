import { VirtualEditor } from "./VirtualEditor";
import { Position, VimStyle } from "../src/VimStyle";
import { VimTests } from "./vim/VimTests";
import { exec } from "child_process";
import * as fs from 'async-file';
import * as assert from "assert";

for (let target in VimTests) {
    describe("NeoVim" + target, function () {
        this.timeout(500);
        let test = VimTests[target];
        for (let specName in test) {
            (function (specName) {
                it(specName, async function () {
                    let spec = test[specName];
                    let text = spec["in"][0];
                    for (let i = 1; i < spec["in"].length; i++) {
                        text += "\n" + spec["in"][i];
                    }
                    await fs.writeFile("NeoVimInput", text);
                    text = "/|\n";
                    text += ":normal x\n";
                    let list = spec["key"].split("_");
                    for (let i = 0; i < list.length; i++) {
                        text += ":exe \":normal " + list[i].replace("\n", "\\<CR>") + "\"\n";
                    }
                    text += ":normal i|\n";
                    text += ":w! NeoVimOutput\n";
                    text += ":q!\n";
                    await fs.writeFile("NeoVimKey", text);
                    await execAsync("nvim -u NONE -s NeoVimKey NeoVimInput");
                    text = await fs.readFile("NeoVimOutput");
                    let out = text.toString().split("\n");
                    let outText = out[0];
                    let specText = spec.out[0];
                    for (let i = 1; i < spec["out"].length; i++) {
                        outText += "\n" + out[i];
                        specText += "\n" + spec.out[i];
                    }
                    assert.equal(outText, specText);
                });
            })(specName);
        }
    });
}

function execAsync(cmd: string): Promise<void> {
    return new Promise<null>((resolve, reject) => {
        exec(cmd).on("exit", (code, signal) => {
            resolve(null);
        }).on("error", (err) => {
            reject(null);
        });
    });
}