<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="button-link-double-module background-color-white" data-module-type="BD">
        <div class="row">
            <div class="small-12 columns">
                <div class="row collapse">
                    <div class="small-8 medium-10 large-8 small-centered columns">
                        <hr class="dottedSpacer">
                    </div>
                </div>
            </div>
        </div>

        <div v-if="section.text" class="row">
            <div class="small-12 small-centered text-center columns">
                <h2>
                    <a class="a-secondary" v-html="section.text" v-bind:href="section.link" v-bind:data-description="section.description" v-bind:data-sectionDescription="section.description" data-type="Section"></a>
                </h2>
            </div>
        </div>

        <div v-if="!shouldStack()" class="row fullwidth">
            <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                <template v-for="(item, index) in buttonLinkDoubleModuleSections">
                    <div v-if="displayOn(item.displayModuleOn,viewportSize)" v-bind:class="classNameBlockGrid(buttonLinkDoubleModuleSections,viewportSize) + ' productContainer'">
                        <div class="responsively-lazy preventReflow">
                            <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                <img v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,640)" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:alt="item.cta.text"/>
                            </a>

                            <div v-if="showBtnContainerInside()" class="btnContainerInside">
                                <a v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="section.description" data-type="CTA">
                                    <button class="btn-secondary expand" v-html="item.cta.text"></button>
                                </a>
                            </div>
                        </div>

                        <div v-if="showBtnContainerHanging()" class="btnContainerHanging">
                            <a v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="section.description" data-type="CTA">
                                <button class="btn-secondary expand" v-html="item.cta.text"></button>
                            </a>
                        </div>
                    </div>
                </template>
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
            buttonLinkDoubleModuleSections: this.moduleData.sections,
            arrayContent1: null,
            arrayContent2: null,
            arrayContent3: null,
            arrayContent4: null,
            arrayContent5: null,
            arrayContent6: null,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.buttonLinkDoubleModuleSections);
        this.arrayContent1 = this.buttonLinkDoubleModuleSections[0];
        this.arrayContent2 = this.buttonLinkDoubleModuleSections[1];
        this.arrayContent3 = this.buttonLinkDoubleModuleSections[2];
        this.arrayContent4 = this.buttonLinkDoubleModuleSections[3];
        this.arrayContent5 = this.buttonLinkDoubleModuleSections[4];
        this.arrayContent6 = this.buttonLinkDoubleModuleSections[5];
    },
    methods: {
        shouldStack: function(index) {
            return this.viewportSize === 'xlarge' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
        },
        showBtnContainerInside: function() {
            return this.viewportSize != 'small' && this.buttonLinkDoubleModuleSections.length === 4 || this.viewportSize === 'medium' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
        },
        showBtnContainerHanging: function() {
            return this.viewportSize === 'small' || this.viewportSize === 'large' && this.buttonLinkDoubleModuleSections.length === 6 ? true : false;
        }
    }
}
</script>

<style lang="scss">
</style>
