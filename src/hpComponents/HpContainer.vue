<template>
    <div>
        <template v-for="(obj, index) in componentList">
            <component :is="Object.keys(obj)[0]" :module-data="obj[Object.keys(obj)[0]]" :viewport-size="viewPort"></component>
        </template>
    </div>
</template>

<script>
import LargeFeature from './LargeFeature.vue';
import SeoLink from './SeoLink.vue';
import SmallFeature from './SmallFeature.vue';
import BasicStory from './BasicStory.vue';
import ExtendedStory from './ExtendedStory.vue';
import CollectionGrid from './CollectionGrid.vue';
import TextLink from './TextLink.vue';
import ButtonLinkDouble from './ButtonLinkDouble.vue';
import ImageLinkDouble from './ImageLinkDouble.vue';

export default {
    props: ['moduleData', 'viewportSize'],
    data: function()  {
        return {
            componentList: [],
            viewPort: 'small'
        }
    },
    components: {
        'large-feature-module': LargeFeature,
        'seo-link-module': SeoLink,
        'small-feature-module': SmallFeature,
        'basic-story-module': BasicStory,
        'extended-story-module': ExtendedStory,
        'collection-grid-module': CollectionGrid,
        'text-link-module': TextLink,
        'button-link-double-module': ButtonLinkDouble,
        'image-link-double-module': ImageLinkDouble
    },
    created: function () {
        var mappingOrder = JSON.parse(this.$route.query.payload);
        Object.keys(mappingOrder).forEach((letter, i) => {
            this.componentList.push(mappingOrder[letter]);
        });
        window.addEventListener('resize', this.breakpointValue);
        this.breakpointValue();
    },
    methods: {
        breakpointValue: function() {
            var size = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
            this.viewPort = size;
            console.log('viewPort xxx ',this.viewPort);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.breakpointValue);
        }
    }
    // watch: {
    //     viewPort: function () {
    //         var moduleOrder = [];
    //         this.$nextTick(function () {
    //             var sectionsDisplayed = Array.from(document.getElementById('hp_modules').querySelectorAll('section'));
    //             var alphaOrder = [];
    //             var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //             var counter = 0;
    //
    //             sectionsDisplayed.forEach((el,index) => {
    //                 var anchorEl = Array.from(el.querySelectorAll('a'))
    //                 var moduleType = el.getAttribute("data-module-type");
    //                 var alphaChar = alpha.charAt(index);
    //                 anchorEl.forEach((aTag,i) => {
    //                     var linkNumber = i+1;
    //                     var dataType = aTag.getAttribute("data-type");
    //                     var dataDescription = aTag.getAttribute('data-description').split(' ').join('_');
    //
    //                     if(dataDescription != '') {
    //                         dataDescription = '_'+dataDescription;
    //                     }
    //
    //                     var trackingCode = 'hp_module_' + alphaChar + linkNumber + '_'+ dataType + '_' + moduleType + dataDescription;
    //                     var trackingLink = aTag.getAttribute("href");
    //
    //                     var ctaText = aTag.getAttribute("data-cta") ? aTag.getAttribute("data-cta") : 'NA';
    //                     var itemNumber = aTag.getAttribute("data-itemNumber") ? aTag.getAttribute("data-itemNumber") : "NA";
    //                     var sectionDescription = aTag.getAttribute("data-sectionDescription") ? aTag.getAttribute("data-sectionDescription") : 'NA';
    //
    //                     var id = alphaChar + linkNumber + '_' + moduleType;
    //                     var name = ctaText.replace(/'/g, "")+'_'+trackingLink.replace(/\/\/www.uncommongoods.com/g, '').replace("//blog.uncommongoods.com","/blog");
    //                     var creative = itemNumber;
    //                     var pos = sectionDescription;
    //
    //                     trackingLink = trackingLink.replace(/\/\/www.uncommongoods.com/g, '');
    //
    //                     if (trackingLink !== '' && moduleType != 'TL_SEO') {
    //                         if (trackingLink.includes("//blog.uncommongoods.com")) {
    //                             trackingLink = trackingLink.replace("//blog.uncommongoods.com","/blog");
    //                             $(aTag).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
    //                         } else {
    //                             $(aTag).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
    //                         }
    //                     } else if (trackingLink !== '' && moduleType === 'TL_SEO') {
    //                         $(aTag).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
    //                     } else {
    //                         $(aTag).attr("onclick", `javascript: pageTracker._trackPageview('/internal`+trackingLink+`?source=`+trackingCode+`');dataLayer.push({'internalHPModuleLinkUrl':'/internal`+trackingLink+`?source=`+trackingCode+`'},{'event':'fireGTMTrackHPModulePageView'});onPromoClick('`+id+`', '`+name+`', '`+creative+`', '`+pos+`')`);
    //                         $('a[href=""]').click(function (event) { // where href are blank
    //                             event.preventDefault();
    //                         })
    //                     }
    //
    //                 })
    //             })
    //         })
    //     }
    // }
}
</script>

<style lang="scss">
</style>
