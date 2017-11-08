<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="basic-story-module background-color-off-white" data-module-type="BS">
        <template v-if="viewportSize === 'small'">
            <template v-for="(item, index) in basicStoryModulesSections">
                <div v-if="displayOn(item.displayModuleOn, viewportSize)" class="row container">
                    <div v-if="item.section.text" class="small-12 text-center columns">
                        <label class="body-small-caps-override">
                            <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                        </label>
                    </div>

                    <div class="small-12 columns">
                        <div class="row">
                            <div class="small-10 small-centered text-center columns">
                                <a v-bind:attr="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                    <h2 v-html="item.headline.text"></h2>
                                </a>
                                <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,640)" v-bind:alt="item.cta.text"/>
                                    </div>
                                </a>
                                <a v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA">
                                    <button class="btn-secondary expand" v-html="item.cta.text"></button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>

        <template v-if="viewportSize === 'medium'">
            <template v-for="(item, index) in basicStoryModulesSections">
                <div v-if="displayOn(item.displayModuleOn, viewportSize) && isEven(index)" class="row fullwidth">
                    <div class="container">
                        <div class="medium-7 columns">
                            <div style="margin-top: -1.5rem; margin-left: -1.5rem;">
                                <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="medium-5 columns text-center">
                            <div class="copyContainer">
                                <label v-if="item.section.text" class="body-small-caps-override">
                                    <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                </label>
                                <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                    <h2 v-html="item.headline.text"></h2>
                                </a>
                                <p class="body-small-override">
                                    <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="displayOn(item.displayModuleOn, viewportSize) && !isEven(index)" class="row fullwidth">
                    <div class="container">
                        <div class="medium-5 columns text-center">
                            <div class="copyContainer">
                                <label v-if="item.section.text" class="body-small-caps-override">
                                    <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                </label>
                                <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                    <h2 v-html="item.headline.text"></h2>
                                </a>
                                <p class="body-small-override">
                                    <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                                </p>
                            </div>
                        </div>
                        <div class="medium-7 columns">
                            <div style="margin-top: -1.5rem; margin-left: -1.5rem;">
                                <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>

        <template v-if="viewportSize === 'large' || viewportSize === 'xlarge'">
            <div class="row fullwidth">
                <div class="large-11 xlarge-10 xxlarge-8 large-centered columns">
                    <div class="row">
                        <template v-for="(item, index) in basicStoryModulesSections">
                            <div v-if="displayOn(item.displayModuleOn, viewportSize)" v-bind:class="className(basicStoryModulesSections,viewportSize)">
                                <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                    <div class="responsively-lazy preventReflow">
                                        <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                    </div>
                                </a>
                                <div class="row">
                                    <div class="large-12 large-centered columns">
                                        <div class="white-box-container text-center">
                                            <label v-if="item.section.text" class="body-small-caps-override">
                                                <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item. section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                            </label>

                                            <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Headline">
                                                <h2 v-html="item.headline.text"></h2>
                                            </a>
                                            <p class="body-small-override">
                                                <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="CTA"></a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
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
            basicStoryModulesSections: this.moduleData.sections,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.basicStoryModulesSections);
    }
}
</script>

<style lang="scss">
</style>
