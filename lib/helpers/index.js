const path = require('path');

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../')
}

// import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
// import { getProfileForm } from '@/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';

// E:\advanced-react\src\features\EditableProfileCard\ui\EditableProfileCard\EditableProfileCard.tsx

function shouldBeRelative(toFile, from) {
    if(isPathRelative(from)) {
        return false;
    }

    const fromArray = from.split('/')

    // console.log(fromArray)
    const fromLayer = fromArray[0];
    const fromSlice = fromArray[1];

    const layers = {
        'entities': 'entities',
        'features': 'features',
        'shared': 'shared',
        'pages': 'pages',
        'widgets': 'widgets',
    }

    if(!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    const normalizedPath = path.toNamespacedPath(toFile);
    const projectSource = normalizedPath.split('src')[1];
    const projectSourceArray = projectSource.split('\\')

    const toLayer = projectSourceArray[1];
    const toSlice = projectSourceArray[2];

    if(!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    return fromSlice === toSlice && toLayer === fromLayer;
}

module.exports = {
    isPathRelative, shouldBeRelative
}
