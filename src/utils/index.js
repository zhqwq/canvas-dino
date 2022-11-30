export function randomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// load images by searching DOM
export function loadImages(imageResources, isHDPI) {
    let images = {}
    let imagesSources = isHDPI ? imageResources.HDPI : imageResources.LDPI
    for(let image of imagesSources) {
        images[image.name] = document.getElementById(image.id)
    }
    return images
}

// load sound by searching DOM
export function loadSounds(soundsResources) {
    let sounds = {}
    Object.keys(soundsResources).forEach(k => sounds[k] = document.getElementById(soundsResources[k]))
    return sounds
}



