// TODO: Address node rules evaluating against browser only files
/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line import/extensions, node/no-missing-import
import {dom, out, rule, ruleset, score, type} from 'fathom-web';

let coefficients = {
    'secret': [
        ['hasSecretParagraph', 0.0]
    ]
};

let biases = [
    ['secret', 0.0]
];

function caselessIncludes(haystack, needle) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

function hasSecretParagraph(fnode) {
    return caselessIncludes(fnode.element.innerText, 'secret');
}

function makeRuleset(coeffs, biases) {
    return ruleset(
        [
            rule(dom('html'), type('secret')),
            rule(type('secret'), score(hasSecretParagraph.bind(this)), {name: 'hasSecretParagraph'}),
            rule(type('secret'), out('secret'))
        ],
        coeffs,
        biases
    );
}

const trainees = new Map();
const VIEWPORT_SIZE = {width: 1680, height: 950};

const FEATURES = ['secret'];
for (const feature of FEATURES) {
    const ruleset = {
        coeffs: new Map(coefficients[feature]),
        viewportSize: VIEWPORT_SIZE,
        vectorType: feature,
        rulesetMaker: () => makeRuleset(
            [
                ...coefficients.secret,
            ],
            biases
        ),
    };
    trainees.set(feature, ruleset);
}

export default trainees;
