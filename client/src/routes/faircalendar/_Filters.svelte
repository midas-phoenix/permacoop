<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {format} from 'date-fns';
  import MonthsInput from '../../components/inputs/MonthsInput.svelte';

  const dispatch = createEventDispatcher();

  export let userId;
  export let date;

  let data = [];

  onMount(async () => {
    ({data} = await axios.get('users'));
  });

  const handleFilter = () => {
    const filters = {
      userId,
      date: format(new Date(date), 'yyyy-MM-dd')
    };

    const uri = new URLSearchParams(filters).toString();
    window.history.pushState({}, null, `/faircalendar?${uri}`);

    dispatch('filter', {...filters, date: new Date(date)});
  };
</script>

<style>
  form.filter {
    background: #e9ecef;
    padding: 0.75rem 1rem;
    margin-bottom: 20px;
    border-radius: 0.25rem;
  }
</style>

<form class="filter">
  <div class="row">
    <div class="col-md-6">
      <MonthsInput
        label={'Filtrer par mois :'}
        amount={6}
        on:change={handleFilter}
        bind:date />
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="userId">Filtrer par coopérateur :</label>
        <select
          id="userId"
          name="userId"
          bind:value={userId}
          on:change={handleFilter}
          class="form-control">
          {#each data as user}
            <option value={user.id} selected={userId === user.id}>
              {`${user.lastName} ${user.firstName}`}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</form>
