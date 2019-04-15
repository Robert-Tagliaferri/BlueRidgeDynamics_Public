<template>
<PersonForm v-on:submit-person-form="insertData"></PersonForm>
</template>
<script>
import PersonForm from '../components/PersonForm'
    export default {
        name: 'PersonFormContainer',
        data: function(){
            return {}
        },
        components: {
         PersonForm
        },
        methods: {
           insertData: function(person) {
               //validate that form is filled
               if(person.firstName.length > 0 && person.lastName.length > 0 && person.age > 0 && (person.gender === 'male' || person.gender === 'female')){
                   //make a POST request to http://localhost:3000/addPerson
                   fetch('http://localhost:3000/addPerson', {
                       method: 'POST',
                       headers: {
                           "Content-Type": "application/json",
                       },
                       body: JSON.stringify(person)
                   }).then(response => {

                   })

               }
           }
        }
    }
</script>