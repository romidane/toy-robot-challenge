import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;
global.expect = expect;
