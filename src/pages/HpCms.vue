<template>
    <section id="hp_cms_tool">
            <div class="row">
                <div class="small-12 columns">
                    <h1>Home Page CMS</h1>
                </div>
                <hp-cms-datepicker></hp-cms-datepicker>
            </div>
            <hp-cms-module-selector></hp-cms-module-selector>
    </section>
</template>

<script>
import HpCmsDatepicker from '../hpCmsComponents/HpCmsDatepicker.vue'
import HpCmsModuleSelector from '../hpCmsComponents/HpCmsModuleSelector.vue'

export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        'hp-cms-datepicker': HpCmsDatepicker,
        'hp-cms-module-selector': HpCmsModuleSelector
    },
    mounted: function() {
        if (!Modernizr.inputtypes.date) {
            $(document).foundation();
            $("#jQueryDatepicker").datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                yearRange: "-150:+150"
            });
            $("#defaultDatepicker").hide();
        } else {
            var d = new Date();
            d.setHours(0, -d.getTimezoneOffset(), 0, 0); //removing the timezone offset.
            var dateInput = document.getElementById('defaultDatepicker');
            dateInput.value = d.toISOString().slice(0,10);
            $("#jQueryDatepicker").hide();
        }
    }
}
</script>

<style>
    @import "../css/admin.css";
    @import "../css/jquery-ui-1.9.2.datepicker.min.css";
</style>
