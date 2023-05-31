<script lang="ts">
  import { onMount } from "svelte";
  import { uid } from "./utils";
  import type { RVType } from "./utils";
  import * as localforage from "localforage";
  import JSConfetti from "js-confetti";
  import Tags from "./Tags.svelte";

  let confetti: JSConfetti;

  let RV: RVType = {
    id: uid(),
    name: "",
    address: "",
    gender: "",
    date: new Date().toISOString().split("T")[0],
    time:
      new Date().toTimeString().split(" ")[0].split(":")[0] +
      ":" +
      new Date().toTimeString().split(" ")[0].split(":")[1],
    notes: [""],
    tags: [],
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    returnTime:
      new Date().toTimeString().split(" ")[0].split(":")[0] +
      ":" +
      new Date().toTimeString().split(" ")[0].split(":")[1],
  };

  onMount(async () => {
    confetti = new JSConfetti();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;
    const curRV = await localforage.getItem(id);
    if (curRV) {
      RV = curRV as RVType;
    }
  });
  const save = async () => {
    RV = {
      id: RV.id,
      name: RV.name,
      address: RV.address,
      gender: RV.gender,
      date: RV.date.toString(),
      time: RV.time.toString(),
      notes: [...RV.notes],
      tags: RV.tags,
      returnDate: RV.returnDate.toString(),
      returnTime: RV.returnTime.toString(),
    };

    await localforage.setItem(RV.id, RV);
    confetti.addConfetti();
    window.location.href = "#success";
  };
  const labelClass =
    "label translate-0 peer-placeholder-shown:translate-y-100% order--1 duration-300 transition-translate";
</script>

<form on:submit|preventDefault={save}>
  <div class="flex flex-row gap-5">
    <div class="form-control grow">
      <input
        required
        bind:value={RV.name}
        name="name"
        type="text"
        placeholder="Name"
        class="input input-bordered peer z-10"
      />
      <label class={labelClass} for="name">
        <span class="label-text">Name</span>
      </label>
    </div>
    <div class="form-control flex-center mt-6">
      <label for="gender">
        <span class="label-text">M</span>
      </label>
      <input
        type="radio"
        name="gender"
        class="radio peer z-10"
        bind:group={RV.gender}
        value="M"
      />
    </div>
    <div class="form-control flex-center mt-6">
      <label for="gender">
        <span class="label-text">W</span>
      </label>
      <input
        type="radio"
        name="gender"
        class="radio peer z-10"
        value="W"
        bind:group={RV.gender}
      />
    </div>
  </div>
  <div class="form-control">
    <input
      required
      name="address"
      bind:value={RV.address}
      type="text"
      placeholder="Address"
      class="input input-bordered peer z-10"
    />
    <label class={labelClass} for="address">
      <span class="label-text">Address</span>
    </label>
  </div>
  <div class="flex flex-row flex-center gap-2 mt-5">
    <div class="form-control w-full">
      <label for="date">
        <span class="label-text">Date</span>
      </label>
      <input
        name="date"
        type="date"
        class="input input-bordered peer z-10"
        bind:value={RV.date}
      />
    </div>
    <div class="form-control w-full">
      <label for="time">
        <span class="label-text">Time</span>
      </label>
      <input
        name="time"
        type="time"
        class="input input-bordered peer z-10"
        bind:value={RV.time}
      />
    </div>
  </div>
  {#each RV.notes as note, i}
    <div class="form-control">
      <textarea
        name="notes"
        bind:value={note}
        placeholder={`Notes for visit #${i + 1}`}
        class="textarea textarea-bordered peer z-10"
        rows="2"
      />
      <label class={labelClass} for="notes">
        <span class="label-text">{`Notes for visit #${i + 1}`}</span>
      </label>
    </div>
  {/each}

  <Tags {labelClass} bind:tags={RV.tags} />

  <div class="flex flex-row flex-center gap-2 mt-10">
    <div class="form-control w-full">
      <label for="returnDate">
        <span class="label-text">Return Date</span>
      </label>
      <input
        name="returnDate"
        type="date"
        class="input input-bordered peer z-10"
        bind:value={RV.returnDate}
      />
    </div>
    <div class="form-control w-full">
      <label for="returnTime">
        <span class="label-text">Return Time</span>
      </label>
      <input
        name="returnTime"
        type="time"
        class="input input-bordered peer z-10"
        bind:value={RV.returnTime}
      />
    </div>
  </div>
  <div class="flex flex-row gap-5 mt-15" data-children="grow-1 flex gap-1">
    <button type="submit" class="btn btn-primary">
      Save
      <span class="i-tabler-check text-base" />
    </button>
    <button
      type="button"
      class="btn btn-error"
      on:click={() => {
        window.location.href = "/";
      }}
    >
      Cancel
      <span class="i-tabler-x text-base" />
    </button>
  </div>
  <div class="modal z-10000" id="success">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Saved successfully</h3>
      <div class="modal-action">
        <a href="/" class="btn"> Yay! </a>
      </div>
    </div>
  </div>
</form>
