import { Component, For } from "solid-js";
import type { RV } from "./utils";
import localforage from "localforage";

const Card: Component<{ RV: RV }> = (props) => {
  return (
    <div class="card bg-base-200 group of-hidden relative">
      <div class="card-body">
        <hgroup class="card-title flex-col items-start">
          <h2>{props.RV.name}</h2>
          <h3 class="text-sm op-40 font-light">{props.RV.address}</h3>
        </hgroup>
        <For each={props.RV.notes}>{(note) => <p>{note}</p>}</For>
      </div>
      <div
        class="group-hover:bottom-0 duration-300 transition-all absolute bottom--100px bg-base-300 w-full p-5 flex flex-row gap-2"
        un-children="flex flex-row gap-1"
      >
        <a href={`/visit?id=${props.RV.id}`} class="btn btn-primary btn-sm">
          <span class="i-tabler-plus" />
          Add Visit
        </a>
        <a
          href={`/RV?id=${props.RV.id}`}
          class="btn btn-outline btn-primary btn-sm"
        >
          <span class="i-tabler-pencil" />
          Edit
        </a>
        <button
          class="btn btn-error btn-sm"
          onClick={() =>
            localforage.removeItem(props.RV.id).then(() => {
              window.location.reload();
            })
          }
        >
          <span class="i-tabler-trash" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
