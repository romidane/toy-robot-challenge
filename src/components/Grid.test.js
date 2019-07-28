import React from "react";
import { Provider } from "react-redux";
import { fakeStore } from "../testHelpers";
import Cell from "./Cell";
import Grid from "./Grid";

const mountApp = store =>
  mount(
    <Provider store={store}>
      <Grid width="400" size={4} />
    </Provider>
  );

const defaultState = {
  grid: {
    board: [],
    currentPosition: {
      x: 0,
      y: 0,
      facing: "NORTH"
    }
  }
};

describe("<Grid />", () => {
  let wrapper;
  let store;

  beforeEach(() => {});
  it("initializes the grid on component mount", () => {
    const store = fakeStore(defaultState);

    mount(
      <Provider store={store}>
        <Grid width="400" size={1} />
      </Provider>
    );

    expect(
      store.dispatch.calledWith({
        type: "INITIALIZE_GRID",
        payload: {
          size: 2
        }
      })
    ).to.equal(true, "the action INITIALIZE_GRID was not called correctly");
  });

  it("render a 1x1 grid", () => {
    const store = fakeStore({
      grid: {
        ...defaultState.grid,
        board: [[{}, {}], [{}, {}]]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <Grid width="400" size={1} />
      </Provider>
    );
    const cells = wrapper.find(Cell);

    expect(cells.length).to.equal(1, "1 cell should be rendered");
  });

  it("renders multiple cells", () => {
    const store = fakeStore({
      grid: {
        ...defaultState.grid,
        board: [[{}, {}], [{}, {}], [{}, {}]]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <Grid width="400" size={2} />
      </Provider>
    );
    const cells = wrapper.find(Cell);

    expect(cells.length).to.equal(2, "2 cell should be rendered");
  });

  it("renders cells of even height and width", () => {
    const store = fakeStore({
      grid: {
        ...defaultState.grid,
        board: [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <Grid width="600" size={3} />
      </Provider>
    );
    const cells = wrapper.find(Cell);

    cells.forEach(cell => {
      expect(cell.props("style")).to.eql({ width: 200, height: 200 });
    });
  });
});
