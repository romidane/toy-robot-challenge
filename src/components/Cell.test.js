import React from "react";

import Cell from "./Cell";

describe("<Cell />", () => {
  it("renders with props", () => {
    const wrapper = mount(<Cell height={20} width={20} />);
    const root = wrapper.find(".app-grid-cell");

    expect(root.prop("style")).to.eql({ width: 20, height: 20 });
  });
});
