<script context="module">
  import {client as axios} from '../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`daily_rates/${params.id}`);

    return {dailyRate: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../../constants/roles';
  export let dailyRate;

  let amount = dailyRate.amount;
  let taskId = dailyRate.task.id;
  let customerId = dailyRate.customer.id;
  let userId = dailyRate.user.id;

  let title = `Edition du TJM "${dailyRate.customer.name}"`;
  let errors = [];

  const onSave = async e => {
    try {
      await axios.put(`daily_rates/${dailyRate.id}`, e.detail);

      return goto('/accounting/daily_rates');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={[ROLE_COOPERATOR, ROLE_EMPLOYEE]}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'Gestion & Comptabilité'}, {title: 'TJM', path: 'accounting/daily_rates'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} {amount} {taskId} {customerId} {userId} />
  </div>
</SecuredView>
