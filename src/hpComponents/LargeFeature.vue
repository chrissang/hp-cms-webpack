<template>
    <section v-if="displayOn(displayGroupViewPortSize, viewportSize)" class="large-feature-module background-color-off-white" data-module-type="LF">
        <template v-for="item in largeFeatureModulesSections">
            <template v-if="displayOn(item.displayModuleOn, viewportSize)">
                <div class="row fullwidth">
                    <div class="small-12 large-11 xlarge-10 xxlarge-8 large-centered columns">
                        <a v-bind:href="item.image.link" v-bind:data-description="item.image.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" data-type="Image">
                            <picture>
                                <!--[if IE 9]><video style="display: none;"><![endif]-->
                                    <source v-bind:srcset="item.image.customImage.large ? item.image.customImage.large : productImgPath(item.item,640)"/>
                                    <source v-bind:srcset="item.image.customImage.small ? item.image.customImage.small : productImgPath(item.item,360)"/>
                                <!--[if IE 9]></video><![endif]-->

                                <template v-if="viewportSize === 'small'">
                                    <div class="responsively-lazy preventReflow">
                                        <p v-html="item.image.customImage.small"></p>
                                        <img v-bind:src="item.image.customImage.small ? item.image.customImage.small : productImgPath(item,360)" v-bind:alt="item.cta.text">
                                    </div>
                                </template>

                                <template v-if="viewportSize != 'small'">
                                    <template v-if="isVideo(item.image.customImage.large)">
                                        <video loop muted autoplay v-bind:poster="posterImage(item.image.customImage.large)">
                                            <source v-bind:src="item.image.customImage.large" type="video/mp4">
                                            <source v-bind:src="item.image.customImage.large" type="video/webm">
                                        </video>
                                    </template>

                                    <template v-if="!isVideo(item.image.customImage.large)">
                                        <div class="responsively-lazy preventReflow">
                                            <div v-bind:style="{ backgroundImage: 'url( '+ item.image.customImage.large  +' )' }" class="LF_backgroundImage"></div>
                                        </div>
                                    </template>
                                </template>
                            </picture>

                            <div class="row fullwidth">
                                <div class="small-12 medium-8 large-6 small-centered columns">
                                    <div class="white-box-container text-center">
                                        <a class="a-secondary" v-bind:href="item.headline.link" v-bind:data-description="item.headline.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" data-type="Headline">
                                            <h1 v-html="item.headline.text"></h1>
                                        </a>

                                        <p class="body-small-override">
                                            <a v-html="item.cta.text" v-bind:href="item.cta.link" v-bind:data-description="item.cta.description" v-bind:data-itemNumber="item.item" v-bind:data-cta="item.cta.text" data-type="CTA"></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
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
            largeFeatureModulesSections: this.moduleData.sections,
            displayGroupViewPortSize: null
        }
    },
    created: function() {
        this.displayGroupViewPortSize = this.displayGroup(this.largeFeatureModulesSections);
    },
    methods: {
        isVideo: function(video) {
            return video.split('.').pop() === 'mp4' ? true : false;
        },
        posterImage: function(videoFile) {
            return videoFile.split('.').shift() + '.jpg';
        }
    }
}
</script>

<style lang="scss">
</style>
