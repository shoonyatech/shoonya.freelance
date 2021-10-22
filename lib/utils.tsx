export const isBlank = (str) => 
     (!str || /^\s*$/.test(str));


export const isArrayEmpty = (arr) => 
     Array.isArray(arr) && !arr.length


export const isObjEmpty = (object)  =>  Object.values(object).some(x => x === null  || x === '');

export const removeKey = (key, {[key]: _, ...rest}) => rest;
