import axios from "~/plugins/axios";

export const state = () => ({
  ids: [{ id: 0, login: "Hakan" }],
  items: []
});

export const mutations = {
  setIds(state, ids) {
    state.ids = ids;
  },
  setItems(state, items) {
    state.items = items;
  }
};

export const actions = {
  async LOAD_ITEMS({ commit }, dataURL) {
    const response = await axios.get(dataURL);
    const ids = response.data;
    const tenIds = ids.slice(0, 10);
    const itemPromises = tenIds.map(id => axios.get(`item/${id}.json`));
    const itemsResponses = await Promise.all(itemPromises);
    const items = itemsResponses.map(res => res.data);

    const realItems = items.map(item =>
      item
        ? item
        : {
            title: "Failed to load",
            id: 0
          }
    );

    commit("setItems", realItems);
    //commit("setIds", ids);
  }
};
