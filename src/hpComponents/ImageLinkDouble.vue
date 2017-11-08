<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="image-link-double-module background-color-off-white" data-module-type="LD">
        <div class="row fullwidth waterColor">
            <div class="small-12 large-11 xlarge-10 xxlarge-8 small-centered columns container">
                <div v-if="section.text" class="row">
                    <div class="small-12 xlarge-10 xxlarge-8 text-center xlarge-centered columns">
                        <h2>
                            <a class="a-secondary" v-html="section.text" v-bind:href="section.link" v-bind:data-description="section.description" v-bind:data-sectionDescription="section.description" data-type="Section"></a>
                        </h2>
                    </div>
                </div>

                <div class="row">
                    <div class="small-11 medium-12 small-centered columns">
                        <template v-for="(item, index) in imageLinkDoubleModuleSections">
                            <div v-if="displayOn(displayGroupViewPortSize, viewportSize)" v-bind:class="classNameBlockGrid(imageLinkDoubleModuleSections,viewportSize) + ' productContainer text-center'">
                                <div class="responsively-lazy preventReflow">
                                    <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                        <img v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,640)" v-bind:alt="item.cta.text"/>
                                    </a>
                                </div>
                                <h4>
                                    <a class="a-secondary" v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="section.description" data-type="CTA"></a>
                                </h4>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { hpMixins } from '../HpMixins';

export default {
    mixins: [ hpMixins ],
    props: ['moduleData', 'viewportSize'],
    data: function() {
        return {
            section: this.moduleData.section,
            imageLinkDoubleModuleSections: this.moduleData.sections,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.imageLinkDoubleModuleSections);
    }
}
</script>

<style lang="scss">
</style>
