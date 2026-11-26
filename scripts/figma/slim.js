const fs = require('fs');
const msg = JSON.parse(fs.readFileSync('doc.json', 'utf8'));
const drop = ['fillGeometry', 'strokeGeometry', 'vectorData', 'derivedSymbolData', 'symbolOverrides', 'pluginData', 'derivedTextData', 'guides', 'ancestorPathBeforeDeletion', 'libraryMoveInfo', 'componentPropDefs', 'componentPropRefs', 'componentPropAssignments', 'prototypeInteractions', 'layoutGrids', 'exportSettings', 'variableDataValues', 'parameterConsumptionMap'];
for (const n of msg.nodeChanges) { for (const k of drop) delete n[k]; if (n.textData) n.textData = { characters: n.textData.characters }; }
fs.writeFileSync('doc-slim.json', JSON.stringify({ nodeChanges: msg.nodeChanges }));
