<script lang="ts">
  import { onMount } from "svelte";
  import * as localforage from "localforage";
  import type { RVType } from "./utils";
  import JSConfetti from "js-confetti";

  let confetti: JSConfetti;

  let RV: RVType = {
    id: "",
    name: "",
    address: "",
    gender: "",
    date: "",
    time: "",
    tags: [],
    notes: [],
    returnDate: "",
    returnTime: "",
  };

  let newNotes = "";
  onMount(() => {
    confetti = new JSConfetti();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;
    localforage.getItem(id).then((curRV) => {
      if (curRV) {
        RV = curRV as RVType;
      }
    });
  });
  const save = () => {
    const newVisit = {
      id: RV.id,
      name: RV.name,
      address: RV.address,
      gender: RV.gender,
      date: RV.date,
      time: RV.time,
      tags: [...RV.tags],
      notes: [...RV.notes, newNotes],
      returnDate: RV.returnDate,
      returnTime: RV.returnTime,
    };
    localforage.setItem(RV.id, newVisit).then(() => {
      confetti.addConfetti();
      window.location.href = "#success";
    });
  };
  const labelClass =
    "label translate-0 peer-placeholder-shown:translate-y-100% order--1 duration-300 transition-translate";

  const updateReturnDate = (e: any) => {
    RV.returnDate = (e.target as HTMLInputElement).value;
  };

  const updateReturnTime = (e: any) => {
    RV.returnTime = (e.target as HTMLInputElement).value;
  };
</script>

<form on:submit|preventDefault={save}>
  <h2 class="text-xl font-bold">{RV.name}</h2>
  <h3 class="text-xl">{RV.address}</h3>
  <div class="flex flex-row flex-center gap-2 mt-5">
    <div class="form-control w-full">
      <label for="name">
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
  <div class="form-control">
    <textarea
      name="notes"
      placeholder="Notes"
      class="textarea textarea-bordered peer z-10"
      bind:value={newNotes}
    />
    <label class={labelClass} for="notes">
      <span class="label-text">Notes</span>
    </label>
  </div>

  <div class="flex flex-row flex-center gap-2 mt-10">
    <div class="form-control w-full">
      <label for="returnDate">
        <span class="label-text">Next Return Date</span>
      </label>
      <input
        name="returnDate"
        type="date"
        class="input input-bordered peer z-10"
        on:input={updateReturnDate}
        value={new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .split("T")[0]}
      />
    </div>
    <div class="form-control w-full">
      <label for="returnTime">
        <span class="label-text">Next Return Time</span>
      </label>
      <input
        name="returnTime"
        type="time"
        class="input input-bordered peer z-10"
        on:input={updateReturnTime}
        value={new Date().toTimeString().split(" ")[0].split(":")[0] +
          ":" +
          new Date().toTimeString().split(" ")[0].split(":")[1]}
      />
    </div>
  </div>

  <div class="flex flex-row gap-5 mt-15" data-children="grow-1 flex gap-1">
    <button type="submit" class="btn btn-primary">
      Save
      <span class="i-tabler-check text-base" />
    </button>
    <a href="/" type="button" class="btn btn-error">
      Cancel
      <span class="i-tabler-x text-base" />
    </a>
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
