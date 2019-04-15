<template>
    <div>
        <span>Input number of bins: </span>
        <input type="text" v-model="histData.bucketNumber"/>
        <button v-on:click="submitForm">Submit</button>
    </div>
</template>
<script>
    export default {
        name: 'HistData',
        data: function () {
            return {
                histData: {
                    bucketNumber: 5
                }
            }
        },
        methods: {
            submitForm: function() {
                this.$emit('submit-hist-form', this.histData);
            }
        }
    }
</script>