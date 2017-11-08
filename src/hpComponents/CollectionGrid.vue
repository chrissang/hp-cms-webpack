<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="collection-grid-module background-color-off-white" data-module-type="CG">
        <div class="row fullwidth">
            <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                <div class="row container">
                    <div class="small-12 medium-6 columns">
                        <div class="flex">
                            <div class="small-8-width">
                                <a v-bind:href="arrayContent1.image.link" v-bind:data-description="arrayContent1.image.description" v-bind:data-itemNumber="arrayContent1.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img v-bind:data-srcset="responsiveImage(arrayContent1.item, arrayContent1.image.customImage.large, arrayContent1.image.customImage.small)" v-bind:src="arrayContent1.image.customImage.large ? arrayContent1.image.customImage.large : productImgPathSrc(arrayContent1.item,360)" v-bind:alt="cta.text"/>
                                    </div>
                                </a>
                            </div>
                            <div class="small-4-width">
                                <div>
                                    <a v-bind:href="arrayContent2.image.link" v-bind:data-description="arrayContent2.image.description" v-bind:data-itemNumber="arrayContent2.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow">
                                            <img v-bind:data-srcset="responsiveImage(arrayContent2.item, arrayContent2.image.customImage.large, arrayContent2.image.customImage.small)" v-bind:src="arrayContent2.image.customImage.large ? arrayContent2.image.customImage.large : productImgPathSrc(arrayContent2.item,360)" v-bind:alt="cta.text"/>
                                        </div>
                                    </a>
                                </div>
                                <div>
                                    <a v-bind:href="arrayContent3.image.link" v-bind:data-description="arrayContent3.image.description" v-bind:data-itemNumber="arrayContent3.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow">
                                            <img v-bind:data-srcset="responsiveImage(arrayContent3.item, arrayContent3.image.customImage.large, arrayContent3.image.customImage.small)" v-bind:src="arrayContent3.image.customImage.large ? arrayContent3.image.customImage.large : productImgPathSrc(arrayContent3.item,360)" v-bind:alt="cta.text"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="viewportSize === 'small'" class="small-12 text-center columns white-box-container">
                        <label v-if="section.text" class="body-small-caps-override">
                            <a class="a-secondary" v-html="section.text" v-bind:href="section.link" v-bind:data-description="section.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Section"></a>
                        </label>

                        <a class="a-secondary" v-bind:href="headline.link" v-bind:data-description="headline.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Headline"><h3 v-html="headline.text"></h3></a>

                        <p class="body-small-override"><a v-html="cta.text" v-bind:href="cta.link" v-bind:data-description="cta.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="CTA"></a></p>
                    </div>

                    <div class="small-12 medium-6 columns">
                        <div class="flex">
                            <div class="small-8-width">
                                <a v-bind:href="arrayContent4.image.link" v-bind:data-description="arrayContent4.image.description" v-bind:data-itemNumber="arrayContent4.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img v-bind:data-srcset="responsiveImage(arrayContent4.item, arrayContent4.image.customImage.large, arrayContent4.image.customImage.small)" v-bind:src="arrayContent4.image.customImage.large ? arrayContent4.image.customImage.large : productImgPathSrc(arrayContent4.item,360)" v-bind:alt="cta.text"/>
                                    </div>
                                </a>
                            </div>
                            <div class="small-4-width">
                                <div>
                                    <a v-bind:href="arrayContent5.image.link" v-bind:data-description="arrayContent5.image.description" v-bind:data-itemNumber="arrayContent5.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow">
                                            <img v-bind:data-srcset="responsiveImage(arrayContent5.item, arrayContent5.image.customImage.large, arrayContent5.image.customImage.small)" v-bind:src="arrayContent5.image.customImage.large ? arrayContent5.image.customImage.large : productImgPathSrc(arrayContent5.item,360)" v-bind:alt="cta.text"/>
                                        </div>
                                    </a>
                                </div>
                                <div>
                                    <a v-bind:href="arrayContent6.image.link" v-bind:data-description="arrayContent6.image.description" v-bind:data-itemNumber="arrayContent6.item" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow">
                                            <img v-bind:data-srcset="responsiveImage(arrayContent6.item, arrayContent6.image.customImage.large, arrayContent6.image.customImage.small)" v-bind:src="arrayContent6.image.customImage.large ? arrayContent6.image.customImage.large : productImgPathSrc(arrayContent6.item,360)" v-bind:alt="cta.text"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="viewportSize != 'small'" class="small-12 columns">
                        <div class="row">
                            <div class="medium-8 large-6 medium-centered columns">
                                <div class="white-box-container text-center">
                                    <label v-if="section.text" class="body-small-caps-override"><a class="a-secondary" v-html="section.text" v-bind:href="section.link" v-bind:data-description="section.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Section"></a></label>
                                    <a v-bind:href="headline.link" v-bind:data-description="headline.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="Headline"><h1 v-html="headline.text"></h1></a>
                                    <p class="body-small-override"><a v-html="cta.text" v-bind:href="cta.link" v-bind:data-description="cta.description" v-bind:data-cta="cta.text" v-bind:data-sectionDescription="section.description" data-type="CTA"></a></p>
                                </div>
                            </div>
                        </div>
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
            headline: this.moduleData.headline,
            cta: this.moduleData.cta,
            collectionGridModulesSections: this.moduleData.sections,
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
        this.displayGroupViewPortSize = this.moduleData.displayModuleOn;
        this.arrayContent1 = this.collectionGridModulesSections[0];
        this.arrayContent2 = this.collectionGridModulesSections[1];
        this.arrayContent3 = this.collectionGridModulesSections[2];
        this.arrayContent4 = this.collectionGridModulesSections[3];
        this.arrayContent5 = this.collectionGridModulesSections[4];
        this.arrayContent6 = this.collectionGridModulesSections[5];
    }
}
</script>

<style lang="scss">
</style>
