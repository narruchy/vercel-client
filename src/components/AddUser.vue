<template>
<div class="container">
  <div class="row">
    <div class="col-12 mb-4">
      <div class="d-flex justify-content-between">
        <h1>Insert Data</h1>
        <router-link to="/list">Show Saved Data</router-link>
      </div>
    </div>
    <div class="col-12">
      <div class="c-add-user">
        <div class="alert alert-success" v-if="saved">
          Saved to Excel Sheet
        </div>
          <div>
            <b-form @submit.stop.prevent="onSubmit" @reset="reset">
              <b-form-group
                id="input-group-1"
                label="Full Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Your Name"
                  :state="validateState('name')"
                  aria-describedby="input-1-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">The Name is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
                  <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="female">Female</b-form-radio>
                  <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="male">Male</b-form-radio>
                  <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="other">Other</b-form-radio>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  :state="validateState('email')"
                  aria-describedby="input-2-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-2-live-feedback">Please Check the email value</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.address"
                  type="text"
                  placeholder="Your Address"
                  :state="validateState('address')"
                  aria-describedby="input-3-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-3-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Phone Number"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.phone"
                  type="number"
                  placeholder="Phone Number"
                  :state="validateState('phone')"
                  aria-describedby="input-4-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-4-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="DOB"
                label-for="input-1"
              >
              <b-form-datepicker id="dob" v-model="form.dob" class="mb-2" :state="validateState('dob')" aria-describedby="input-5-live-feedback"></b-form-datepicker>
              <b-form-invalid-feedback id="input-5-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Nationality"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.nationality"
                  placeholder="Nationality"
                  :state="validateState('nationality')"
                  aria-describedby="input-6-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-6-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Educational Background"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.education_background"
                  placeholder="Educational Background"
                  :state="validateState('education_background')"
                  aria-describedby="input-7-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-7-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-3" label="Contact Via" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="form.contact_via"
                  :options="contact_options"
                  :state="validateState('contact_via')"
                  aria-describedby="input-8-live-feedback"
                ></b-form-select>
                <b-form-invalid-feedback id="input-8-live-feedback">This field is required</b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="button" variant="danger" @click="reset()">Reset</b-button>
            </b-form>
          </div>  
      </div>      
    </div>
  </div>
</div>


</template>

<script>
import axios from 'axios' 
import { validationMixin } from "vuelidate"
import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        saved: false,
        form: {
            name: '',
            gender: 'female',
            email: '',
            phone: '',
            address: '',
            dob: '',
            contact_via: '',
            nationality: '',
            education_background: ''
        },
        contact_options: [{ text: 'Select One', value: null }, 'Phone', 'Email', 'None'],
      };
      

    },

    validations: {
      form: {
        name: {
          required
        },
        email: {
          required,
          email
        },
        phone: {
          required,
          minLength: minLength(10)
        },
        address: {
          required
        },
        nationality: {
          required
        },
        education_background: {
          required
        },
        contact_via: {
          required
        },
        dob: {
          required
        }
      }
    },

    
    

    mounted () {
      // console.log(validationMixin);
    },


    methods: {
      onSubmit() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }

        var vm = this;
        axios.post('https://naresh-task-app.herokuapp.com/api/information', {
            name: this.form.name,
            gender: this.form.gender,
            email: this.form.email,
            phone: this.form.phone,
            address: this.form.address,
            dob: this.form.dob,
            contact_via: this.form.contact_via,
            nationality: this.form.nationality,
            education_background: this.form.education_background,
          })
        .then(function() {
          console.log("Saved");
          vm.reset()
          vm.saved = true;
        })
        .catch(function(error) {
          console.log("Error");
          console.log(error);
        })
      },
      reset() {
        // event.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.$v.form.name.$reset()
        this.form.email = ''
        this.$v.form.email.$reset()
        this.form.phone = ''
        this.$v.form.phone.$reset()
        this.form.address = ''
        this.$v.form.address.$reset()
        this.form.dob = '',
        this.$v.form.dob.$reset()
        this.form.contact_via = ''
        this.$v.form.contact_via.$reset()
        this.form.nationality = '',
        this.$v.form.nationality.$reset()
        this.form.education_background = ''
        this.$v.form.education_background.$reset()
      },

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },
    },

    
  }
</script>