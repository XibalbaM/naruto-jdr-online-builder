import Line from "./line.model";

/**
 * Class representing a road.
 * @class Road
 */
export default class Road {
  _id!: string;
  name!: string;
  qualification!: string;
  line!: Line
}
