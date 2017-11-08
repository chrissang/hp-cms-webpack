export const hpMixins = {
    methods: {
        displayGroup: function(arry) {
            var sectionArray = [];
            arry.forEach((el,i) => {
                sectionArray.push(el.displayModuleOn);
            })
            if (sectionArray.indexOf('small') > -1) {
                return 'small';
            } else if (sectionArray.indexOf('medium') > -1) {
                return 'medium';
            } else if (sectionArray.indexOf('large') > -1) {
                return 'large';
            } else {
                return 'xlarge';
            }
        },
        displayOn: function(displayModuleOn,viewPortSize) {
            return {
                'small': viewPortSize === 'small' || viewPortSize === 'medium' || viewPortSize === 'large' || viewPortSize === 'xlarge' ? true : false,
                'medium': viewPortSize === 'medium' || viewPortSize === 'large' || viewPortSize === 'xlarge' ? true : false,
                'large': viewPortSize === 'large' || viewPortSize === 'xlarge' ? true : false,
                'xlarge': viewPortSize === 'xlarge' ? true : false
            }[displayModuleOn]
        },
        productImgPath: function(itemId) {
            var itemDir = 'https://www.uncommongoods.com/images/items/';
            var itemIdTrim = itemId.toString().slice(0, -2);
            return itemDir+itemIdTrim+'00/'+itemId+'_1_180px.jpg 180w, ' + itemDir+itemIdTrim+'00/'+itemId+'_1_360px.jpg 360w, ' + itemDir+itemIdTrim+'00/'+itemId+'_1_640px.jpg 640w, ' + itemDir+itemIdTrim+'00/'+itemId+'_1_1200px.jpg 1200w';
        },
        productImgPathSrc: function(itemId,size) {
            var itemDir = 'https://www.uncommongoods.com/images/items/';
            var itemIdTrim = itemId.toString().slice(0, -2);

            if (size === 180) {
                return itemDir+itemIdTrim+'00/'+itemId+'_1_180px.jpg';
            }
            if (size === 360) {
                return itemDir+itemIdTrim+'00/'+itemId+'_1_360px.jpg';
            }
            if (size === 640) {
                return itemDir+itemIdTrim+'00/'+itemId+'_1_640px.jpg';
            }
            if (size === 1200) {
                return itemDir+itemIdTrim+'00/'+itemId+'_1_1200px.jpg';
            }
        },
        responsiveImage: function(itemId, largeImage, smallImage) {
            var responsiveValue;
            var largeImageSize = largeImage.split('_').pop().split('.')[0].slice(0, -2);
            var smallImageSize = smallImage.split('_').pop().split('.')[0].slice(0, -2);
            responsiveValue = smallImageSize ? smallImage + ' ' + smallImageSize + 'w, ' : '';
            responsiveValue += largeImageSize ? largeImage + ' ' + largeImageSize + 'w' : '';
            responsiveValue += smallImageSize === '' && largeImageSize === '' ? this.productImgPath(itemId) : '';

            return responsiveValue;
        },
        classNameBlockGrid: function(sectionData,viewPortSize) {
            var nonHiddenModuleSections = [];
            if (viewPortSize === 'small') {
                return 'small-6 columns';
            } else if(viewPortSize === 'medium') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'medium-3 columns',
                    '6': 'medium-2 columns'
                }[nonHiddenModuleSections.length];

            } else if(viewPortSize === 'large') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'large-3 columns',
                    '6': 'large-2 columns'
                }[nonHiddenModuleSections.length];
            } else {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '4': 'medium-3 columns',
                    '6': 'medium-2 columns'
                }[nonHiddenModuleSections.length];
            }
        },
        className: function(sectionData) {
            var nonHiddenModuleSections = [];
            if(this.viewportSize === 'large') {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            } else {
                sectionData.forEach((module,index) => {
                    if (module.displayModuleOn === 'small' || module.displayModuleOn === 'medium' || module.displayModuleOn === 'large' || module.displayModuleOn === 'xlarge') {
                        nonHiddenModuleSections.push(module.displayModuleOn)
                    }
                })
                return {
                    '2': 'large-6 columns',
                    '3': 'large-4 columns',
                    '4': 'large-6 columns'
                }[nonHiddenModuleSections.length];
            }
        },
        isEven: function(index) {
            return index % 2 === 0 ? true : false
        }
    }
}
