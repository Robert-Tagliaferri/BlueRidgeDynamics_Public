<template>
    <Table v-if="loaded" :rows="rows" v-on:refresh-table="getPeople">
    </Table>
</template>
<script>
    import Table from '../components/Table';

    export default {
        name: 'PeopleTableContainer',
        components: {
           Table
        },
        data() {
            return {
               rows: [],
               loaded: false
            }
        },
        mounted() {
            let scope = this;
            this.loaded = false;
            fetch('http://localhost:3000/getPeople').then((res) => {
                return res.json()
            }).then(ppl => {
                scope.loaded = true;
                this.rows = ppl;
            }).catch((err) => {
                console.log(err);
            })
            return {
                people: [{first_name: ' ', last_name: ' ', gender: 'male', age: '2'}]
            }
        },
        methods: {
            getPeople: function(){
             let scope = this;
             fetch('http://localhost:3000/getPeople').then(res => {
                 return res.json()
             }).then(data => {
                 scope.rows = data;
             }).catch(err => {
                 console.log(err);
             });
            }
        }
    }
</script>