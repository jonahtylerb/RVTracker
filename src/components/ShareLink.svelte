<script lang="ts">
  import type { RVType } from "./utils";

  export let RV: RVType;

  let RV64 = {
    id: btoa(RV.id),
    name: btoa(RV.name),
    address: btoa(RV.address),
    gender: btoa(RV.gender),
    date: btoa(RV.date),
    time: btoa(RV.time),
    tags: btoa(RV.tags?.join(",")),
    notes: btoa(RV.notes?.join(",")),
    returnDate: btoa(RV.returnDate),
    returnTime: btoa(RV.returnTime),
  };

  const link = `
/share?n=${RV64.name}&a=${RV64.address}&d=${RV64.date}&t=${RV64.time}&tg=${RV64.tags}&nt=${RV64.notes}&rd=${RV64.returnDate}&rt=${RV64.returnTime}
`;

  const share = () => {
    navigator.share({ url: link });
  };
</script>

<button
  on:click={share}
  class="btn btn-ghost btn-sm btn-square absolute size-10 p-0 right-0 top-0 rounded-none rounded-bl-$rounded-box! group-hover:translate-x-0 translate-x-200%"
  ><span class="i-tabler-share" /></button
>
