import localforage from "localforage";
import { Component, For, createSignal } from "solid-js";
import Card from "./Card";
import type { RV } from "./utils";

const RVs: Component = () => {
  const [RVArray, setRVArray] = createSignal<RV[]>([]);
  localforage.keys().then((keys) => {
    keys.forEach((key) => {
      localforage.getItem(key).then((value) => {
        setRVArray([...RVArray(), value] as RV[]);
      });
    });
  });
  return (
    <div class="flex flex-col gap-5">
      <For each={RVArray()}>{(RV) => <Card RV={RV} />}</For>
    </div>
  );
};

export default RVs;
