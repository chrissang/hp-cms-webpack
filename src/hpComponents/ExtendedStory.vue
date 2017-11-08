<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="extended-story-module background-color-off-white" data-module-type="ES">
        <template v-if="viewportSize === 'small'">
            <template v-for="(item, index) in extendedStoryModulesSections">
                <div v-if="displayOn(item.displayModuleOn, viewportSize)" class="row container">
                    <div class="small-12 text-center columns">
                        <div v-if="item.section.text" class="small-12 text-center columns">
                            <label class="body-small-caps-override"><a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a></label>
                        </div>
                        <div class="small-12 text-center columns">
                            <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                <h2 v-html="item.headline.text"></h2>
                            </a>
                        </div>
                        <div class="small-12 text-center columns">
                            <div class="row">
                                <div class="small-11 small-centered columns">
                                    <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow itemPhoto">
                                            <img v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,640)" v-bind:alt="item.cta.text"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="small-11 text-center columns">
                            <p class="text-left">
                                <a class="a-secondary" v-html="item.copy.text" v-bind:href="item.copy.link" v-bind:data-description="item.copy.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Copy"></a>
                            </p>
                            <p class="body-small-override">
                                <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </template>

        <template v-if="viewportSize === 'medium' || viewportSize === 'large' || viewportSize === 'xlarge'">
            <template v-for="(item, index) in extendedStoryModulesSections">
                <div v-if="displayOn(item.displayModuleOn, viewportSize) && !isEven(index)" class="row fullwidth">
                    <div class="medium-12 large-11 xlarge-10 xxlarge-8  large-centered columns">
                        <div class="row">
                            <div class="container">
                                <div class="medium-5 large-4 columns text-center">
                                    <div class="copyContainer">
                                        <label v-if="item.section.text" class="body-small-caps-override">
                                            <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                        </label>

                                        <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                            <h2 v-html="item.headline.text"></h2>
                                        </a>

                                        <p class="text-left">
                                            <a class="a-secondary" v-html="item.copy.text" v-bind:href="item.copy.link" v-bind:data-description="item.copy.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Copy"></a>
                                        </p>
                                        <p class="body-small-override">
                                            <a v-html="item. cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="medium-7 large-8 columns">
                                    <div style="margin: -1.5rem -1.5rem 0 0;">
                                        <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                            <div class="responsively-lazy preventReflow">
                                                <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="displayOn(item.displayModuleOn, viewportSize) && isEven(index)" class="row fullwidth">
                    <div class="medium-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                        <div class="row">
                            <div class="container">
                                <div class="medium-7 large-8 columns">
                                    <div style="margin: -1.5rem 0 0 -1.5rem;">
                                        <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                            <div class="responsively-lazy preventReflow">
                                                <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="medium-5 large-4 columns text-center">
                                    <div class="copyContainer">
                                        <label v-if="item.section.text" class="body-small-caps-override">
                                            <a class="a-secondary" v-html:="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                        </label>

                                        <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                            <h2 v-html="item.headline.text"></h2>
                                        </a>

                                        <p class="text-left">
                                            <a class="a-secondary" v-html="item.copy.text" v-bind:href="item.copy.link" v-bind:data-description="item.copy.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Copy"></a>
                                        </p>
                                        <p class="body-small-override">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </section>
</template>

<script>
import { hpMixins } from '../HpMixins';

export default {
    mixins: [ hpMixins ],
    props: ['moduleData', 'viewportSize'],
    data: function() {
        return {
            extendedStoryModulesSections: this.moduleData.sections,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.extendedStoryModulesSections);
    }
}
</script>

<style lang="scss">
</style>
