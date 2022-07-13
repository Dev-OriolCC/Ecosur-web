<template>

    <label :for="id" class="me-sm-2 d-flex justify-content-left">
        {{label}}
        <!-- <span v-if="msg.email" class="text-danger">{{ msg.email }}</span> -->
    </label>
    <input 
        class="form-control" 
        :id="id"  
        :type="type"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder" 
        v-model="input"
        required
    />


</template>

<script>
export default {

    props: {
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        label: {
            type: String,
            required: true,
        }
    },

    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value);
        }
    },
}

</script>