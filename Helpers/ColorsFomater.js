export const formatColors = (colorString) => {
    return colorString.replace(/([a-z])([A-Z])/g, '$1, $2');
}