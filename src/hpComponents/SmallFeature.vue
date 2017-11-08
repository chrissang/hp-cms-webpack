<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="small-feature-module background-color-white" data-module-type="SF">
        <template v-if="viewportSize === 'small' || viewportSize === 'medium'">
            <template v-for="(item, index) in smModulesSections">
                <template v-if="displayOn(item.displayModuleOn, viewportSize)">
                    <template v-if="isEven(index)">
                        <div class="row fullwidth">
                            <div class="container">
                                <div class="small-6 medium-7 columns">
                                    <div v-bind:style="{ margin: viewportSize === 'medium' ? '-1.5rem 0 0 -1.5rem' : '0' }">
                                        <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                            <div class="responsively-lazy preventReflow">
                                                <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="small-6 medium-5 columns text-center">
                                    <div class="copyContainer">
                                        <label v-if="item.section.text" class="body-small-caps-override">
                                            <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                        </label>

                                        <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.descriptio" data-type="Headline">
                                            <h3 v-html="item.headline.text"></h3>
                                        </a>

                                        <p class="body-small-override">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" data-type="CTA"></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="!isEven(index)">
                        <div class="row fullwidth">
                            <div class="container">
                                <div class="small-6 medium-5 columns text-center">
                                    <div class="copyContainer">
                                        <label v-if="item.section.text" class="body-small-caps-override">
                                            <a class="a-secondary" v-html="item.section.text" v-bind:href="item.section.link" v-bind:data-description="item.section.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Section"></a>
                                        </label>

                                        <a v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.descriptio" data-type="Headline">
                                            <h3 v-html="item.headline.text"></h3>
                                        </a>

                                        <p class="body-small-override">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" data-type="CTA"></a>
                                        </p>
                                    </div>
                                </div>
                                <div class="small-6 medium-7 columns">
                                    <div v-bind:style="{ margin: viewportSize === 'medium' ? '-1.5rem 0 0 -1.5rem' : '0' }">
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
            </template>
        </template>

        <template v-if="viewportSize === 'large' || viewportSize === 'xlarge'">
            <div class="row fullwidth">
                <div class="large-11 xlarge-10 xxlarge-8 large-centered columns">
                    <div class="row fullwidth">
                        <template v-for="(item, index) in smModulesSections">
                            <template v-if="displayOn(item.displayModuleOn, viewportSize)">
                                <div v-bind:class="className(smModulesSections)">
                                    <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" v-bind:data-sectionDescription="item.section.description" data-type="Image">
                                        <div class="responsively-lazy preventReflow">
                                            <img class="right" v-bind:data-srcset="responsiveImage(item.item, item.image.customImage.large, item.image.customImage.small)" v-bind:src="item.image.customImage.large ? item.image.customImage.large : productImgPathSrc(item.item,360)" v-bind:alt="item.cta.text"/>
                                        </div>
                                    </a>
                                    <div class="row">
                                        <div class="large-12 large-centered columns">
                                            <div class="white-box-container text-center">
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
                            </template>
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
            smModulesSections: this.moduleData.sections,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.smModulesSections);
    }
}
</script>

<style lang="scss">
</style>
