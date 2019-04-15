<template>
    <div class="home">
        <h1> People Form & List </h1>
        <div class="people">
            <PersonFormContainer></PersonFormContainer>
            <PeopleTableContainer></PeopleTableContainer>
        </div>
    </div>
</template>
<script>
    import PersonFormContainer from '../containers/PersonFormContainer'
    import PeopleTableContainer from '../containers/PeopleTableContainer'

    export default {

        data: function () {
            return {}
        },
        components: {
            PeopleTableContainer,
            PersonFormContainer
        },
        name: 'People',
    }
</script>

<style scoped>
    .people {
        display: inline-block
    }
</style>