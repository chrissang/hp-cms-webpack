<template>
    <div class="row">
        <div class="small-12 columns">
            <button v-on:click="createNewHomePage()">Create New Home Page</button>
            <button v-on:click="loadHomePage()">Load Home Page</button>
            <button>Preview Home Page</button>
        </div>
        <div class="small-12 medium-6 columns">
            <select v-model="selectedModule">
                <option value="Choose Module Type">Choose Module Type</option>
                <option v-for="module in moduleList" :value="module.value" v-html="module.name"></option>
            </select>
        </div>
        <div class="small-12 medium-6 columns">
            <button v-on:click="createModule()">Create Module</button>
            <button v-on:click="saveClick()">Save</button>
        </div>

        <div class="small-12 columns">
            <ul id="sortableContainer">
                <component v-for="(module, index) in createdModuleList" :is="module.type" :component-data="module.data"></component>
            </ul>
        </div>
    </div>
</template>

<script>
import { hpCmsMixins } from '../hpCmsMixin';
import HpCmsLargeFeatureModule from './Modules/LargeFeature.vue';
import HpCmsSmallFeatureModule from './Modules/SmallFeature.vue';
import HpCmsBasicStoryModule from './Modules/BasicStory.vue';
import HpCmsExtendedStoryModule from './Modules/ExtendedStory.vue';
import HpCmsCollectionGridModule from './Modules/CollectionGrid.vue';
import HpCmsTextLinkModule from './Modules/TextLink.vue';
import HpCmsImageLinkDoubleModule from './Modules/ImageLinkDouble.vue';
import HpCmsButtonLinkDoubleModule from './Modules/ButtonLinkDouble.vue';
import HpCmsSeoLinkModule from './Modules/SeoLink.vue';

export default {
    mixins: [ hpCmsMixins ],
    data () {
        return {
            loadedData: {},
            selectedModule: 'Choose Module Type',
            moduleList: [
                { name: 'Large Feature (LF)', value: 'large-feature-module' },
                { name: 'Small Feature (SF)', value: 'small-feature-module' },
                { name: 'Basic Story (BS)', value: 'basic-story-module' },
                { name: 'Extended Story (ES)', value: 'extended-story-module' },
                { name: 'Collection Grid (CG)', value: 'collection-grid-module' },
                { name: 'Text Link (TL)', value: 'text-link-module' },
                { name: 'Image Link Double (LD)', value: 'image-link-double-module' },
                { name: 'Button Link Double (BD)', value: 'button-link-double-module' },
                { name: 'SEO Links (SEO)', value: 'seo-link-module' }
            ],
            createdModuleList: []
        }
    },
    methods: {
        createModule() {
            if (this.selectedModule != 'Choose Module Type') {
                this.createdModuleList.push({
                    'type': this.selectedModule,
                    'data': null
                })
            }
        },
        loadHomePage() {
            var dateSelected;
            var self = this;

            if (!Modernizr.inputtypes.date) {
                dateSelected = document.getElementById('jQueryDatepicker').value;
            } else {
                dateSelected = document.getElementById('defaultDatepicker').value;
            }

            document.getElementById('sortableContainer').innerHTML = '';

            $.getJSON( "../../json/"+dateSelected+".json", (data) => {
                this.mappingOrder = {};
                this.loadedData = data;
                Object.keys(this.loadedData).forEach((alphaKey,index) => {
                    Object.keys(this.loadedData[alphaKey]).forEach((moduleKey) => {
                        switch (moduleKey) {
                            case 'seo-link-module':
                            case 'collection-grid-module':
                            case 'text-link-module':
                            case 'button-link-double-module':
                            case 'image-link-double-module':
                                this.createdModuleList.push({
                                    'type': moduleKey,
                                    'data': this.loadedData[alphaKey][moduleKey]
                                })
                            break;
                            default:
                                this.loadedData[alphaKey][moduleKey]['sections'].forEach((section, index) => {
                                    this.createdModuleList.push({
                                        'type': moduleKey,
                                        'data': section
                                })
                            });
                        }
                    })
                })
            });
        },
        createNewHomePage() {
            window.location.reload();
        },
        cleanImagePath(image) {
            if (image === null) {
                return '';
            } else {
                image = image.replace(/https:\/\/www.uncommongoods.com/g, "").replace(/\s+/g,"").replace(/é/g, "e").trim();
                if (image != '') {
                    return '/images/hp/B'+image;
                } else {
                    return '';
                }
            }
        },
        cleanUrl(url) {
            if (url === null) {
                return '';
            } else {
                return url.replace(/https:\/\/www.uncommongoods.com/g, "").replace(/http:\/\/blog.uncommongoods.com/g, "//blog.uncommongoods.com").replace(/é/g, "e").replace(/\s+/g,"")
            }
        },
        cleanSpecialChars(st) {
            if (st === null) {
                return '';
            } else {
                return st.replace(/é/g, "&#233;").replace(/-/g, "&#8211;").replace(/—/g, "&#8212;").replace(/'/g, "&#8217;");
            }
        },
        cleanTextarea(st) {
            if (st === null) {
                return '';
            } else {
                return st.replace(/\n/g, ',').split(',');
            }
        },
        jsonOrder(arry, preview) {
            var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            this.hpJson = {};

            arry.forEach((obj, index) => {
                this.hpJson[alpha.charAt(index)] = obj;
            });
            console.log('jsonOrder saved ',this.hpJson);
        },
        saveClick() {
            this.$children.forEach(component => {
                var moduleType = component.$vnode.componentOptions.tag;
                var elements = Array.from(component.$el.parentNode.childNodes);
                var id = component.$el.id;
                var position;

                elements.forEach((el,index) => {
                    if (el.id === id) {
                        position = index;
                    }
                });

                switch (moduleType) {
                    case 'large-feature-module':
                        this.mappingOrder[id][position][moduleType]['sections'] = [
                            {
                                "item": component.itemId,
                                "displayModuleOn": component.selectedScreenSize,
                                "image": {
                                    "customImage": {
                                        "small": component.smallImageUrl,
                                        "large": component.largeImageUrl
                                    },
                                    "link": component.itemUrl,
                                    "description": component.imageDescription
                                },
                                "headline": {
                                    "text": component.headline,
                                    "link": component.headlineUrl,
                                    "description": component.headlineDescription
                                },
                                "cta": {
                                    "text": component.cta,
                                    "link": component.ctaUrl,
                                    "description": component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'small-feature-module':
                        this.mappingOrder[id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'basic-story-module':
                        this.mappingOrder[id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'copy': {
                                    'text': this.cleanSpecialChars(component.copy),
                                    'link': this.cleanUrl(component.copyUrl),
                                    'description': component.copyDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'extended-story-module':
                        this.mappingOrder[id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'copy': {
                                    'text': this.cleanSpecialChars(component.copy),
                                    'link': this.cleanUrl(component.copyUrl),
                                    'description': component.copyDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'collection-grid-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize,
                        this.mappingOrder[id][position][moduleType]['sections'] = [];
                        this.mappingOrder[id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[id][position][moduleType]['headline'] = {
                            'text': this.cleanSpecialChars(component.headline),
                            'link': this.cleanUrl(component.headlineUrl),
                            'description': component.headlineDescription
                        }
                        this.mappingOrder[id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }

                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'text-link-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize,
                        this.mappingOrder[id][position][moduleType]['sections'] = [];
                        this.mappingOrder[id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'image-link-double-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize,
                        this.mappingOrder[id][position][moduleType]['sections'] = [];
                        this.mappingOrder[id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'button-link-double-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize;
                        this.mappingOrder[id][position][moduleType]['sections'] = [];
                        this.mappingOrder[id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'seo-link-module':
                        var seo1ctaList = this.cleanTextarea(component.seo1cta);
                        var seo1ctaUrlList = this.cleanTextarea(component.seo1ctaUrl);
                        var seo1ctaDescriptionList = this.cleanTextarea(component.seo1ctaDescription);

                        var seo2ItemsList = this.cleanTextarea(component.itemId);
                        var seo2ItemsUrlList = this.cleanUrl(component.itemUrl);
                        var seo2SmallImageList = this.cleanUrl(component.smallImageUrl);
                        var seo2LargeImageList = this.cleanUrl(component.largeImageUrl);
                        var seo2ImageDescriptionList = this.cleanTextarea(component.imageDescription);
                        var seo2ctaList = this.cleanTextarea(component.seo2cta);
                        var seo2ctaUrlList = this.cleanUrl(component.seo2ctaUrl);
                        var seo2ctaDescriptionList = this.cleanTextarea(component.seo2ctaDescription);

                        this.mappingOrder[id][position][moduleType]['seo1'] = {}
                        this.mappingOrder[id][position][moduleType]['seo1']['section'] = {
                            'text': this.cleanSpecialChars(component.seo1Section),
                            'link': this.cleanUrl(component.seo1SectionUrl),
                            'description': component.seo1SectionDescription
                        }
                        this.mappingOrder[id][position][moduleType]['seo1']['sections'] = []

                        if (seo1ctaList != '') {
                            seo1ctaList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['seo1']['sections'].push(
                                        {
                                            'cta': {
                                                'text': item,
                                                'link': seo1ctaUrlList[index] === undefined ? '' : this.cleanUrl(seo1ctaUrlList[index]),
                                                'description': seo1ctaDescriptionList[index] === undefined ? '' : seo1ctaDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }

                        this.mappingOrder[id][position][moduleType]['seo2'] = {}
                        this.mappingOrder[id][position][moduleType]['seo2']['section'] = {
                            'text': this.cleanSpecialChars(component.seo2Section),
                            'link': this.cleanUrl(component.seo2SectionUrl),
                            'description': component.seo2SectionDescription
                        },
                        this.mappingOrder[id][position][moduleType]['seo2']['sections'] = []

                        if (seo2ItemsList != '') {
                            seo2ItemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[id][position][moduleType]['seo2']['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': seo2SmallImageList[index] === undefined ? '' : this.cleanImagePath(seo2SmallImageList[index]),
                                                    'large': seo2LargeImageList[index] === undefined ? '' : this.cleanImagePath(seo2LargeImageList[index])
                                                },
                                                'link': seo2ItemsUrlList[index] === undefined ? '' : this.cleanUrl(seo2ItemsUrlList[index]),
                                                'description': seo2ImageDescriptionList[index] === undefined ? '' : seo2ImageDescriptionList[index]
                                            },
                                            'cta': {
                                                'text': seo2ctaList[index] === undefined ? '' : seo2ctaList[index].replace(/é/g, "&#233;").trim(),
                                                'link': seo2ctaUrlList[index] === undefined ? '' : this.cleanUrl(seo2ctaUrlList[index]),
                                                'description': seo2ctaDescriptionList[index] === undefined ? '' : seo2ctaDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                }
            });

            var mappingOrderCopy = this.mappingOrder;
            var removedUniqueIdJson = {};
            var orderedJson = {};
            var duplicateModuleNames = [];
            var duplicateObjects = [];

            function reducerFilter(acc, xs) {
              xs.map((item, index) => {
                  if (xs[index] === xs[index+1]) {
                      if (xs[index] === 'collection-grid-module' || xs[index] === 'text-link-module' || xs[index] === 'image-link-double-module' || xs[index] === 'button-link-double-module' || xs[index] === 'seo-link-module') {
                          acc.push(item);
                      } else {
                          acc.push('concat');
                      }
                  } else {
                      acc.push(item);
                  }
              })
              return acc;
            }

            Object.keys(mappingOrderCopy).forEach(function(key) {
               Object.assign(removedUniqueIdJson, mappingOrderCopy[key]);
            });

            Object.keys(removedUniqueIdJson).forEach((key,index) => {
                duplicateModuleNames.push(Object.keys(removedUniqueIdJson[key])[0]);
                duplicateObjects.push(removedUniqueIdJson[key]);
            });

            var adjecentCombine = reducerFilter([],duplicateModuleNames);

            adjecentCombine.forEach((el,index) => {
                var moduleType = Object.keys(duplicateObjects[index])[0];
                if (el === 'concat') {
                    duplicateObjects[index+1][moduleType].sections = duplicateObjects[index][moduleType].sections.concat(duplicateObjects[index+1][moduleType].sections);
                    duplicateObjects.splice(index,1,'');
                }
            });
            duplicateObjects = duplicateObjects.filter(function(n){ return n != '' });
            this.jsonOrder(duplicateObjects);
        }
    },
    updated: function() {
        this.$nextTick(function () {
            var sortableContainerEl = document.getElementById('sortableContainer').children;
            var sortableContainerList = Array.from(sortableContainerEl);

            sortableContainerList.forEach((el, position) => {
                var moduleType = el.getAttribute('data-type');
                var component = this.$children[position];

                this.mappingOrder[el.id] = {};
                this.mappingOrder[el.id][position] = {};
                this.mappingOrder[el.id][position][moduleType] = {};

                switch (moduleType) {
                    case 'large-feature-module':
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [
                            {
                                "item": component.itemId,
                                "displayModuleOn": component.selectedScreenSize,
                                "image": {
                                    "customImage": {
                                        "small": component.smallImageUrl,
                                        "large": component.largeImageUrl
                                    },
                                    "link": component.itemUrl,
                                    "description": component.imageDescription
                                },
                                "headline": {
                                    "text": component.headline,
                                    "link": component.headlineUrl,
                                    "description": component.headlineDescription
                                },
                                "cta": {
                                    "text": component.cta,
                                    "link": component.ctaUrl,
                                    "description": component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'small-feature-module':
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'basic-story-module':
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'copy': {
                                    'text': this.cleanSpecialChars(component.copy),
                                    'link': this.cleanUrl(component.copyUrl),
                                    'description': component.copyDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'extended-story-module':
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [
                            {
                                'item': component.itemId,
                                'displayModuleOn': component.selectedScreenSize,
                                'section': {
                                    'text': this.cleanSpecialChars(component.section),
                                    'link': this.cleanUrl(component.sectionUrl),
                                    'description': component.sectionDescription
                                },
                                'image': {
                                    'customImage': {
                                        "small": this.cleanImagePath(component.smallImageUrl),
                                        "large": this.cleanImagePath(component.largeImageUrl)
                                    },
                                    'link': this.cleanUrl(component.itemUrl),
                                    'description': component.imageDescription
                                },
                                'headline': {
                                    'text': this.cleanSpecialChars(component.headline),
                                    'link': this.cleanUrl(component.headlineUrl),
                                    'description': component.headlineDescription
                                },
                                'copy': {
                                    'text': this.cleanSpecialChars(component.copy),
                                    'link': this.cleanUrl(component.copyUrl),
                                    'description': component.copyDescription
                                },
                                'cta': {
                                    'text': this.cleanSpecialChars(component.cta),
                                    'link': this.cleanUrl(component.ctaUrl),
                                    'description': component.ctaDescription
                                }
                            }
                        ]
                    break;
                    case 'collection-grid-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);


                        this.mappingOrder[el.id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize;
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [];
                        this.mappingOrder[el.id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['headline'] = {
                            'text': this.cleanSpecialChars(component.headline),
                            'link': this.cleanUrl(component.headlineUrl),
                            'description': component.headlineDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }

                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'text-link-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[el.id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize,
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [];
                        this.mappingOrder[el.id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'image-link-double-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[el.id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize,
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [];
                        this.mappingOrder[el.id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'button-link-double-module':
                        var itemsList = this.cleanTextarea(component.itemId);
                        var itemsUrlList = this.cleanTextarea(component.itemUrl);
                        var smallImageList = this.cleanTextarea(component.smallImageUrl);
                        var largeImageList = this.cleanTextarea(component.largeImageUrl);
                        var imageDescriptionList = this.cleanTextarea(component.imageDescription);

                        this.mappingOrder[el.id][position][moduleType]['displayModuleOn'] = component.selectedScreenSize;
                        this.mappingOrder[el.id][position][moduleType]['sections'] = [];
                        this.mappingOrder[el.id][position][moduleType]['section'] = {
                            'text': this.cleanSpecialChars(component.section),
                            'link': this.cleanUrl(component.sectionUrl),
                            'description': component.sectionDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['cta'] = {
                            'text': this.cleanSpecialChars(component.cta),
                            'link': this.cleanUrl(component.ctaUrl),
                            'description': component.ctaDescription
                        }
                        if (itemsList != '') {
                            itemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': smallImageList[index] === undefined ? '' : this.cleanImagePath(smallImageList[index]),
                                                    'large': largeImageList[index] === undefined ? '' : this.cleanImagePath(largeImageList[index])
                                                },
                                                'link': itemsUrlList[index] === undefined ? '' : this.cleanUrl(itemsUrlList[index]),
                                                'description': imageDescriptionList[index] === undefined ? '' : imageDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                    case 'seo-link-module':
                        var seo1ctaList = this.cleanTextarea(component.seo1cta);
                        var seo1ctaUrlList = this.cleanTextarea(component.seo1ctaUrl);
                        var seo1ctaDescriptionList = this.cleanTextarea(component.seo1ctaDescription);

                        var seo2ItemsList = this.cleanTextarea(component.itemId);
                        var seo2ItemsUrlList = this.cleanUrl(component.itemUrl);
                        var seo2SmallImageList = this.cleanUrl(component.smallImageUrl);
                        var seo2LargeImageList = this.cleanUrl(component.largeImageUrl);
                        var seo2ImageDescriptionList = this.cleanTextarea(component.imageDescription);
                        var seo2ctaList = this.cleanTextarea(component.seo2cta);
                        var seo2ctaUrlList = this.cleanUrl(component.seo2ctaUrl);
                        var seo2ctaDescriptionList = this.cleanTextarea(component.seo2ctaDescription);

                        this.mappingOrder[el.id][position][moduleType]['seo1'] = {}
                        this.mappingOrder[el.id][position][moduleType]['seo1']['section'] = {
                            'text': this.cleanSpecialChars(component.seo1Section),
                            'link': this.cleanUrl(component.seo1SectionUrl),
                            'description': component.seo1SectionDescription
                        }
                        this.mappingOrder[el.id][position][moduleType]['seo1']['sections'] = []

                        if (seo1ctaList != '') {
                            seo1ctaList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['seo1']['sections'].push(
                                        {
                                            'cta': {
                                                'text': item,
                                                'link': seo1ctaUrlList[index] === undefined ? '' : this.cleanUrl(seo1ctaUrlList[index]),
                                                'description': seo1ctaDescriptionList[index] === undefined ? '' : seo1ctaDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }

                        this.mappingOrder[el.id][position][moduleType]['seo2'] = {}
                        this.mappingOrder[el.id][position][moduleType]['seo2']['section'] = {
                            'text': this.cleanSpecialChars(component.seo2Section),
                            'link': this.cleanUrl(component.seo2SectionUrl),
                            'description': component.seo2SectionDescription
                        },
                        this.mappingOrder[el.id][position][moduleType]['seo2']['sections'] = []

                        if (seo2ItemsList != '') {
                            seo2ItemsList.forEach((item, index) => {
                                if (item != '') {
                                    this.mappingOrder[el.id][position][moduleType]['seo2']['sections'].push(
                                        {
                                            'item': item,
                                            'image': {
                                                'customImage': {
                                                    'small': seo2SmallImageList[index] === undefined ? '' : this.cleanImagePath(seo2SmallImageList[index]),
                                                    'large': seo2LargeImageList[index] === undefined ? '' : this.cleanImagePath(seo2LargeImageList[index])
                                                },
                                                'link': seo2ItemsUrlList[index] === undefined ? '' : this.cleanUrl(seo2ItemsUrlList[index]),
                                                'description': seo2ImageDescriptionList[index] === undefined ? '' : seo2ImageDescriptionList[index]
                                            },
                                            'cta': {
                                                'text': seo2ctaList[index] === undefined ? '' : seo2ctaList[index].replace(/é/g, "&#233;").trim(),
                                                'link': seo2ctaUrlList[index] === undefined ? '' : this.cleanUrl(seo2ctaUrlList[index]),
                                                'description': seo2ctaDescriptionList[index] === undefined ? '' : seo2ctaDescriptionList[index]
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    break;
                }
            });
        });
    },
    components: {
        'large-feature-module': HpCmsLargeFeatureModule,
        'small-feature-module': HpCmsSmallFeatureModule,
        'basic-story-module': HpCmsBasicStoryModule,
        'extended-story-module': HpCmsExtendedStoryModule,
        'collection-grid-module': HpCmsCollectionGridModule,
        'text-link-module': HpCmsTextLinkModule,
        'image-link-double-module': HpCmsImageLinkDoubleModule,
        'button-link-double-module': HpCmsButtonLinkDoubleModule,
        'seo-link-module': HpCmsSeoLinkModule
    }
}
</script>

<style lang="scss">
</style>
