<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import CustomersInput from '../../components/inputs/CustomersInput.svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';

  let response = {
    items: []
  };

  onMount(async () => {
    response = (await axios.get('customers', {params: {page: 1}})).data;
  });

  export let name = '';
  export let customerId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name, customerId});
  };
</script>

<form on:submit|preventDefault={submit}>
  <TextInput label={'Nom du projet'} bind:value={name} />
  <CustomersInput customers={response.items} bind:customerId />
  <button type="submit" class="btn btn-primary" disabled={!name || !customerId}>
    Enregistrer
  </button>
</form>
