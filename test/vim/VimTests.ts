import { LeftRightMotions } from "./LeftRightMotions";
import { UpDownMotions } from "./UpDownMotions";
import { TextObjectMotions } from "./TextObjectMotions";
import { InsertModeTests } from "./InsertModeTests";
import { ChangingText } from "./ChangingText";
import { DeletingText } from "./DeletingTextTests";
import { CopyAndMovingTextTests } from "./CopyAndMovingTextTests";
import { RepeatTests } from "./RepeatTests";

export let VimTests = {};
let testsets = [
    LeftRightMotions,
    UpDownMotions,
    TextObjectMotions,
    InsertModeTests,
    ChangingText,
    DeletingText,
    CopyAndMovingTextTests,
    RepeatTests
];

for (let testset in testsets) {
    for (let test in testsets[testset]) {
        VimTests[test] = testsets[testset][test];
    }
}